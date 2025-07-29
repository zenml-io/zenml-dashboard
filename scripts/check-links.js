import fs from "fs";
import { exit } from "process";

const allowedStatuses = [401, 403, 405];

const ignoreList = ["https://zenml.io/logo.png"];

const headers = new Headers({
	"User-Agent": "ZenMLURLBot/1.0 (+http://zenml.io/bot)"
});

const noIndexRegex = /content="noindex"/i;
const docsRegex = /docs.zenml.io/i;

async function checkLink() {
	let hasFailed = false;

	const links = fs.readFileSync("urls.txt", "utf-8").split("\n").filter(Boolean);
	for (const link of links) {
		if (ignoreList.includes(link)) {
			console.log("\x1b[33m", `Ignoring ${link}`);
			continue;
		}
		try {
			const response = await fetch(link, { method: "GET", headers });
			const payload = await response.text();
			const hasNoIndex = noIndexRegex.test(payload);

			if (hasNoIndex && docsRegex.test(link)) {
				console.log("\x1b[31m", `[${response.status}] ${link}`);
				hasFailed = true;
				continue;
			}

			if (response.ok || allowedStatuses.includes(response.status)) {
				console.log("\x1b[32m", `[${response.status}] ${link}`);
			} else {
				console.log("\x1b[31m", `[${response.status}] ${link}`);
				hasFailed = true;
			}
		} catch (error) {
			console.error("\x1b[31m", `Error fetching ${link}: ${error}`);
			hasFailed = true;
		}
	}

	exit(hasFailed ? 1 : 0);
}

checkLink();
