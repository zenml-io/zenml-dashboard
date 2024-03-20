import { Suspense } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./router/Router";

export function App() {
	return (
		<Suspense>
			<RouterProvider router={router} />
		</Suspense>
	);
}
