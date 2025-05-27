import { useRouteSegment } from "@/hooks/use-route-segment";
import { routes } from "@/router/routes";
import {
	ScrollArea,
	ScrollBar,
	Tabs,
	TabsList,
	TabsTrigger
} from "@zenml-io/react-component-library/components/client";
import { useNavigate } from "react-router-dom";

// settings is in brackets because of the file structure
type TabValues = "pipelines" | "runs" | "run-templates" | "artifacts" | "models" | "settings";

export function ProjectTabs() {
	const navigate = useNavigate();
	const segment = (useRouteSegment(2) as TabValues) || "pipelines";

	function changeVal(val: string) {
		switch (val) {
			case "pipelines":
				navigate(routes.projects.pipelines.overview);
				break;
			case "runs":
				navigate(routes.projects.runs.overview);
				break;
			case "run-templates":
				navigate(routes.projects.templates.overview);
				break;
			case "artifacts":
				navigate(routes.projects.artifacts.overview);
				break;
			case "models":
				navigate(routes.projects.models.overview);
				break;
			case "settings":
				navigate(routes.projects.settings.repositories.overview);
				break;
		}
	}

	return (
		<Tabs value={segment} onValueChange={changeVal}>
			<ScrollArea>
				<TabsList className="flex-nowrap border-none">
					<TabsTrigger value="pipelines">
						<span>Pipelines</span>
					</TabsTrigger>
					<TabsTrigger value="runs">
						<span>Runs</span>
					</TabsTrigger>
					<TabsTrigger value="run-templates">
						<span>Run Templates</span>
					</TabsTrigger>
					<TabsTrigger value="artifacts">
						<span>Artifacts</span>
					</TabsTrigger>
					<TabsTrigger value="models">
						<span>Models</span>
					</TabsTrigger>
					<TabsTrigger value="settings">
						<span>Settings</span>
					</TabsTrigger>
				</TabsList>
				<ScrollBar className="" orientation="horizontal" />
			</ScrollArea>
		</Tabs>
	);
}
