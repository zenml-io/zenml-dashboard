import { useAuthContext } from "@/context/AuthContext";
import { RootBoundary } from "@/error-boundaries/RootBoundary";
import { AuthenticatedLayout } from "@/layouts/AuthenticatedLayout";
import { PropsWithChildren, lazy } from "react";
import { Navigate, Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import { PageBoundary } from "../error-boundaries/PageBoundary";
import { GradientLayout } from "../layouts/GradientLayout";
import { RootLayout } from "../layouts/RootLayout";

const Home = lazy(() => import("@/app/page"));
const Login = lazy(() => import("@/app/login/page"));
const Pipelines = lazy(() => import("@/app/pipelines/page"));

export const router = createBrowserRouter(
	createRoutesFromElements(
		<Route element={<RootLayout />}>
			{/* AuthenticatedLayout */}
			<Route element={<AuthenticatedLayout />}>
				<Route errorElement={<RootBoundary />}>
					<Route
						errorElement={<PageBoundary />}
						path="/"
						element={
							<ProtectedRoute>
								<Home />
							</ProtectedRoute>
						}
					/>
					<Route
						errorElement={<PageBoundary />}
						path="/pipelines"
						element={
							<ProtectedRoute>
								<Pipelines />
							</ProtectedRoute>
						}
					/>
				</Route>
			</Route>

			{/* Gradient Layout */}
			<Route element={<GradientLayout />}>
				<Route path="/login" element={<Login />} />
			</Route>
		</Route>
	)
);

function ProtectedRoute({ children }: PropsWithChildren) {
	const { getAuthState, removeAuthState } = useAuthContext();
	const isLoggedIn = getAuthState();
	if (!isLoggedIn) {
		removeAuthState();
		return <Navigate to="/login" />;
	}
	return children;
}
