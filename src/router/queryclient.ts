import { removeAuthState } from "@/lib/sessions";
import { QueryCache, QueryClient } from "@tanstack/react-query";
import { FetchError } from "@/lib/fetch-error";
import { routes } from "./routes";

function handle401() {
	removeAuthState();
	window.location.href =
		routes.login +
		`?${new URLSearchParams({ redirect: location.pathname + location.search }).toString()}`;
}

export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: false
		}
	},
	queryCache: new QueryCache({
		onError: (error) => {
			if (error instanceof FetchError) {
				if (error.status === 401) {
					handle401();
				}
			}
		}
	})
});
