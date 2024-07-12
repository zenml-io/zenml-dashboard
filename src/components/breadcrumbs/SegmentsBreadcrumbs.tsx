import Info from "@/assets/icons/info.svg?react";
import Tools from "@/assets/icons/tool-02.svg?react";
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
					? { settings: { name: "settings" }, [name]: { name } }
					: { [name]: { name } };
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
				"secrets",
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
		pipelines: routes.pipelines.overview,
		pipeline_detail: routes.pipelines.namespace(id),
		runs: routes.runs.detail(id),
		//Stacks
		stacks: routes.stacks.overview,
		createStack: routes.stacks.create.index
	};

	return routeMap[segment] || "#";
};

export const matchSegmentWithTab = (segment: string) => {
	const routeMap: { [key: string]: JSX.Element } = {
		overview: <Info className="h-5 w-5 fill-theme-text-tertiary" />,
		configuration: <Tools className="h-5 w-5 fill-theme-text-tertiary" />
	};

	return routeMap[segment] || <Info className="h-5 w-5 fill-theme-text-tertiary" />;
};
