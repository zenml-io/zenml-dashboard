import { routes } from "@/router/routes";
import { BreadcrumbSegment } from "./types";

export const componentBreadcrumb: BreadcrumbSegment = {
	label: "Components",
	href: routes.components.overview
};

export const pipelineBreadcrumb: BreadcrumbSegment = {
	label: "Pipelines",
	href: routes.projects.pipelines.overview
};

export const stacksBreadcrumb: BreadcrumbSegment = {
	label: "Stacks",
	href: routes.stacks.overview
};

export const runBreadcrumb: BreadcrumbSegment = {
	label: "Runs",
	href: routes.projects.runs.overview
};

export const ServerSettingsBreadcrumb: BreadcrumbSegment = {
	label: "Settings",
	href: routes.settings.general,
	disabled: true
};

export const SecretsBreadcrumb: BreadcrumbSegment[] = [
	ServerSettingsBreadcrumb,
	{
		label: "Secrets",
		href: routes.settings.secrets.overview
	}
];

export const serviceAccountBreadcrumb: BreadcrumbSegment[] = [
	ServerSettingsBreadcrumb,
	{
		label: "Service Accounts",
		href: routes.settings.service_accounts.overview
	}
];
