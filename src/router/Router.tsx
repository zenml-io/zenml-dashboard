import { useAuthContext } from "@/context/AuthContext";
import { RootBoundary } from "@/error-boundaries/RootBoundary";
import { AuthenticatedLayout } from "@/layouts/AuthenticatedLayout";
import { PropsWithChildren, lazy } from "react";
import { Navigate, Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import { PageBoundary } from "../error-boundaries/PageBoundary";
import { GradientLayout } from "../layouts/GradientLayout";
import { RootLayout } from "../layouts/RootLayout";
import { routes } from "./routes";

const Home = lazy(() => import("@/app/page"));
const Login = lazy(() => import("@/app/login/page"));
const Pipelines = lazy(() => import("@/app/pipelines/page"));
const PipelinesNamespace = lazy(() => import("@/app/pipelines/[namespace]/page"));
const RunDetail = lazy(() => import("@/app/runs/[id]/page"));
const MembersPage = lazy(() => import("@/app/settings/members/page"));
const ProfileSettingsPage = lazy(() => import("@/app/settings/profile/page"));
// Settings
const Settings = lazy(() => import("@/app/settings/page"));
const Stacks = lazy(() => import("@/app/stacks/page"));
const DeviceVerification = lazy(() => import("@/app/devices/verify/page"));
const Models = lazy(() => import("@/app/models/page"));
const Artifacts = lazy(() => import("@/app/artifacts/page"));
const Repositories = lazy(() => import("@/app/settings/repositories/page"));
const Secrets = lazy(() => import("@/app/settings/secrets/page"));
const Connectors = lazy(() => import("@/app/settings/connectors/page"));

export const router = createBrowserRouter(
	createRoutesFromElements(
		<Route errorElement={<RootBoundary />} element={<RootLayout />}>
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
						path={routes.models.overview}
						element={
							<ProtectedRoute>
								<Models />
							</ProtectedRoute>
						}
					/>
					<Route
						errorElement={<PageBoundary />}
						path={routes.artifacts.overview}
						element={
							<ProtectedRoute>
								<Artifacts />
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
					<Route
						path="/settings"
						element={
							<ProtectedRoute>
								<Settings />
							</ProtectedRoute>
						}
					>
						<Route
							path="repositories"
							element={
								<ProtectedRoute>
									<Repositories />
								</ProtectedRoute>
							}
						/>
						<Route
							path="connectors"
							element={
								<ProtectedRoute>
									<Connectors />
								</ProtectedRoute>
							}
						/>
						<Route
							path="secrets"
							element={
								<ProtectedRoute>
									<Secrets />
								</ProtectedRoute>
							}
						/>

						<Route
							path="members"
							element={
								<ProtectedRoute>
									<MembersPage />
								</ProtectedRoute>
							}
						/>
						<Route
							path="profile"
							element={
								<ProtectedRoute>
									<ProfileSettingsPage />
								</ProtectedRoute>
							}
						/>
					</Route>
					<Route
						errorElement={<PageBoundary />}
						path={routes.stacks.overview}
						element={
							<ProtectedRoute>
								<Stacks />
							</ProtectedRoute>
						}
					/>
				</Route>
			</Route>

			{/* Gradient Layout */}
			<Route element={<GradientLayout />}>
				<Route path={routes.login} element={<Login />} />
				<Route
					path={routes.devices.verify}
					element={
						<ProtectedRoute>
							<DeviceVerification />
						</ProtectedRoute>
					}
				/>
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
				to={
					routes.login +
					`?${new URLSearchParams({ redirect: location.pathname + location.search }).toString()}`
				}
			/>
		);
	}
	return children;
}
