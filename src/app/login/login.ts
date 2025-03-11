import { apiPaths, createApiPath } from "@/data/api";
import { FetchError } from "@/lib/fetch-error";
import { redirect } from "react-router-dom";
import { setAuthState } from "@/lib/sessions";
import { routes } from "@/router/routes";
import { LoaderFunctionArgs } from "react-router-dom";
import { fetcher } from "@/data/fetch";

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

export async function loginLoader({ params }: LoaderFunctionArgs) {
	try {
		const redirectLink = params.redirect;
		const data = await loginPro();
		if (data.access_token) {
			setAuthState("true");
			return redirect(redirectLink || routes.home);
		}
		return null;
	} catch (e) {
		console.error(e);
		return null;
	}
}
