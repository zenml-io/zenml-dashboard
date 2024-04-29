import { FetchError } from "@/lib/fetch-error";
import { removeAuthState } from "@/lib/sessions";
import { QueryCache, QueryClient } from "@tanstack/react-query";

function handle401() {
	removeAuthState();
	window.location.reload();
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
