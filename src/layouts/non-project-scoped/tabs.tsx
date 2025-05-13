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
type TabValues = "projects" | "stacks" | "components" | "settings";

export function NonProjectTabs() {
	const navigate = useNavigate();
	const segment = (useRouteSegment(0) as TabValues) || "projects";

	function changeVal(val: string) {
		switch (val) {
			case "projects":
				navigate(routes.projects.overview);
				break;
			case "stacks":
				navigate(routes.stacks.overview);
				break;
			case "components":
				navigate(routes.components.overview);
				break;
			case "settings":
				navigate(routes.settings.members);
				break;
		}
	}

	return (
		<Tabs onValueChange={changeVal} value={segment}>
			<ScrollArea>
				<TabsList className="flex-nowrap border-none">
					<TabsTrigger value="projects">
						<span>Projects</span>
					</TabsTrigger>
					<TabsTrigger value="stacks">
						<span>Stacks</span>
					</TabsTrigger>
					<TabsTrigger value="components">
						<span>Components</span>
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
