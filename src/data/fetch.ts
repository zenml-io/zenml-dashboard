function updateConfig(init?: RequestInit): RequestInit {
	return {
		...init,
		credentials: "include",
		headers: {
			...init?.headers,
			"Source-Context": "dashboard"
		}
	};
}

export function fetcher(input: RequestInfo | URL, init?: RequestInit | undefined) {
	return fetch(input, updateConfig(init));
}
