import { RootBoundary } from "@/error-boundaries/RootBoundary";
import { useAuthContext } from "@/context/AuthContext";
import { AuthenticatedLayout } from "@/layouts/AuthenticatedLayout";
import { PropsWithChildren, lazy } from "react";
import { Navigate, Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import { PageBoundary } from "../error-boundaries/PageBoundary";
import { GradientLayout } from "../layouts/GradientLayout";
import { RootLayout } from "../layouts/RootLayout";
import { routes } from "./routes";
import { authenticatedLayoutLoader, rootLoader } from "./loaders";
import { queryClient } from "./queryclient";
import { surveyLoader } from "@/app/survey/loader";
import { CreateStacksLayout } from "@/app/stacks/create/layout";

const Home = lazy(() => import("@/app/page"));
const Login = lazy(() => import("@/app/login/page"));
const ActivateUser = lazy(() => import("@/app/activate-user/page"));
const ActivateServer = lazy(() => import("@/app/activate-server/page"));
const Pipelines = lazy(() => import("@/app/pipelines/page"));
const PipelinesNamespace = lazy(() => import("@/app/pipelines/[namespace]/page"));

const RunDetail = lazy(() => import("@/app/runs/[id]/page"));
const RunNotFound = lazy(() => import("@/app/runs/[id]/not-found"));

const MembersPage = lazy(() => import("@/app/settings/members/page"));
const ProfileSettingsPage = lazy(() => import("@/app/settings/profile/page"));
// Settings
const Settings = lazy(() => import("@/app/settings/page"));
const Notifications = lazy(() => import("@/app/settings/notifications/page"));
const Connectors = lazy(() => import("@/app/settings/connectors/page"));
const Repositories = lazy(() => import("@/app/settings/repositories/page"));
const Secrets = lazy(() => import("@/app/settings/secrets/page"));
const SecretDetailsPage = lazy(() => import("@/app/settings/secrets/secretsDetail/page"));
const GeneralSettings = lazy(() => import("@/app/settings/general/page"));

//Stacks
const Stacks = lazy(() => import("@/app/stacks/page"));
const CreateStack = lazy(() => import("@/app/stacks/create/page"));
const CreateStackNewInfra = lazy(() => import("@/app/stacks/create/new-infrastructure/page"));

const DeviceVerification = lazy(() => import("@/app/devices/verify/page"));
const Models = lazy(() => import("@/app/models/page"));
const Artifacts = lazy(() => import("@/app/artifacts/page"));

const Survey = lazy(() => import("@/app/survey/page"));
const Onboarding = lazy(() => import("@/app/onboarding/page"));

const NotFoundPage = lazy(() => import("@/app/404"));

export const router = createBrowserRouter(
	createRoutesFromElements(
		<Route
			loader={rootLoader(queryClient)}
			errorElement={<RootBoundary />}
			element={<RootLayout />}
		>
			{/* AuthenticatedLayout */}
			<Route
				loader={authenticatedLayoutLoader(queryClient)}
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
						errorElement={
							<PageBoundary>
								<RunNotFound />
							</PageBoundary>
						}
						path={routes.runs.detail(":runId")}
						element={
							<ProtectedRoute>
								<RunDetail />
							</ProtectedRoute>
						}
					/>

					<Route
						errorElement={<PageBoundary />}
						path={routes.onboarding}
						element={
							<ProtectedRoute>
								<Onboarding />
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
							element={
								<ProtectedRoute>
									<GeneralSettings />
								</ProtectedRoute>
							}
							path="general"
						/>
						<Route
							element={
								<ProtectedRoute>
									<Notifications />
								</ProtectedRoute>
							}
							path="notifications"
						/>
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
							path="secrets/:secretId"
							element={
								<ProtectedRoute>
									<SecretDetailsPage />
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
					<Route
						element={
							<ProtectedRoute>
								<CreateStacksLayout />
							</ProtectedRoute>
						}
					>
						<Route
							errorElement={<PageBoundary />}
							path={routes.stacks.create.index}
							element={
								<ProtectedRoute>
									<CreateStack />
								</ProtectedRoute>
							}
						/>
						<Route
							errorElement={<PageBoundary />}
							path={routes.stacks.create.newInfra}
							element={
								<ProtectedRoute>
									<CreateStackNewInfra />
								</ProtectedRoute>
							}
						/>
					</Route>
				</Route>
			</Route>

			{/* Gradient Layout */}
			<Route element={<GradientLayout />}>
				<Route path={routes.login} element={<Login />} />
				<Route path={routes.activateUser} element={<ActivateUser />} />
				<Route path={routes.activateServer} element={<ActivateServer />} />
				<Route
					path={routes.devices.verify}
					element={
						<ProtectedRoute>
							<DeviceVerification />
						</ProtectedRoute>
					}
				/>
				<Route
					loader={surveyLoader(queryClient)}
					path={routes.survey}
					element={
						<ProtectedRoute>
							<Survey />
						</ProtectedRoute>
					}
				/>
			</Route>
			<Route path="*" element={<NotFoundPage />} />
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
					`?${new URLSearchParams({
						redirect: location.pathname + location.search
					}).toString()}`
				}
			/>
		);
	}
	return children;
}
