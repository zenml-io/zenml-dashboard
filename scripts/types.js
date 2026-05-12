import fs from "node:fs";
import openapiTS, { astToString } from "openapi-typescript";

// Logging function with emojis
function log(message, emoji) {
	console.log(`${emoji} ${message}`);
}

async function generateTypes(baseUrl) {
	log("Script started.", "✨");

	const ast = await openapiTS(new URL(`${baseUrl}/openapi.json`), {
		exportType: true,
		defaultNonNullable: false
	});

	log("Writing output to file...", "📝");
	const contents = astToString(ast);
	fs.writeFileSync("./src/types/core.ts", contents);

	log("Script completed successfully.", "✅");
}

// Check if the script is called with at least one argument
if (process.argv.length < 4) {
	console.error("Usage: pnpm generate:types -- <baseurl>");
	process.exit(1);
}

// Take the base URL from the first argument
const baseUrl = process.argv[3];
generateTypes(baseUrl);
