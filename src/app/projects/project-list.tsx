import { projectQueries } from "@/data/projects";
import { useCurrentUser } from "@/data/users/current-user-query";
import { useQuery } from "@tanstack/react-query";
import { ProjectItem } from "./project-item";
import { Skeleton } from "@zenml-io/react-component-library";

export function ProjectList() {
	const projectQuery = useQuery({ ...projectQueries.projectDetail("default") });
	const currentUserQuery = useCurrentUser();
	if (projectQuery.isPending || currentUserQuery.isPending)
		return (
			<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
				<div className="h-full w-full">
					<Skeleton className="h-[400px] w-full" />
				</div>
			</div>
		);
	if (projectQuery.isError) {
		return <p>{projectQuery.error.message}</p>;
	}
	const project = projectQuery.data;

	const defaultProjectId = currentUserQuery.data?.body?.default_project_id;

	return (
		<ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
			<li>
				<ProjectItem project={project} isDefault={defaultProjectId === project.id} />
			</li>
		</ul>
	);
}
