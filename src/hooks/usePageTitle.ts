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
		if (is(routes.components.overview)) return "Components";

		// Non-project Settings: match specific routes first so they don't get shadowed by the generic prefix check.
		if (is(routes.settings.profile)) return "Profile Settings";
		if (is(routes.settings.members)) return "Members";
		if (is(routes.settings.apiTokens)) return "API Tokens";
		if (is(routes.settings.notifications)) return "Notifications";
		if (is(routes.settings.secrets.detail(":id"))) return "Secret";
		if (is(routes.settings.secrets.overview)) return "Secrets";
		if (is(routes.settings.connectors.overview)) return "Connectors";
		if (is(routes.settings.service_accounts.overview)) return "Service Accounts";
		if (is(routes.settings.general)) return "Settings";

		// Settings (and subpages) fallback
		// We intentionally use a prefix check to cover all nested settings paths not covered above.
		if (pathname.startsWith("/settings")) return "Settings";

		// Components detail/edit/create
		if (is(routes.components.detail(":componentId"))) return "Component";
		if (is(routes.components.edit(":componentId"))) return "Component";
		if (is(routes.components.create)) return "Components";

		// Project-scoped tabs
		if (is(routes.projects.pipelines.overview)) return "Pipelines";
		if (is(routes.projects.pipelines.namespace(":namespace"))) return "Pipeline";
		if (is(routes.projects.runs.overview)) return "Pipeline Runs";
		if (is(routes.projects.runs.detail(":runId"))) return "Run";
		if (is(routes.projects.models.overview)) return "Models";
		if (is(routes.projects.artifacts.overview)) return "Artifacts";
		if (is(routes.projects.templates.overview)) return "Run Templates";

		// Project-scoped settings
		if (is(routes.projects.settings.repositories.overview)) return "Repositories";
		if (is(routes.projects.settings.profile)) return "Profile Settings";

		return undefined;
	}, [pathname]);

	useEffect(() => {
		document.title = baseTitle ? `${baseTitle} - ZenML Dashboard` : "ZenML Dashboard";
	}, [baseTitle]);
}