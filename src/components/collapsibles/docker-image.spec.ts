import { describe, expect, it } from "vitest";
import { sanitizeDockerfile } from "./docker-image";

describe("sanitizeDockerfile", () => {
	describe("sensitive variables", () => {
		it("should mask API_KEY values", () => {
			const input = "ENV OPENAI_API_KEY=sk-abc123def456";
			const result = sanitizeDockerfile(input);
			expect(result.sanitized).toBe("ENV OPENAI_API_KEY=***************"); // 15 chars
			expect(result.hasSensitiveValues).toBe(true);
		});

		it("should mask SECRET values", () => {
			const input = "ENV DATABASE_SECRET=my-secret-value";
			const result = sanitizeDockerfile(input);
			expect(result.sanitized).toBe("ENV DATABASE_SECRET=***************");
			expect(result.hasSensitiveValues).toBe(true);
		});

		it("should mask TOKEN values", () => {
			const input = "ENV AUTH_TOKEN=bearer-token-12345";
			const result = sanitizeDockerfile(input);
			expect(result.sanitized).toBe("ENV AUTH_TOKEN=******************");
			expect(result.hasSensitiveValues).toBe(true);
		});

		it("should mask PASSWORD values", () => {
			const input = "ENV DB_PASSWORD=super-secret-password";
			const result = sanitizeDockerfile(input);
			expect(result.sanitized).toBe("ENV DB_PASSWORD=*********************");
			expect(result.hasSensitiveValues).toBe(true);
		});

		it("should mask values ending with KEY", () => {
			const input = "ENV PRIVATE_KEY=rsa-private-key-data";
			const result = sanitizeDockerfile(input);
			expect(result.sanitized).toBe("ENV PRIVATE_KEY=********************");
			expect(result.hasSensitiveValues).toBe(true);
		});

		it("should mask CREDENTIALS values", () => {
			const input = "ENV AWS_CREDENTIALS=credential-string";
			const result = sanitizeDockerfile(input);
			expect(result.sanitized).toBe("ENV AWS_CREDENTIALS=*****************");
			expect(result.hasSensitiveValues).toBe(true);
		});

		it("should mask values with different sensitive suffixes", () => {
			const inputs = [
				"ENV ACCESS_KEY=value123",
				"ENV SECRET_KEY=value456",
				"ENV BEARER_TOKEN=value789",
				"ENV USER_PASS=value000",
				"ENV DB_PWD=value111",
				"ENV API_CREDS=value222"
			];

			inputs.forEach((input) => {
				const result = sanitizeDockerfile(input);
				expect(result.sanitized).toContain("=********");
				expect(result.hasSensitiveValues).toBe(true);
			});
		});
	});

	describe("non-sensitive variables", () => {
		it("should preserve NODE_ENV values", () => {
			const input = "ENV NODE_ENV=production";
			const result = sanitizeDockerfile(input);
			expect(result.sanitized).toBe("ENV NODE_ENV=production");
			expect(result.hasSensitiveValues).toBe(false);
		});

		it("should preserve PORT values", () => {
			const input = "ENV PORT=3000";
			const result = sanitizeDockerfile(input);
			expect(result.sanitized).toBe("ENV PORT=3000");
			expect(result.hasSensitiveValues).toBe(false);
		});

		it("should preserve PATH values", () => {
			const input = "ENV PATH=/usr/local/bin:$PATH";
			const result = sanitizeDockerfile(input);
			expect(result.sanitized).toBe("ENV PATH=/usr/local/bin:$PATH");
			expect(result.hasSensitiveValues).toBe(false);
		});

		it("should preserve ENVIRONMENT values", () => {
			const input = "ENV ENVIRONMENT=staging";
			const result = sanitizeDockerfile(input);
			expect(result.sanitized).toBe("ENV ENVIRONMENT=staging");
			expect(result.hasSensitiveValues).toBe(false);
		});

		it("should preserve DEBUG values", () => {
			const input = "ENV DEBUG=true";
			const result = sanitizeDockerfile(input);
			expect(result.sanitized).toBe("ENV DEBUG=true");
			expect(result.hasSensitiveValues).toBe(false);
		});
	});

	describe("quoted values", () => {
		it("should mask quoted sensitive values (double quotes)", () => {
			const input = 'ENV API_KEY="sk-abc123def456"';
			const result = sanitizeDockerfile(input);
			// Function removes quotes and masks the value inside (15 chars)
			expect(result.sanitized).toBe("ENV API_KEY=***************");
			expect(result.hasSensitiveValues).toBe(true);
		});

		it("should mask quoted sensitive values (single quotes)", () => {
			const input = "ENV SECRET='my-secret-value'";
			const result = sanitizeDockerfile(input);
			// Function removes quotes and masks the value inside
			expect(result.sanitized).toBe("ENV SECRET=***************");
			expect(result.hasSensitiveValues).toBe(true);
		});

		it("should preserve quoted non-sensitive values", () => {
			const input = 'ENV NODE_ENV="production"';
			const result = sanitizeDockerfile(input);
			expect(result.sanitized).toBe('ENV NODE_ENV="production"');
			expect(result.hasSensitiveValues).toBe(false);
		});

		it("should handle empty quoted values for sensitive vars", () => {
			const input = 'ENV API_KEY=""';
			const result = sanitizeDockerfile(input);
			// Empty string inside quotes results in minimum 1 star
			expect(result.sanitized).toBe("ENV API_KEY=*");
			expect(result.hasSensitiveValues).toBe(true);
		});
	});

	describe("separator styles", () => {
		it("should handle ENV with = separator", () => {
			const input = "ENV API_KEY=secret-value";
			const result = sanitizeDockerfile(input);
			expect(result.sanitized).toBe("ENV API_KEY=************");
			expect(result.hasSensitiveValues).toBe(true);
		});

		it("should handle ENV with space separator", () => {
			const input = "ENV API_KEY secret-value";
			const result = sanitizeDockerfile(input);
			expect(result.sanitized).toBe("ENV API_KEY ************");
			expect(result.hasSensitiveValues).toBe(true);
		});

		it("should handle ENV with spaces around = separator", () => {
			const input = "ENV API_KEY = secret-value";
			const result = sanitizeDockerfile(input);
			expect(result.sanitized).toBe("ENV API_KEY = ************");
			expect(result.hasSensitiveValues).toBe(true);
		});
	});

	describe("line continuations", () => {
		it("should handle line continuation with backslash", () => {
			const input = "ENV API_KEY=secret-value \\";
			const result = sanitizeDockerfile(input);
			expect(result.sanitized).toBe("ENV API_KEY=************ \\");
			expect(result.hasSensitiveValues).toBe(true);
		});

		it("should preserve trailing whitespace with backslash", () => {
			const input = "ENV SECRET=value123  \\\n";
			const result = sanitizeDockerfile(input);
			expect(result.sanitized).toContain("********");
			expect(result.sanitized).toContain("\\");
			expect(result.hasSensitiveValues).toBe(true);
		});
	});

	describe("whitespace handling", () => {
		it("should handle leading whitespace", () => {
			const input = "  ENV API_KEY=secret";
			const result = sanitizeDockerfile(input);
			expect(result.sanitized).toBe("  ENV API_KEY=******");
			expect(result.hasSensitiveValues).toBe(true);
		});

		it("should handle trailing whitespace", () => {
			const input = "ENV API_KEY=secret  ";
			const result = sanitizeDockerfile(input);
			expect(result.sanitized).toContain("******");
			expect(result.hasSensitiveValues).toBe(true);
		});

		it("should handle tabs", () => {
			const input = "\tENV API_KEY=secret-value";
			const result = sanitizeDockerfile(input);
			expect(result.sanitized).toBe("\tENV API_KEY=************");
			expect(result.hasSensitiveValues).toBe(true);
		});
	});

	describe("multiple ENV statements", () => {
		it("should handle mixed sensitive and non-sensitive variables", () => {
			const input = `ENV NODE_ENV=production
ENV API_KEY=secret123
ENV PORT=8080
ENV DATABASE_PASSWORD=db-secret
ENV DEBUG=true`;

			const result = sanitizeDockerfile(input);
			const lines = result.sanitized.split("\n");

			expect(lines[0]).toBe("ENV NODE_ENV=production");
			expect(lines[1]).toBe("ENV API_KEY=*********");
			expect(lines[2]).toBe("ENV PORT=8080");
			expect(lines[3]).toBe("ENV DATABASE_PASSWORD=*********");
			expect(lines[4]).toBe("ENV DEBUG=true");
			expect(result.hasSensitiveValues).toBe(true);
		});

		it("should handle full Dockerfile with ENV statements", () => {
			const input = `FROM node:18
WORKDIR /app
ENV NODE_ENV=production
ENV API_KEY=sk-1234567890abcdef
ENV PORT=3000
COPY package.json .
RUN npm install
ENV DATABASE_SECRET=super-secret-db-key
CMD ["npm", "start"]`;

			const result = sanitizeDockerfile(input);

			expect(result.sanitized).toContain("FROM node:18");
			expect(result.sanitized).toContain("ENV NODE_ENV=production");
			expect(result.sanitized).toContain("ENV API_KEY=*******************"); // 20 chars masked -> 19 stars
			expect(result.sanitized).toContain("ENV PORT=3000");
			expect(result.sanitized).toContain("ENV DATABASE_SECRET=*******************"); // 20 chars masked -> 19 stars
			expect(result.sanitized).toContain('CMD ["npm", "start"]');
			expect(result.hasSensitiveValues).toBe(true);
		});
	});

	describe("edge cases", () => {
		it("should handle empty value for sensitive variable", () => {
			const input = "ENV API_KEY=";
			const result = sanitizeDockerfile(input);
			expect(result.sanitized).toBe("ENV API_KEY=");
			expect(result.hasSensitiveValues).toBe(false);
		});

		it("should handle single character sensitive value", () => {
			const input = "ENV SECRET=x";
			const result = sanitizeDockerfile(input);
			expect(result.sanitized).toBe("ENV SECRET=*");
			expect(result.hasSensitiveValues).toBe(true);
		});

		it("should handle very long sensitive values", () => {
			const longValue = "a".repeat(100);
			const input = `ENV API_KEY=${longValue}`;
			const result = sanitizeDockerfile(input);
			expect(result.sanitized).toBe(`ENV API_KEY=${"*".repeat(100)}`);
			expect(result.hasSensitiveValues).toBe(true);
		});

		it("should handle special characters in sensitive values", () => {
			const input = "ENV API_KEY=key-with-@#$%^&*()";
			const result = sanitizeDockerfile(input);
			expect(result.sanitized).toBe("ENV API_KEY=******************"); // 19 chars
			expect(result.hasSensitiveValues).toBe(true);
		});

		it("should handle special characters in non-sensitive values", () => {
			const input = "ENV PATH=/usr/bin:$PATH:/opt/bin";
			const result = sanitizeDockerfile(input);
			expect(result.sanitized).toBe("ENV PATH=/usr/bin:$PATH:/opt/bin");
			expect(result.hasSensitiveValues).toBe(false);
		});

		it("should be case-insensitive for variable names", () => {
			const input = "ENV api_key=secret";
			const result = sanitizeDockerfile(input);
			expect(result.sanitized).toBe("ENV api_key=******");
			expect(result.hasSensitiveValues).toBe(true);
		});

		it("should handle uppercase KEY suffix", () => {
			const input = "ENV MY_SPECIAL_KEY=value";
			const result = sanitizeDockerfile(input);
			expect(result.sanitized).toBe("ENV MY_SPECIAL_KEY=*****");
			expect(result.hasSensitiveValues).toBe(true);
		});

		it("should not mask if KEY is not a suffix", () => {
			const input = "ENV KEYBOARD_LAYOUT=us";
			const result = sanitizeDockerfile(input);
			expect(result.sanitized).toBe("ENV KEYBOARD_LAYOUT=us");
			expect(result.hasSensitiveValues).toBe(false);
		});

		it("should handle mixed case in variable names", () => {
			const input = "ENV My_Api_Key=secret123";
			const result = sanitizeDockerfile(input);
			expect(result.sanitized).toBe("ENV My_Api_Key=*********");
			expect(result.hasSensitiveValues).toBe(true);
		});

		it("should handle non-ENV Docker instructions", () => {
			const input = `FROM ubuntu
RUN apt-get update
COPY . /app
ENV API_KEY=secret
EXPOSE 8080`;

			const result = sanitizeDockerfile(input);

			expect(result.sanitized).toContain("FROM ubuntu");
			expect(result.sanitized).toContain("RUN apt-get update");
			expect(result.sanitized).toContain("COPY . /app");
			expect(result.sanitized).toContain("ENV API_KEY=******");
			expect(result.sanitized).toContain("EXPOSE 8080");
			expect(result.hasSensitiveValues).toBe(true);
		});

		it("should return empty string for empty input", () => {
			const input = "";
			const result = sanitizeDockerfile(input);
			expect(result.sanitized).toBe("");
			expect(result.hasSensitiveValues).toBe(false);
		});

		it("should handle Dockerfile with no ENV statements", () => {
			const input = `FROM node:18
WORKDIR /app
COPY . .
RUN npm install
CMD ["npm", "start"]`;

			const result = sanitizeDockerfile(input);
			expect(result.sanitized).toBe(input);
			expect(result.hasSensitiveValues).toBe(false);
		});
	});

	describe("value length preservation", () => {
		it("should mask with correct number of stars for unquoted values", () => {
			const input = "ENV API_KEY=12345";
			const result = sanitizeDockerfile(input);
			expect(result.sanitized).toBe("ENV API_KEY=*****");
			expect(result.hasSensitiveValues).toBe(true);
		});

		it("should mask with correct number of stars for quoted values", () => {
			const input = 'ENV API_KEY="12345"';
			const result = sanitizeDockerfile(input);
			// Should count only the value inside quotes (5 chars), quotes are removed
			expect(result.sanitized).toBe("ENV API_KEY=*****");
			expect(result.hasSensitiveValues).toBe(true);
		});

		it("should handle minimum length of 1 star", () => {
			const input = "ENV SECRET=a";
			const result = sanitizeDockerfile(input);
			expect(result.sanitized).toBe("ENV SECRET=*");
			expect(result.hasSensitiveValues).toBe(true);
		});
	});

	describe("additional edge cases", () => {
		it("should mask when variable name IS the sensitive keyword", () => {
			const input = "ENV KEY=my-value";
			const result = sanitizeDockerfile(input);
			expect(result.sanitized).toBe("ENV KEY=********");
			expect(result.hasSensitiveValues).toBe(true);
		});

		it("should mask SECRET when it is the full variable name", () => {
			const input = "ENV SECRET=confidential";
			const result = sanitizeDockerfile(input);
			expect(result.sanitized).toBe("ENV SECRET=************");
			expect(result.hasSensitiveValues).toBe(true);
		});

		it("should mask TOKEN when it is the full variable name", () => {
			const input = "ENV TOKEN=bearer-token";
			const result = sanitizeDockerfile(input);
			expect(result.sanitized).toBe("ENV TOKEN=************");
			expect(result.hasSensitiveValues).toBe(true);
		});

		it("should mask PASSWORD when it is the full variable name", () => {
			const input = "ENV PASSWORD=secret123";
			const result = sanitizeDockerfile(input);
			expect(result.sanitized).toBe("ENV PASSWORD=*********"); // 9 chars
			expect(result.hasSensitiveValues).toBe(true);
		});

		it("should NOT mask CONNECTION_STRING (doesn't end with sensitive suffix)", () => {
			const input = "ENV CONNECTION_STRING=server=localhost;key=secret123";
			const result = sanitizeDockerfile(input);
			// CONNECTION_STRING doesn't end with a sensitive suffix, so it's preserved
			expect(result.sanitized).toBe("ENV CONNECTION_STRING=server=localhost;key=secret123");
			expect(result.hasSensitiveValues).toBe(false);
		});

		it("should handle values with double equals (base64 padding)", () => {
			const input = "ENV API_KEY=base64encodedvalue==";
			const result = sanitizeDockerfile(input);
			expect(result.sanitized).toBe("ENV API_KEY=********************"); // 20 chars
			expect(result.hasSensitiveValues).toBe(true);
		});

		it("should handle database connection string with embedded equals", () => {
			const input = "ENV DB_SECRET=postgresql://user:pass@host:5432/db?ssl=true";
			const result = sanitizeDockerfile(input);
			expect(result.sanitized).toBe("ENV DB_SECRET=********************************************"); // 44 chars
			expect(result.hasSensitiveValues).toBe(true);
		});

		it("should handle multiple key-value pairs in single ENV (only first is processed)", () => {
			// Note: Current implementation only processes first key-value pair per ENV line
			// This documents the current behavior - Docker allows multiple pairs but regex only captures first
			const input = "ENV API_KEY=secret123 PORT=8080 NODE_ENV=production";
			const result = sanitizeDockerfile(input);
			// Current behavior: treats everything after first = as the value (including spaces)
			expect(result.sanitized).toBe("ENV API_KEY=***************************************"); // 39 chars
			expect(result.hasSensitiveValues).toBe(true);
		});

		it("should not mask non-sensitive vars in multi-pair ENV format", () => {
			const input = "ENV PORT=8080 DEBUG=true NODE_ENV=production";
			const result = sanitizeDockerfile(input);
			// Since PORT is not sensitive, entire line should be preserved
			expect(result.sanitized).toBe("ENV PORT=8080 DEBUG=true NODE_ENV=production");
			expect(result.hasSensitiveValues).toBe(false);
		});

		it("should handle mixed sensitive and non-sensitive in multi-pair format", () => {
			// When the first variable in a multi-pair ENV is sensitive, everything gets masked
			const input = "ENV SECRET=value1 PORT=8080 DEBUG=true";
			const result = sanitizeDockerfile(input);
			expect(result.sanitized).toBe("ENV SECRET=***************************"); // 27 chars
			expect(result.hasSensitiveValues).toBe(true);
		});
	});
});
