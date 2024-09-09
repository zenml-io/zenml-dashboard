import MetadataIcon from "@/assets/icons/code-square.svg?react";
import Info from "@/assets/icons/info.svg?react";
import TemplatesIcon from "@/assets/icons/pipeline-template.svg?react";
import PipelineIcon from "@/assets/icons/pipeline.svg?react";
import RunIcon from "@/assets/icons/terminal.svg?react";
import Tools from "@/assets/icons/tool-02.svg?react";
import { capitalize } from "@/lib/strings";
import { routes } from "@/router/routes";

export const matchSegmentWithRequest = ({ segment, data }: { segment: string; data?: any }) => {
	const routeMap: { [key: string]: { [key: string]: { id?: string | null; name?: string } } } = {
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
		secrets: {
			secrets: { name: "Secrets" }
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
		...generateRouteMap(["onboarding", "overview", "models", "artifacts"]),
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
		pipelines: routes.pipelines.overview + "?tab=pipelines",
		pipeline_detail: routes.pipelines.namespace(id),
		runs: routes.runs.detail(id),
		//Stacks
		stacks: routes.stacks.overview,
		createStack: routes.stacks.create.index,
		//Secrets
		secrets: routes.settings.secrets.overview
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
		templates: <TemplatesIcon className={iconClasses} />
	};

	return routeMap[segment] || <Info className="h-5 w-5 fill-theme-text-tertiary" />;
};
