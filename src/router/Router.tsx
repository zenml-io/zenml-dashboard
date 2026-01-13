import ComponentDetailLayout from "@/app/components/[componentId]/layout";
import DeploymentDetailLayout from "@/app/deployments/[deploymentId]/layout";
import PipelineDetailLayout from "@/app/pipelines/[pipelineId]/layout";
import SnapshotDetailLayout from "@/app/snapshots/[snapshotId]/layout";
import { CreateStacksLayout } from "@/app/stacks/create/layout";
import { RootBoundary } from "@/error-boundaries/RootBoundary";
import { AuthenticatedLayout } from "@/layouts/AuthenticatedLayout";
import ConnectorDetailLayout from "@/layouts/connectors-detail/layout";
import { NonProjectScopedLayout } from "@/layouts/non-project-scoped/layout";
import { ProjectTabsLayout } from "@/layouts/project-tabs/layout";
import { ProjectSettingsLayout } from "@/layouts/settings/project-settings/layout";
import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import { PageBoundary } from "../error-boundaries/PageBoundary";
import { GradientLayout } from "../layouts/GradientLayout";
import { RootLayout } from "../layouts/RootLayout";
import { authenticatedLayoutLoader, rootLoader } from "./loaders";
import { withProtectedRoute } from "./ProtectedRoute";
import { queryClient } from "./queryclient";
import { routes } from "./routes";
import { StackPageBoundary } from "@/app/stacks/[stackId]/stack-page-boundary";

const Overview = lazy(() => import("@/app/overview/page"));
const Login = lazy(() => import("@/app/login/page"));
const Upgrade = lazy(() => import("@/app/upgrade/page"));
const ActivateUser = lazy(() => import("@/app/activate-user/page"));
const ActivateServer = lazy(() => import("@/app/activate-server/page"));

// Pipelines
const Pipelines = lazy(() => import("@/app/pipelines/page"));
const PipelineDetail = lazy(() => import("@/app/pipelines/[pipelineId]/runs/page"));
const PipelineDetailSnapshots = lazy(() => import("@/app/pipelines/[pipelineId]/snapshots/page"));
const PipelineDetailDeployments = lazy(
	() => import("@/app/pipelines/[pipelineId]/deployments/page")
);

import { RunDetailLayout } from "@/app/runs/[id]/_layout/layout";
const RunDetail = lazy(() => import("@/app/runs/[id]/page"));
const RunLogsPage = lazy(() => import("@/app/runs/[id]/logs/page"));
// Snapshots
const GlobalSnapshots = lazy(() => import("@/app/snapshots/page"));
const SnapshotDetail = lazy(() => import("@/app/snapshots/[snapshotId]/page"));
const SnapshotDetailRuns = lazy(() => import("@/app/snapshots/[snapshotId]/runs/page"));
const CreateSnapshotFromRun = lazy(() => import("@/app/runs/[id]/create-snapshot/page"));
const CreateSnapshot = lazy(() => import("@/app/snapshots/create/page"));

// Deployments
const DeploymentsList = lazy(() => import("@/app/deployments/page"));
const DeploymentDetail = lazy(() => import("@/app/deployments/[deploymentId]/page"));
const DeploymentRuns = lazy(() => import("@/app/deployments/[deploymentId]/runs/page"));
const DeploymentPlayground = lazy(() => import("@/app/deployments/[deploymentId]/playground/page"));

const MembersPage = lazy(() => import("@/app/settings/members/page"));
const ProfileSettingsPage = lazy(() => import("@/app/settings/profile/page"));
// Settings
const Settings = lazy(() => import("@/layouts/settings/settings-layout/layout"));
const Notifications = lazy(() => import("@/app/settings/notifications/page"));
const MCPSettings = lazy(() => import("@/app/settings/mcp/page"));

const Connectors = lazy(() => import("@/app/settings/connectors/page"));
const ConnectorConfig = lazy(() => import("@/app/settings/connectors/[id]/configuration/page"));
const ConnectorComponents = lazy(() => import("@/app/settings/connectors/[id]/components/page"));
const ConnectorResources = lazy(() => import("@/app/settings/connectors/[id]/resources/page"));
const ConnectorCreate = lazy(() => import("@/app/settings/connectors/create/page"));

const Repositories = lazy(() => import("@/app/settings/repositories/page"));
const APITokens = lazy(() => import("@/app/settings/api-tokens/page"));
const Secrets = lazy(() => import("@/app/settings/secrets/page"));
const SecretDetailsPage = lazy(() => import("@/app/settings/secrets/[id]/page"));
const GeneralSettings = lazy(() => import("@/app/settings/general/page"));
const ServiceAccountsOverview = lazy(() => import("@/app/settings/service-accounts/page"));
const ServiceAccountsDetail = lazy(
	() => import("@/app/settings/service-accounts/[service-account-id]/page")
);

const Projects = lazy(() => import("@/app/projects/page"));
const Runs = lazy(() => import("@/app/runs/page"));

// Components
const Components = lazy(() => import("@/app/components/page"));
const ComponentDetail = lazy(() => import("@/app/components/[componentId]/page"));
const ComponentCreate = lazy(() => import("@/app/components/create/page"));
const ComponentEdit = lazy(() => import("@/app/components/[componentId]/edit/page"));

//Stacks
const Stacks = lazy(() => import("@/app/stacks/page"));
const CreateStack = lazy(() => import("@/app/stacks/create/page"));
const EditStacksLayout = lazy(() => import("@/app/stacks/[stackId]/edit/layout"));
const StackEdit = lazy(() => import("@/app/stacks/[stackId]/edit/page"));
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
					// Create Connector
					{
						errorElement: <PageBoundary />,
						path: routes.settings.connectors.create,
						element: withProtectedRoute(<ConnectorCreate />)
					},
					// Non Project Scoped Tabs
					{
						element: <NonProjectScopedLayout />,
						children: [
							{
								path: routes.home,
								errorElement: <PageBoundary />,
								element: withProtectedRoute(<Overview />)
							},
							{
								errorElement: <PageBoundary />,
								path: routes.projects.overview,
								element: withProtectedRoute(<Projects />)
							},
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
										element: withProtectedRoute(<MCPSettings />),
										path: "mcp"
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
									// Connectors Detail
									{
										element: <ConnectorDetailLayout />,
										children: [
											{
												element: withProtectedRoute(<ConnectorConfig />),
												path: routes.settings.connectors.detail.configuration(":connectorId"),
												errorElement: <PageBoundary />
											},
											{
												element: withProtectedRoute(<ConnectorComponents />),
												path: routes.settings.connectors.detail.components(":connectorId"),
												errorElement: <PageBoundary />
											},
											{
												element: withProtectedRoute(<ConnectorResources />),
												path: routes.settings.connectors.detail.resources(":connectorId"),
												errorElement: <PageBoundary />
											}
										]
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
							{
								errorElement: <PageBoundary />,
								path: routes.projects.snapshots.overview,
								element: withProtectedRoute(<GlobalSnapshots />)
							},
							{
								errorElement: <PageBoundary />,
								path: routes.projects.runs.overview,
								element: withProtectedRoute(<Runs />)
							},
							{
								errorElement: <PageBoundary />,
								path: routes.projects.deployments.overview,
								element: withProtectedRoute(<DeploymentsList />)
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
							},
							{
								element: <ProjectSettingsLayout />,
								children: [
									{
										element: withProtectedRoute(<Repositories />),
										path: routes.projects.settings.repositories.overview
									},
									{
										element: withProtectedRoute(<ProfileSettingsPage />),
										path: routes.projects.settings.profile
									}
								]
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
						element: withProtectedRoute(<PipelineDetailLayout />),
						children: [
							{
								errorElement: <PageBoundary />,
								path: routes.projects.pipelines.detail.runs(":pipelineId"),
								element: withProtectedRoute(<PipelineDetail />)
							},
							{
								errorElement: <PageBoundary />,
								path: routes.projects.pipelines.detail.snapshots(":pipelineId"),
								element: withProtectedRoute(<PipelineDetailSnapshots />)
							},
							{
								errorElement: <PageBoundary />,
								path: routes.projects.pipelines.detail.deployments(":pipelineId"),
								element: withProtectedRoute(<PipelineDetailDeployments />)
							}
						]
					},

					// Snapshots

					{
						errorElement: <PageBoundary />,
						path: routes.projects.snapshots.create,
						element: withProtectedRoute(<CreateSnapshot />)
					},

					{
						errorElement: <PageBoundary />,
						element: withProtectedRoute(<SnapshotDetailLayout />),
						children: [
							{
								errorElement: <PageBoundary />,
								path: routes.projects.snapshots.detail.overview(":snapshotId"),
								element: withProtectedRoute(<SnapshotDetail />)
							},
							{
								errorElement: <PageBoundary />,
								path: routes.projects.snapshots.detail.runs(":snapshotId"),
								element: withProtectedRoute(<SnapshotDetailRuns />)
							}
						]
					},

					// Deployments

					{
						errorElement: <PageBoundary />,
						element: withProtectedRoute(<DeploymentDetailLayout />),
						children: [
							{
								errorElement: <PageBoundary />,
								path: routes.projects.deployments.detail.overview(":deploymentId"),
								element: withProtectedRoute(<DeploymentDetail />)
							},
							{
								errorElement: <PageBoundary />,
								path: routes.projects.deployments.detail.runs(":deploymentId"),
								element: withProtectedRoute(<DeploymentRuns />)
							},
							{
								errorElement: <PageBoundary />,
								path: routes.projects.deployments.detail.playground(":deploymentId"),
								element: withProtectedRoute(<DeploymentPlayground />)
							}
						]
					},

					// {
					// 	errorElement: <PageBoundary />,
					// 	path: routes.projects.pipelines.detail.runs(":pipelineId"),
					// 	element: withProtectedRoute(<PipelineDetail />)
					// },

					// Runs
					{
						errorElement: <PageBoundary />,
						element: withProtectedRoute(<RunDetailLayout />),
						children: [
							{
								errorElement: <PageBoundary />,
								path: routes.projects.runs.detail(":runId"),
								element: withProtectedRoute(<RunDetail />)
							},
							{
								errorElement: <PageBoundary />,
								path: routes.projects.runs.detailLogs(":runId"),
								element: withProtectedRoute(<RunLogsPage />)
							}
						]
					},

					{
						errorElement: <PageBoundary />,
						path: routes.projects.runs.createSnapshot(":runId"),
						element: withProtectedRoute(<CreateSnapshotFromRun />)
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
						errorElement: <PageBoundary />,
						element: <EditStacksLayout />,
						children: [
							{
								errorElement: <StackPageBoundary />,
								path: routes.stacks.edit(":stackId"),
								element: withProtectedRoute(<StackEdit />)
							}
						]
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
