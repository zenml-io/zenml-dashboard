import { ProjectList } from "./project-list";
import { ProjectsSearchBar } from "./searchbar";

export default function ProjectsPage() {
	return (
		<div className="layout-container space-y-4 py-5">
			<ProjectsSearchBar />
			<ProjectList />
		</div>
	);
}
