import { useAuthContext } from "@/context/AuthContext";
import { RootBoundary } from "@/error-boundaries/RootBoundary";
import { AuthenticatedLayout } from "@/layouts/AuthenticatedLayout";
import { PropsWithChildren, lazy } from "react";
import { Navigate, Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import { PageBoundary } from "../error-boundaries/PageBoundary";
import { GradientLayout } from "../layouts/GradientLayout";
import { RootLayout } from "../layouts/RootLayout";
import { routes } from "./routes";
import GeneralSettingsPage from "@/app/settings/general/GeneralPage";
import MembersPage from "@/app/settings/members/MembersPage";
import ProfilePage from "@/app/settings/profile/ProfilePage";

const Home = lazy(() => import("@/app/page"));
const Login = lazy(() => import("@/app/login/page"));
const Pipelines = lazy(() => import("@/app/pipelines/page"));
const PipelinesNamespace = lazy(() => import("@/app/pipelines/[namespace]/page"));
const RunDetail = lazy(() => import("@/app/runs/[id]/page"));

// Settings
const Settings = lazy(() => import("@/app/settings/page"));

export const router = createBrowserRouter(
	createRoutesFromElements(
		<Route element={<RootLayout />}>
			{/* AuthenticatedLayout */}
			<Route
				element={
					<ProtectedRoute>
						<AuthenticatedLayout />
					</ProtectedRoute>
				}
			>
				<Route errorElement={<RootBoundary />}>
					<Route
						errorElement={<PageBoundary />}
						path={routes.home}
						element={
							<ProtectedRoute>
								<Home />
							</ProtectedRoute>
						}
					/>
					<Route
						errorElement={<PageBoundary />}
						path={routes.pipelines.overview}
						element={
							<ProtectedRoute>
								<Pipelines />
							</ProtectedRoute>
						}
					/>
					<Route
						errorElement={<PageBoundary />}
						path={routes.pipelines.namespace(":namespace")}
						element={
							<ProtectedRoute>
								<PipelinesNamespace />
							</ProtectedRoute>
						}
					/>
					<Route
						errorElement={<PageBoundary />}
						path={routes.runs.detail(":runId")}
						element={
							<ProtectedRoute>
								<RunDetail />
							</ProtectedRoute>
						}
					/>
					<Route path="/settings" element={<Settings />}>
						<Route index element={<GeneralSettingsPage />} />
						<Route path="members" element={<MembersPage />} />
						<Route path="profile" element={<ProfilePage />} />
					</Route>
				</Route>
			</Route>

			{/* Gradient Layout */}
			<Route element={<GradientLayout />}>
				<Route path={routes.login} element={<Login />} />
			</Route>
		</Route>
	)
);

function ProtectedRoute({ children }: PropsWithChildren) {
	const { getAuthState, removeAuthState } = useAuthContext();
	const isLoggedIn = getAuthState();
	if (!isLoggedIn) {
		removeAuthState();
		return (
			<Navigate
				to={routes.login + `?${new URLSearchParams({ redirect: location.pathname }).toString()}`}
			/>
		);
	}
	return children;
}
