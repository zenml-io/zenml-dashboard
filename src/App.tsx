import { Suspense } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./router/Router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<Suspense>
				<RouterProvider router={router} />
			</Suspense>
		</QueryClientProvider>
	);
}
