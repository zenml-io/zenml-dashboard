import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@zenml-io/react-component-library";
import { Suspense } from "react";
import { RouterProvider } from "react-router-dom";
import { ReactFlowProvider } from "reactflow";
import "reactflow/dist/style.css";
import { AuthProvider } from "./context/AuthContext";
import { router } from "./router/Router";
import { queryClient } from "./router/queryclient";
import { TourProvider } from "./components/tour/TourContext";

export function App() {
	return (
		<Suspense>
			<AuthProvider>
				<ReactFlowProvider>
					<TourProvider>
						<QueryClientProvider client={queryClient}>
							<Toaster />

							<RouterProvider router={router} />
						</QueryClientProvider>
					</TourProvider>
				</ReactFlowProvider>
			</AuthProvider>
		</Suspense>
	);
}
