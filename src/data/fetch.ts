function updateConfig(init?: RequestInit): RequestInit {
	return {
		credentials: "include",
		...init,
		headers: {
			...init?.headers,
			"Source-Context": "dashboard-v2"
		}
	};
}

export function fetcher(input: RequestInfo | URL, init?: RequestInit | undefined) {
	return fetch(input, updateConfig(init));
}
