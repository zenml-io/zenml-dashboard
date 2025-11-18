import { describe, expect, it } from "vitest";
import { sanitizeDockerfile } from "./docker-image";

describe("sanitizeDockerfile", () => {
	describe("sensitive variables", () => {
		it("should mask API_KEY values", () => {
			const input = "ENV OPENAI_API_KEY=sk-abc123def456";
			const output = sanitizeDockerfile(input);
			expect(output).toBe("ENV OPENAI_API_KEY=***************"); // 15 chars
		});

		it("should mask SECRET values", () => {
			const input = "ENV DATABASE_SECRET=my-secret-value";
			const output = sanitizeDockerfile(input);
			expect(output).toBe("ENV DATABASE_SECRET=***************");
		});

		it("should mask TOKEN values", () => {
			const input = "ENV AUTH_TOKEN=bearer-token-12345";
			const output = sanitizeDockerfile(input);
			expect(output).toBe("ENV AUTH_TOKEN=******************");
		});

		it("should mask PASSWORD values", () => {
			const input = "ENV DB_PASSWORD=super-secret-password";
			const output = sanitizeDockerfile(input);
			expect(output).toBe("ENV DB_PASSWORD=*********************");
		});

		it("should mask values ending with KEY", () => {
			const input = "ENV PRIVATE_KEY=rsa-private-key-data";
			const output = sanitizeDockerfile(input);
			expect(output).toBe("ENV PRIVATE_KEY=********************");
		});

		it("should mask CREDENTIALS values", () => {
			const input = "ENV AWS_CREDENTIALS=credential-string";
			const output = sanitizeDockerfile(input);
			expect(output).toBe("ENV AWS_CREDENTIALS=*****************");
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
				const output = sanitizeDockerfile(input);
				expect(output).toContain("=********");
			});
		});
	});

	describe("non-sensitive variables", () => {
		it("should preserve NODE_ENV values", () => {
			const input = "ENV NODE_ENV=production";
			const output = sanitizeDockerfile(input);
			expect(output).toBe("ENV NODE_ENV=production");
		});

		it("should preserve PORT values", () => {
			const input = "ENV PORT=3000";
			const output = sanitizeDockerfile(input);
			expect(output).toBe("ENV PORT=3000");
		});

		it("should preserve PATH values", () => {
			const input = "ENV PATH=/usr/local/bin:$PATH";
			const output = sanitizeDockerfile(input);
			expect(output).toBe("ENV PATH=/usr/local/bin:$PATH");
		});

		it("should preserve ENVIRONMENT values", () => {
			const input = "ENV ENVIRONMENT=staging";
			const output = sanitizeDockerfile(input);
			expect(output).toBe("ENV ENVIRONMENT=staging");
		});

		it("should preserve DEBUG values", () => {
			const input = "ENV DEBUG=true";
			const output = sanitizeDockerfile(input);
			expect(output).toBe("ENV DEBUG=true");
		});
	});

	describe("quoted values", () => {
		it("should mask quoted sensitive values (double quotes)", () => {
			const input = 'ENV API_KEY="sk-abc123def456"';
			const output = sanitizeDockerfile(input);
			// Function removes quotes and masks the value inside (15 chars)
			expect(output).toBe("ENV API_KEY=***************");
		});

		it("should mask quoted sensitive values (single quotes)", () => {
			const input = "ENV SECRET='my-secret-value'";
			const output = sanitizeDockerfile(input);
			// Function removes quotes and masks the value inside
			expect(output).toBe("ENV SECRET=***************");
		});

		it("should preserve quoted non-sensitive values", () => {
			const input = 'ENV NODE_ENV="production"';
			const output = sanitizeDockerfile(input);
			expect(output).toBe('ENV NODE_ENV="production"');
		});

		it("should handle empty quoted values for sensitive vars", () => {
			const input = 'ENV API_KEY=""';
			const output = sanitizeDockerfile(input);
			// Empty string inside quotes results in minimum 1 star
			expect(output).toBe("ENV API_KEY=*");
		});
	});

	describe("separator styles", () => {
		it("should handle ENV with = separator", () => {
			const input = "ENV API_KEY=secret-value";
			const output = sanitizeDockerfile(input);
			expect(output).toBe("ENV API_KEY=************");
		});

		it("should handle ENV with space separator", () => {
			const input = "ENV API_KEY secret-value";
			const output = sanitizeDockerfile(input);
			expect(output).toBe("ENV API_KEY ************");
		});

		it("should handle ENV with spaces around = separator", () => {
			const input = "ENV API_KEY = secret-value";
			const output = sanitizeDockerfile(input);
			expect(output).toBe("ENV API_KEY = ************");
		});
	});

	describe("line continuations", () => {
		it("should handle line continuation with backslash", () => {
			const input = "ENV API_KEY=secret-value \\";
			const output = sanitizeDockerfile(input);
			expect(output).toBe("ENV API_KEY=************ \\");
		});

		it("should preserve trailing whitespace with backslash", () => {
			const input = "ENV SECRET=value123  \\\n";
			const output = sanitizeDockerfile(input);
			expect(output).toContain("********");
			expect(output).toContain("\\");
		});
	});

	describe("whitespace handling", () => {
		it("should handle leading whitespace", () => {
			const input = "  ENV API_KEY=secret";
			const output = sanitizeDockerfile(input);
			expect(output).toBe("  ENV API_KEY=******");
		});

		it("should handle trailing whitespace", () => {
			const input = "ENV API_KEY=secret  ";
			const output = sanitizeDockerfile(input);
			expect(output).toContain("******");
		});

		it("should handle tabs", () => {
			const input = "\tENV API_KEY=secret-value";
			const output = sanitizeDockerfile(input);
			expect(output).toBe("\tENV API_KEY=************");
		});
	});

	describe("multiple ENV statements", () => {
		it("should handle mixed sensitive and non-sensitive variables", () => {
			const input = `ENV NODE_ENV=production
ENV API_KEY=secret123
ENV PORT=8080
ENV DATABASE_PASSWORD=db-secret
ENV DEBUG=true`;

			const output = sanitizeDockerfile(input);
			const lines = output.split("\n");

			expect(lines[0]).toBe("ENV NODE_ENV=production");
			expect(lines[1]).toBe("ENV API_KEY=*********");
			expect(lines[2]).toBe("ENV PORT=8080");
			expect(lines[3]).toBe("ENV DATABASE_PASSWORD=*********");
			expect(lines[4]).toBe("ENV DEBUG=true");
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

			const output = sanitizeDockerfile(input);

			expect(output).toContain("FROM node:18");
			expect(output).toContain("ENV NODE_ENV=production");
			expect(output).toContain("ENV API_KEY=*******************"); // 20 chars masked -> 19 stars
			expect(output).toContain("ENV PORT=3000");
			expect(output).toContain("ENV DATABASE_SECRET=*******************"); // 20 chars masked -> 19 stars
			expect(output).toContain('CMD ["npm", "start"]');
		});
	});

	describe("edge cases", () => {
		it("should handle empty value for sensitive variable", () => {
			const input = "ENV API_KEY=";
			const output = sanitizeDockerfile(input);
			expect(output).toBe("ENV API_KEY=");
		});

		it("should handle single character sensitive value", () => {
			const input = "ENV SECRET=x";
			const output = sanitizeDockerfile(input);
			expect(output).toBe("ENV SECRET=*");
		});

		it("should handle very long sensitive values", () => {
			const longValue = "a".repeat(100);
			const input = `ENV API_KEY=${longValue}`;
			const output = sanitizeDockerfile(input);
			expect(output).toBe(`ENV API_KEY=${"*".repeat(100)}`);
		});

		it("should handle special characters in sensitive values", () => {
			const input = "ENV API_KEY=key-with-@#$%^&*()";
			const output = sanitizeDockerfile(input);
			expect(output).toBe("ENV API_KEY=******************"); // 19 chars
		});

		it("should handle special characters in non-sensitive values", () => {
			const input = "ENV PATH=/usr/bin:$PATH:/opt/bin";
			const output = sanitizeDockerfile(input);
			expect(output).toBe("ENV PATH=/usr/bin:$PATH:/opt/bin");
		});

		it("should be case-insensitive for variable names", () => {
			const input = "ENV api_key=secret";
			const output = sanitizeDockerfile(input);
			expect(output).toBe("ENV api_key=******");
		});

		it("should handle uppercase KEY suffix", () => {
			const input = "ENV MY_SPECIAL_KEY=value";
			const output = sanitizeDockerfile(input);
			expect(output).toBe("ENV MY_SPECIAL_KEY=*****");
		});

		it("should not mask if KEY is not a suffix", () => {
			const input = "ENV KEYBOARD_LAYOUT=us";
			const output = sanitizeDockerfile(input);
			expect(output).toBe("ENV KEYBOARD_LAYOUT=us");
		});

		it("should handle mixed case in variable names", () => {
			const input = "ENV My_Api_Key=secret123";
			const output = sanitizeDockerfile(input);
			expect(output).toBe("ENV My_Api_Key=*********");
		});

		it("should handle non-ENV Docker instructions", () => {
			const input = `FROM ubuntu
RUN apt-get update
COPY . /app
ENV API_KEY=secret
EXPOSE 8080`;

			const output = sanitizeDockerfile(input);

			expect(output).toContain("FROM ubuntu");
			expect(output).toContain("RUN apt-get update");
			expect(output).toContain("COPY . /app");
			expect(output).toContain("ENV API_KEY=******");
			expect(output).toContain("EXPOSE 8080");
		});

		it("should return empty string for empty input", () => {
			const input = "";
			const output = sanitizeDockerfile(input);
			expect(output).toBe("");
		});

		it("should handle Dockerfile with no ENV statements", () => {
			const input = `FROM node:18
WORKDIR /app
COPY . .
RUN npm install
CMD ["npm", "start"]`;

			const output = sanitizeDockerfile(input);
			expect(output).toBe(input);
		});
	});

	describe("value length preservation", () => {
		it("should mask with correct number of stars for unquoted values", () => {
			const input = "ENV API_KEY=12345";
			const output = sanitizeDockerfile(input);
			expect(output).toBe("ENV API_KEY=*****");
		});

		it("should mask with correct number of stars for quoted values", () => {
			const input = 'ENV API_KEY="12345"';
			const output = sanitizeDockerfile(input);
			// Should count only the value inside quotes (5 chars), quotes are removed
			expect(output).toBe("ENV API_KEY=*****");
		});

		it("should handle minimum length of 1 star", () => {
			const input = "ENV SECRET=a";
			const output = sanitizeDockerfile(input);
			expect(output).toBe("ENV SECRET=*");
		});
	});

	describe("additional edge cases", () => {
		it("should mask when variable name IS the sensitive keyword", () => {
			const input = "ENV KEY=my-value";
			const output = sanitizeDockerfile(input);
			expect(output).toBe("ENV KEY=********");
		});

		it("should mask SECRET when it is the full variable name", () => {
			const input = "ENV SECRET=confidential";
			const output = sanitizeDockerfile(input);
			expect(output).toBe("ENV SECRET=************");
		});

		it("should mask TOKEN when it is the full variable name", () => {
			const input = "ENV TOKEN=bearer-token";
			const output = sanitizeDockerfile(input);
			expect(output).toBe("ENV TOKEN=************");
		});

		it("should mask PASSWORD when it is the full variable name", () => {
			const input = "ENV PASSWORD=secret123";
			const output = sanitizeDockerfile(input);
			expect(output).toBe("ENV PASSWORD=*********"); // 9 chars
		});

		it("should NOT mask CONNECTION_STRING (doesn't end with sensitive suffix)", () => {
			const input = "ENV CONNECTION_STRING=server=localhost;key=secret123";
			const output = sanitizeDockerfile(input);
			// CONNECTION_STRING doesn't end with a sensitive suffix, so it's preserved
			expect(output).toBe("ENV CONNECTION_STRING=server=localhost;key=secret123");
		});

		it("should handle values with double equals (base64 padding)", () => {
			const input = "ENV API_KEY=base64encodedvalue==";
			const output = sanitizeDockerfile(input);
			expect(output).toBe("ENV API_KEY=********************"); // 20 chars
		});

		it("should handle database connection string with embedded equals", () => {
			const input = "ENV DB_SECRET=postgresql://user:pass@host:5432/db?ssl=true";
			const output = sanitizeDockerfile(input);
			expect(output).toBe("ENV DB_SECRET=********************************************"); // 44 chars
		});

		it("should handle multiple key-value pairs in single ENV (only first is processed)", () => {
			// Note: Current implementation only processes first key-value pair per ENV line
			// This documents the current behavior - Docker allows multiple pairs but regex only captures first
			const input = "ENV API_KEY=secret123 PORT=8080 NODE_ENV=production";
			const output = sanitizeDockerfile(input);
			// Current behavior: treats everything after first = as the value (including spaces)
			expect(output).toBe("ENV API_KEY=***************************************"); // 39 chars
		});

		it("should not mask non-sensitive vars in multi-pair ENV format", () => {
			const input = "ENV PORT=8080 DEBUG=true NODE_ENV=production";
			const output = sanitizeDockerfile(input);
			// Since PORT is not sensitive, entire line should be preserved
			expect(output).toBe("ENV PORT=8080 DEBUG=true NODE_ENV=production");
		});

		it("should handle mixed sensitive and non-sensitive in multi-pair format", () => {
			// When the first variable in a multi-pair ENV is sensitive, everything gets masked
			const input = "ENV SECRET=value1 PORT=8080 DEBUG=true";
			const output = sanitizeDockerfile(input);
			expect(output).toBe("ENV SECRET=***************************"); // 27 chars
		});
	});
});
