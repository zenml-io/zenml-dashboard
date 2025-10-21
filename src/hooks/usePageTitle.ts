import { useEffect, useMemo } from "react";
import { matchPath, useLocation } from "react-router-dom";
import { routes } from "@/router/routes";

/**
 * Sets a descriptive document.title based on the current route.
 */
export function usePageTitle(): void {
	const location = useLocation();
	const pathname = location.pathname;

	const baseTitle = useMemo(() => {
		// Helper to match exact route patterns (end=true by default for specificity).
		const is = (pattern: string, end: boolean = true) =>
			matchPath({ path: pattern, end }, pathname) !== null;

		// Public/standalone pages
		if (is(routes.login)) return "Login";
		if (is(routes.survey)) return "Survey";
		if (is(routes.onboarding)) return "Onboarding";
		if (is(routes.activateUser)) return "Activate Account";
		if (is(routes.activateServer)) return "Activate Server";
		if (is(routes.devices.verify)) return "Devices Verify";
		if (is(routes.upgrade)) return "Upgrade";

		// Non-project scoped
		if (is(routes.home)) return "Overview";
		if (is(routes.projects.overview)) return "Projects";
		if (is(routes.stacks.overview)) return "Stacks";
		// Stack creation flow titles are placed immediately after Stacks overview
		if (is(routes.stacks.create.index)) return "Create Stack";
		if (is(routes.stacks.create.newInfra)) return "Create Stack: New Infrastructure";
		if (is(routes.stacks.create.manual)) return "Create Stack: Manual";
		if (is(routes.stacks.create.existingInfra)) return "Create Stack: Existing Infrastructure";
		if (is(routes.stacks.create.terraform)) return "Create Stack: Terraform";
		if (is(routes.components.overview)) return "Components";

		// Non-project Settings: match specific routes first so they don't get shadowed by the generic prefix check.
		if (is(routes.settings.profile)) return "Profile Settings";
		if (is(routes.settings.members)) return "Members";
		if (is(routes.settings.apiTokens)) return "API Tokens";
		if (is(routes.settings.notifications)) return "Notifications";
		if (is(routes.settings.secrets.detail(":id"))) return "Secret";
		if (is(routes.settings.secrets.overview)) return "Secrets";
		if (is(routes.settings.connectors.detail.configuration(":connectorId")))
			return "Connector Configuration";
		if (is(routes.settings.connectors.detail.components(":connectorId")))
			return "Connector Components";
		if (is(routes.settings.connectors.detail.resources(":connectorId")))
			return "Connector Resources";
		if (is(routes.settings.connectors.create)) return "Create Connector";
		if (is(routes.settings.connectors.overview)) return "Connectors";
		if (is(routes.settings.service_accounts.detail(":id"))) return "Service Account";
		if (is(routes.settings.service_accounts.overview)) return "Service Accounts";
		if (is(routes.settings.general)) return "Settings";

		// Settings (and subpages) fallback
		// Use a prefix check to cover nested settings paths that are not explicitly handled above.
		if (pathname.startsWith("/settings")) return "Settings";

		// Components detail/edit/create
		if (is(routes.components.detail(":componentId"))) return "Component";
		if (is(routes.components.edit(":componentId"))) return "Component";
		if (is(routes.components.create)) return "Components";

		// Project-scoped: Pipelines and detail sub-tabs
		if (is(routes.projects.pipelines.overview)) return "Pipelines";
		if (is(routes.projects.pipelines.detail.runs(":pipelineId"))) return "Pipeline";
		if (is(routes.projects.pipelines.detail.snapshots(":pipelineId"))) return "Pipeline Snapshots";
		if (is(routes.projects.pipelines.detail.deployments(":pipelineId")))
			return "Pipeline Deployments";

		// Project-scoped: Snapshots
		if (is(routes.projects.snapshots.overview)) return "Snapshots";
		if (is(routes.projects.snapshots.detail.overview(":snapshotId"))) return "Snapshot";
		if (is(routes.projects.snapshots.detail.runs(":snapshotId"))) return "Snapshot Runs";

		// Project-scoped: Runs
		if (is(routes.projects.runs.overview)) return "Pipeline Runs";
		if (is(routes.projects.runs.detail(":runId"))) return "Run";

		// Project-scoped: Deployments
		if (is(routes.projects.deployments.overview)) return "Deployments";
		if (is(routes.projects.deployments.detail.overview(":deploymentId"))) return "Deployment";

		// Project-scoped: Other tabs
		if (is(routes.projects.models.overview)) return "Models";
		if (is(routes.projects.artifacts.overview)) return "Artifacts";

		// Project-scoped settings
		if (is(routes.projects.settings.repositories.overview)) return "Repositories";
		if (is(routes.projects.settings.profile)) return "Profile Settings";

		return undefined;
	}, [pathname]);

	useEffect(() => {
		document.title = baseTitle ? `${baseTitle} - ZenML Dashboard` : "ZenML Dashboard";
	}, [baseTitle]);
}
