/**
 * Sanitizes a Dockerfile by masking sensitive environment variable values.
 *
 * Targets ENV variables with common sensitive patterns:
 * - *_KEY, *_SECRET, *_TOKEN, *_PASSWORD, *_API_KEY, etc.
 *
 * Preserves non-sensitive variables like NODE_ENV, PORT, etc.
 *
 * @param dockerfile - The original Dockerfile content
 * @returns The sanitized Dockerfile with masked sensitive values
 *
 * @example
 * // Input:
 * ENV OPENAI_API_KEY=sk-abc123def456
 * ENV NODE_ENV=production
 * ENV DATABASE_SECRET=my-secret
 * ENV PORT=3000
 *
 * // Output (sanitized for display):
 * ENV OPENAI_API_KEY=****************
 * ENV NODE_ENV=production
 * ENV DATABASE_SECRET=*********
 * ENV PORT=3000
 */

const envPattern = /^(\s*ENV\s+)([A-Z_][A-Z0-9_]*)(\s*=\s*|\s+)(.+?)(\s*\\?\s*)$/gim;

const sensitiveSuffixes = [
	"KEY",
	"SECRET",
	"TOKEN",
	"PASSWORD",
	"PASS",
	"PWD",
	"API_KEY",
	"ACCESS_KEY",
	"SECRET_KEY",
	"PRIVATE_KEY",
	"AUTH_TOKEN",
	"BEARER_TOKEN",
	"CREDENTIALS",
	"CREDS"
];

export function sanitizeDockerfile(dockerfile: string): string {
	return dockerfile.replace(envPattern, (match, envPrefix, varName, separator, value, trailing) => {
		const isSensitive = sensitiveSuffixes.some((suffix) => varName.toUpperCase().endsWith(suffix));

		if (!isSensitive) {
			return match; // Keep non-sensitive variables as-is
		}

		// Trim the value to get accurate length (remove leading/trailing whitespace and quotes)
		const trimmedValue = value.trim();
		const valueLength = trimmedValue.length;

		// Remove quotes if present to count the actual value length
		let actualValueLength = valueLength;
		if (
			(trimmedValue.startsWith('"') && trimmedValue.endsWith('"')) ||
			(trimmedValue.startsWith("'") && trimmedValue.endsWith("'"))
		) {
			actualValueLength = Math.max(0, valueLength - 2);
		}

		// Generate stars matching the actual value length
		const stars = "*".repeat(Math.max(1, actualValueLength));

		// Reconstruct the ENV statement with masked value
		return `${envPrefix}${varName}${separator}${stars}${trailing}`;
	});
}
