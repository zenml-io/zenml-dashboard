import { CreateStacksLayout } from "@/app/stacks/create/layout";
import { RootBoundary } from "@/error-boundaries/RootBoundary";
import { AuthenticatedLayout } from "@/layouts/AuthenticatedLayout";
import { lazy } from "react";
import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import { PageBoundary } from "../error-boundaries/PageBoundary";
import { GradientLayout } from "../layouts/GradientLayout";
import { RootLayout } from "../layouts/RootLayout";
import { StackComponentsLayout } from "../layouts/StackComponentsLayout";
import { authenticatedLayoutLoader, rootLoader } from "./loaders";
import { ProtectedRoute } from "./ProtectedRoute";
import { queryClient } from "./queryclient";
import { routes } from "./routes";

const Home = lazy(() => import("@/app/page"));
const Login = lazy(() => import("@/app/login/page"));
const Upgrade = lazy(() => import("@/app/upgrade/page"));
const ActivateUser = lazy(() => import("@/app/activate-user/page"));
const ActivateServer = lazy(() => import("@/app/activate-server/page"));
const Pipelines = lazy(() => import("@/app/pipelines/page"));
const PipelinesNamespace = lazy(() => import("@/app/pipelines/[namespace]/page"));

const RunDetail = lazy(() => import("@/app/runs/[id]/page"));
const RunNotFound = lazy(() => import("@/app/runs/[id]/not-found"));

const Settings = lazy(() => import("@/app/settings/page"));
const Connectors = lazy(() => import("@/app/settings/connectors/page"));
const Repositories = lazy(() => import("@/app/settings/repositories/page"));
const APITokens = lazy(() => import("@/app/settings/api-tokens/page"));
const Secrets = lazy(() => import("@/app/settings/secrets/page"));
const SecretDetailsPage = lazy(() => import("@/app/settings/secrets/[id]/page"));
const ServiceAccountsOverview = lazy(() => import("@/app/settings/service-accounts/page"));
const ServiceAccountsDetail = lazy(
	() => import("@/app/settings/service-accounts/[service-account-id]/page")
);

// Components
const Components = lazy(() => import("@/app/components/page"));
const ComponentDetail = lazy(() => import("@/app/components/[componentId]/page"));

//Stacks
const Stacks = lazy(() => import("@/app/stacks/page"));
const CreateStack = lazy(() => import("@/app/stacks/create/page"));
const CreateStackNewInfra = lazy(() => import("@/app/stacks/create/new-infrastructure/page"));
const CreateStackManually = lazy(() => import("@/app/stacks/create/manual/page"));
const CreateStackExistingInfra = lazy(
	() => import("@/app/stacks/create/existing-infrastructure/page")
);
const CreateTerraform = lazy(() => import("@/app/stacks/create/terraform/page"));

const DeviceVerification = lazy(() => import("@/app/devices/verify/page"));
const Models = lazy(() => import("@/app/models/page"));
const Artifacts = lazy(() => import("@/app/artifacts/page"));

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
						path={routes.upgrade}
						element={
							<ProtectedRoute>
								<Upgrade />
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
									<APITokens />
								</ProtectedRoute>
							}
							path="api-tokens"
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
							path="service-accounts"
							element={
								<ProtectedRoute>
									<ServiceAccountsOverview />
								</ProtectedRoute>
							}
						/>
						<Route
							path="service-accounts/:serviceAccountId"
							element={
								<ProtectedRoute>
									<ServiceAccountsDetail />
								</ProtectedRoute>
							}
						/>
					</Route>
					<Route
						errorElement={<PageBoundary />}
						path={routes.components.detail(":componentId")}
						element={
							<ProtectedRoute>
								<ComponentDetail />
							</ProtectedRoute>
						}
					/>
					<Route element={<StackComponentsLayout />}>
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
							errorElement={<PageBoundary />}
							path={routes.components.overview}
							element={
								<ProtectedRoute>
									<Components />
								</ProtectedRoute>
							}
						/>
					</Route>
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
						<Route
							errorElement={<PageBoundary />}
							path={routes.stacks.create.existingInfra}
							element={
								<ProtectedRoute>
									<CreateStackExistingInfra />
								</ProtectedRoute>
							}
						/>
						<Route
							errorElement={<PageBoundary />}
							path={routes.stacks.create.terraform}
							element={
								<ProtectedRoute>
									<CreateTerraform />
								</ProtectedRoute>
							}
						/>
						<Route
							errorElement={<PageBoundary />}
							path={routes.stacks.create.manual}
							element={
								<ProtectedRoute>
									<CreateStackManually />
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
			</Route>
			<Route path="*" element={<NotFoundPage />} />
		</Route>
	)
);
