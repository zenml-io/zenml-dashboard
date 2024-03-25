import { AuthenticatedLayout } from "@/layouts/AuthenticatedLayout";
import { PropsWithChildren, lazy } from "react";
import { Navigate, Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import { GradientLayout } from "../layouts/GradientLayout";
import { RootLayout } from "../layouts/RootLayout";
import { getAuthState, removeAuthState } from "@/lib/sessions";

const Home = lazy(() => import("@/app/page"));
const Login = lazy(() => import("@/app/login/page"));

export const router = createBrowserRouter(
	createRoutesFromElements(
		<Route element={<RootLayout />}>
			{/* AuthenticatedLayout */}
			<Route element={<AuthenticatedLayout />}>
				<Route
					path="/"
					element={
						<ProtectedRoute>
							<Home />
						</ProtectedRoute>
					}
				/>
			</Route>
			{/* Gradient Layout */}
			<Route element={<GradientLayout />}>
				<Route path="/login" element={<Login />} />
			</Route>
		</Route>
	)
);

function ProtectedRoute({ children }: PropsWithChildren) {
	const isLoggedIn = getAuthState();
	if (!isLoggedIn) {
		removeAuthState();
		return <Navigate to="/login" />;
	}
	return children;
}
