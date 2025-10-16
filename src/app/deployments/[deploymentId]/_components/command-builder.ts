export function buildCurl(url: string, defaultBody?: unknown, authKey?: string) {
	const curlHeaders: string[] = [];

	if (authKey) {
		curlHeaders.push(`-H "Authorization: Bearer ${authKey}"`);
	}

	curlHeaders.push(`-H "Content-Type: application/json"`);

	const headersStr = curlHeaders.join(" \\\n  ");

	if (defaultBody) {
		const curlParams = JSON.stringify(defaultBody, null, 2).split("\n").join("\n    ");

		return `curl -X POST ${url}/invoke \\
  ${headersStr} \\
  -d '{
    "parameters": ${curlParams}
  }'`;
	}

	return `curl -X POST ${url}/invoke \\
  ${headersStr}`;
}

export function buildZenCommand(name: string, defaultBody?: unknown) {
	if (!defaultBody || typeof defaultBody !== "object" || Array.isArray(defaultBody)) {
		return `zenml deployment invoke ${name}`;
	}

	const cliArgs = Object.entries(defaultBody)
		.map(([key, value]) => {
			const isComplexType = typeof value === "object" && value !== null;
			const jsonValue = JSON.stringify(value);
			const formattedValue = isComplexType ? `'${jsonValue}'` : jsonValue;
			return `--${key}=${formattedValue}`;
		})
		.join(" ");

	return `zenml deployment invoke ${name} ${cliArgs}`;
}

export function buildPythonCommand({
	deploymentId,
	defaultBody
}: {
	deploymentId: string;
	defaultBody: unknown;
}) {
	const importStatement = "from zenml.deployers.utils import invoke_deployment\n\n";

	let argsString = "";

	if (defaultBody && typeof defaultBody === "object" && !Array.isArray(defaultBody)) {
		const args = Object.entries(defaultBody)
			.map(([key, value]) => {
				const formattedValue = JSON.stringify(value);
				return `    ${key}=${formattedValue}`;
			})
			.join(",\n");

		if (args) {
			argsString = `,\n${args}`;
		}
	}

	return `${importStatement}response = invoke_deployment(\n    deployment_name_or_id="${deploymentId}"${argsString}\n)`;
}

export function buildTs(url: string, defaultBody?: unknown, authKey?: string) {
	const headers: string[] = [];

	if (authKey) {
		headers.push(`    "Authorization": "Bearer ${authKey}"`);
	}

	headers.push(`    "Content-Type": "application/json"`);

	const headersStr = headers.join(",\n");

	if (defaultBody) {
		const bodyParams = JSON.stringify(defaultBody, null, 2)
			.split("\n")
			.map((line, idx) => (idx === 0 ? line : `    ${line}`))
			.join("\n");

		return `const response = await fetch("${url}/invoke", {
  method: "POST",
  headers: {
${headersStr}
  },
  body: JSON.stringify({
    parameters: ${bodyParams}
  })
});`;
	}

	return `const response = await fetch("${url}/invoke", {
  method: "POST",
  headers: {
${headersStr}
  }
});`;
}
