import ComponentDetailLayout from "@/app/components/[componentId]/layout";
import { CreateStacksLayout } from "@/app/stacks/create/layout";
import { RootBoundary } from "@/error-boundaries/RootBoundary";
import { AuthenticatedLayout } from "@/layouts/AuthenticatedLayout";
import { lazy } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import { PageBoundary } from "../error-boundaries/PageBoundary";
import { GradientLayout } from "../layouts/GradientLayout";
import { RootLayout } from "../layouts/RootLayout";
import { authenticatedLayoutLoader, rootLoader } from "./loaders";
import { withProtectedRoute } from "./ProtectedRoute";
import { queryClient } from "./queryclient";
import { routes } from "./routes";
import { NonProjectScopedLayout } from "@/layouts/non-project-scoped/layout";
import { ProjectTabsLayout } from "@/layouts/project-tabs/layout";

const Login = lazy(() => import("@/app/login/page"));
const Upgrade = lazy(() => import("@/app/upgrade/page"));
const ActivateUser = lazy(() => import("@/app/activate-user/page"));
const ActivateServer = lazy(() => import("@/app/activate-server/page"));
const Pipelines = lazy(() => import("@/app/pipelines/page"));
const PipelinesNamespace = lazy(() => import("@/app/pipelines/[namespace]/page"));

const RunDetail = lazy(() => import("@/app/runs/[id]/page"));

const MembersPage = lazy(() => import("@/app/settings/members/page"));
const ProfileSettingsPage = lazy(() => import("@/app/settings/profile/page"));
// Settings
const Settings = lazy(() => import("@/app/settings/page"));
const Notifications = lazy(() => import("@/app/settings/notifications/page"));
const Connectors = lazy(() => import("@/app/settings/connectors/page"));
const Repositories = lazy(() => import("@/app/settings/repositories/page"));
const APITokens = lazy(() => import("@/app/settings/api-tokens/page"));
const Secrets = lazy(() => import("@/app/settings/secrets/page"));
const SecretDetailsPage = lazy(() => import("@/app/settings/secrets/[id]/page"));
const GeneralSettings = lazy(() => import("@/app/settings/general/page"));
const ServiceAccountsOverview = lazy(() => import("@/app/settings/service-accounts/page"));
const ServiceAccountsDetail = lazy(
	() => import("@/app/settings/service-accounts/[service-account-id]/page")
);

// Components
const Components = lazy(() => import("@/app/components/page"));
const ComponentDetail = lazy(() => import("@/app/components/[componentId]/page"));
const ComponentCreate = lazy(() => import("@/app/components/create/page"));
const ComponentEdit = lazy(() => import("@/app/components/[componentId]/edit/page"));

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

const Survey = lazy(() => import("@/app/survey/page"));
const Onboarding = lazy(() => import("@/app/onboarding/page"));

const NotFoundPage = lazy(() => import("@/app/404"));

export const router = createBrowserRouter([
	{
		loader: rootLoader(queryClient),
		element: <RootLayout />,
		errorElement: <RootBoundary />,
		children: [
			// Authenticated Layout
			{
				loader: authenticatedLayoutLoader(queryClient),
				element: withProtectedRoute(<AuthenticatedLayout />),
				children: [
					{
						path: routes.home,
						errorElement: <PageBoundary />,
						element: <Navigate to={routes.projects.overview} />
					},
					// Non Project Scoped Tabs
					{
						element: <NonProjectScopedLayout />,
						children: [
							{
								errorElement: <PageBoundary />,
								path: routes.stacks.overview,
								element: withProtectedRoute(<Stacks />)
							},
							{
								errorElement: <PageBoundary />,
								path: routes.components.overview,
								element: withProtectedRoute(<Components />)
							},
							// Settings
							{
								errorElement: <PageBoundary />,
								path: "settings",
								element: withProtectedRoute(<Settings />),
								children: [
									{
										element: withProtectedRoute(<GeneralSettings />),
										path: "general"
									},
									{
										element: withProtectedRoute(<Notifications />),
										path: "notifications"
									},
									{
										element: withProtectedRoute(<APITokens />),
										path: "api-tokens"
									},
									{
										element: withProtectedRoute(<Secrets />),
										path: "secrets"
									},
									{
										element: withProtectedRoute(<SecretDetailsPage />),
										path: "secrets/:secretId"
									},
									{
										element: withProtectedRoute(<ServiceAccountsOverview />),
										path: "service-accounts"
									},
									{
										element: withProtectedRoute(<ServiceAccountsDetail />),
										path: "service-accounts/:serviceAccountId"
									},
									{
										element: withProtectedRoute(<Connectors />),
										path: "connectors"
									},
									{
										element: withProtectedRoute(<Repositories />),
										path: "repositories"
									},
									{
										element: withProtectedRoute(<MembersPage />),
										path: "members"
									},
									{
										element: withProtectedRoute(<ProfileSettingsPage />),
										path: "profile"
									}
								]
							}
						]
					},
					// Project Scoped Tabs
					{
						element: <ProjectTabsLayout />,
						children: [
							{
								errorElement: <PageBoundary />,
								path: routes.projects.pipelines.overview,
								element: withProtectedRoute(<Pipelines />)
							},
							// Models & Artifacts
							{
								errorElement: <PageBoundary />,
								path: routes.projects.models.overview,
								element: withProtectedRoute(<Models />)
							},
							{
								errorElement: <PageBoundary />,
								path: routes.projects.artifacts.overview,
								element: withProtectedRoute(<Artifacts />)
							}
						]
					},
					{
						errorElement: <PageBoundary />,
						path: routes.upgrade,
						element: withProtectedRoute(<Upgrade />)
					},
					{
						errorElement: <PageBoundary />,
						path: routes.onboarding,
						element: withProtectedRoute(<Onboarding />)
					},
					// Pipelines

					{
						errorElement: <PageBoundary />,
						path: routes.projects.pipelines.namespace(":namespace"),
						element: withProtectedRoute(<PipelinesNamespace />)
					},

					// Runs
					{
						errorElement: <PageBoundary />,
						path: routes.projects.runs.detail(":runId"),
						element: withProtectedRoute(<RunDetail />)
					},
					// Components
					{
						errorElement: <PageBoundary />,
						element: <ComponentDetailLayout />,
						children: [
							{
								errorElement: <PageBoundary />,
								path: routes.components.detail(":componentId"),
								element: withProtectedRoute(<ComponentDetail />)
							},
							{
								errorElement: <PageBoundary />,
								path: routes.components.edit(":componentId"),
								element: withProtectedRoute(<ComponentEdit />)
							}
						]
					},
					{
						errorElement: <PageBoundary />,
						path: routes.components.create,
						element: withProtectedRoute(<ComponentCreate />)
					},

					{
						element: <CreateStacksLayout />,
						children: [
							{
								errorElement: <PageBoundary />,
								path: routes.stacks.create.index,
								element: withProtectedRoute(<CreateStack />)
							},
							{
								errorElement: <PageBoundary />,
								path: routes.stacks.create.newInfra,
								element: withProtectedRoute(<CreateStackNewInfra />)
							},
							{
								errorElement: <PageBoundary />,
								path: routes.stacks.create.existingInfra,
								element: withProtectedRoute(<CreateStackExistingInfra />)
							},
							{
								errorElement: <PageBoundary />,
								path: routes.stacks.create.terraform,
								element: withProtectedRoute(<CreateTerraform />)
							},
							{
								errorElement: <PageBoundary />,
								path: routes.stacks.create.manual,
								element: withProtectedRoute(<CreateStackManually />)
							}
						]
					}
				]
			},
			// Gradient Layout
			{
				element: <GradientLayout />,
				children: [
					{
						path: routes.login,
						element: <Login />
					},
					{ path: routes.activateUser, element: <ActivateUser /> },
					{ path: routes.activateServer, element: <ActivateServer /> },
					{
						path: routes.devices.verify,
						element: withProtectedRoute(<DeviceVerification />)
					},
					{
						path: routes.survey,
						element: withProtectedRoute(<Survey />)
					}
				]
			},
			{ path: "*", element: <NotFoundPage /> }
		]
	}
]);
