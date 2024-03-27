import { Suspense } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./router/Router";
import { QueryCache, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { FetchError } from "./lib/fetch-error";
import { removeAuthState } from "@/lib/sessions";
import { routes } from "./router/routes";
import { AuthProvider } from "./context/AuthContext";

function handle401() {
	removeAuthState();
	window.location.href =
		routes.login + `?${new URLSearchParams({ redirect: location.pathname }).toString()}`;
}

const queryClient = new QueryClient({
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

export function App() {
	return (
		<Suspense>
			<AuthProvider>
				<QueryClientProvider client={queryClient}>
					<RouterProvider router={router} />
				</QueryClientProvider>
			</AuthProvider>
		</Suspense>
	);
}
