import { apiPaths, createApiPath } from "@/data/api";
import { fetcher } from "@/data/fetch";
import { FetchError } from "@/lib/fetch-error";

export async function loginPro() {
	const url = createApiPath(apiPaths.login);

	const res = await fetcher(url, {
		method: "POST",
		credentials: "include"
	});

	if (!res.ok) {
		const data = await res
			.json()
			.then((data) => data.detail)
			.catch(() => ["", "Failed to login"]);
		throw new FetchError({
			status: res.status,
			statusText: res.statusText,
			message: data[1] || "Failed to login"
		});
	}

	return res.json();
}
