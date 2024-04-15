import { removeAuthState } from "@/lib/sessions";
import { QueryCache, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@zenml-io/react-component-library";
import { Suspense } from "react";
import { RouterProvider } from "react-router-dom";
import { ReactFlowProvider } from "reactflow";
import "reactflow/dist/style.css";
import { AuthProvider } from "./context/AuthContext";
import { FetchError } from "./lib/fetch-error";
import { router } from "./router/Router";
import { routes } from "./router/routes";

function handle401() {
	removeAuthState();
	window.location.href =
		routes.login +
		`?${new URLSearchParams({ redirect: location.pathname + location.search }).toString()}`;
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
				<ReactFlowProvider>
					<QueryClientProvider client={queryClient}>
						<Toaster />
						<RouterProvider router={router} />
					</QueryClientProvider>
				</ReactFlowProvider>
			</AuthProvider>
		</Suspense>
	);
}
