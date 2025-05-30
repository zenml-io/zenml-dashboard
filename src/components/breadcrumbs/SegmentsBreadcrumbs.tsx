import MetadataIcon from "@/assets/icons/code-square.svg?react";
import Info from "@/assets/icons/info.svg?react";
import TemplatesIcon from "@/assets/icons/pipeline-template.svg?react";
import PipelineIcon from "@/assets/icons/pipeline.svg?react";
import Stack from "@/assets/icons/stack.svg?react";
import RunIcon from "@/assets/icons/terminal.svg?react";
import Tools from "@/assets/icons/tool-02.svg?react";
import { capitalize } from "@/lib/strings";
import { routes } from "@/router/routes";

export const matchSegmentWithRequest = ({ segment, data }: { segment: string; data?: any }) => {
	const routeMap: { [key: string]: { [key: string]: { id?: string | null; name?: string } } } = {
		upgrade: {
			upgrade: { name: "Upgrade" }
		},
		// Pipelines
		pipelines: {
			pipelines: { id: data?.body?.pipeline?.id, name: "Pipelines" }
		},
		pipeline_detail: {
			pipelines: { id: data?.body?.pipeline?.id, name: "Pipelines" },
			pipeline_detail: { id: data?.name, name: data?.name }
		},
		stacks: {
			stacks: { name: "Stacks" }
		},
		create_stack: {
			stacks: { name: "Stacks" },
			create: { name: "New Stack" }
		},
		createComponent: {
			components: { name: "Components" },
			createComponent: { name: "New Component" }
		},
		components: {
			components: { name: "Components" }
		},
		componentDetail: {
			components: { name: "Components" },
			component_detail: {
				id: data?.id,
				name: data?.name
			}
		},
		componentEdit: {
			components: { name: "Components" },
			component_detail: {
				id: data?.id,
				name: data?.name
			},
			component_edit: { name: "Edit", id: data?.id }
		},
		secrets: {
			secrets: { name: "Secrets" }
		},
		service_accounts: {
			service_accounts: { name: "Service Accounts" }
		},
		service_account_detail: {
			service_accounts: { name: "Service Accounts" },
			service_account_detail: { id: data?.name, name: data?.name }
		},
		secretsDetail: {
			secrets: { id: "secrets", name: "Secrets" },
			secretDetail: { id: data?.id, name: data?.name }
		},
		runsNoPipelines: {
			pipelines: { id: data?.body?.pipeline?.id, name: "Pipelines" },
			runs: { id: data?.id, name: data?.name }
		},
		runs: {
			pipelines: { id: data?.body?.pipeline?.id, name: "Pipelines" },
			pipeline_detail: {
				id: data?.body?.pipeline?.name,
				name: data?.body?.pipeline?.name
			},
			runs: { id: data?.id, name: data?.name }
		}
	};

	return routeMap[segment];
};

export const matchSegmentWithPages = (segment: string): any => {
	const generateRouteMap = (segments: string[], withSettings: boolean = false) => {
		return segments.reduce(
			(acc, name) => {
				acc[name] = withSettings
					? { settings: { name: "Settings" }, [name]: { name: capitalize(name) } }
					: { [name]: { name: capitalize(name) } };
				return acc;
			},
			{} as { [key: string]: any }
		);
	};

	const routeMap = {
		...generateRouteMap(["onboarding", "overview", "models", "artifacts", "upgrade"]),
		...generateRouteMap(
			[
				"general",
				"members",
				"roles",
				"updates",
				"repositories",
				"connectors",
				"notifications",
				"profile"
			],
			true
		)
	};

	return routeMap[segment];
};

export const matchSegmentWithURL = (segment: string, id: string) => {
	const routeMap: { [key: string]: string } = {
		// Pipelines
		pipelines: routes.projects.pipelines.overview + "?tab=pipelines",
		pipeline_detail: routes.projects.pipelines.namespace(id),
		runs: routes.projects.runs.detail(id),
		//Stacks
		stacks: routes.stacks.overview,
		createStack: routes.stacks.create.index,
		//Secrets
		secrets: routes.settings.secrets.overview,
		//components
		components: routes.components.overview,
		component_detail: routes.components.detail(id),
		component_edit: routes.components.edit(id),
		upgrade: routes.upgrade,
		// Service Accounts
		service_accounts: routes.settings.service_accounts.overview
	};

	return routeMap[segment] || "#";
};

const iconClasses = "h-5 w-5 fill-theme-text-tertiary";

export const matchSegmentWithTab = (segment: string) => {
	const routeMap: { [key: string]: JSX.Element } = {
		overview: <Info className={iconClasses} />,
		configuration: <Tools className={iconClasses} />,
		pipelines: <PipelineIcon className={iconClasses} />,
		metadata: <MetadataIcon className={iconClasses} />,
		runs: <RunIcon className={iconClasses} />,
		templates: <TemplatesIcon className={iconClasses} />,
		stack: <Stack className={iconClasses} />,
		stacks: <Stack className={iconClasses} />
	};

	return routeMap[segment] || <Info className="h-5 w-5 fill-theme-text-tertiary" />;
};
