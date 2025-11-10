import Copy from "@/assets/icons/copy.svg?react";
import Hash from "@/assets/icons/hash.svg?react";
import Pipeline from "@/assets/icons/pipeline.svg?react";
import Terminal from "@/assets/icons/terminal.svg?react";
import Tick from "@/assets/icons/tick-circle.svg?react";
import { projectQueries } from "@/data/projects";
import { useCopy } from "@/lib/copy";
import { generateProjectImageUrl } from "@/lib/images";
import { routes } from "@/router/routes";
import { Project } from "@/types/projects";
import { useQuery } from "@tanstack/react-query";
import {
	Badge,
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger
} from "@zenml-io/react-component-library";
import { Box, Skeleton } from "@zenml-io/react-component-library/components/server";
import { Link } from "react-router-dom";
import { ProjectMenu } from "./project-menu";

type Props = {
	project: Project;
	isDefault?: boolean;
};

export function ProjectItem({ project, isDefault = false }: Props) {
	const displayName = project.body?.display_name;
	const imageUrl = generateProjectImageUrl(project.name);
	return (
		<Box className="group relative h-full overflow-hidden transition-all duration-300 hover:shadow-md">
			<div className="relative h-[180px] w-full">
				<img alt={project.name} src={imageUrl} className="h-full w-full object-cover" />
				<div className="absolute right-2 top-2 z-10 opacity-0 transition-all duration-300 group-hover:opacity-100">
					<ProjectMenu projectId={project.id} />
				</div>
			</div>
			<div className="space-y-5 p-5">
				<div className="space-y-0.5">
					<div className="flex items-center gap-2">
						<p className="truncate text-text-xl font-semibold">{displayName}</p>
						{isDefault && <DefaultProject />}
					</div>
					<div className="flex items-center gap-0.5 text-text-sm text-theme-text-secondary">
						<Hash width={16} height={16} className="shrink-0 fill-theme-text-tertiary" />
						<p className="truncate">{project.name}</p>
					</div>
				</div>
				<div className="space-y-4">
					<Statistics projectName={project.id} />
				</div>
				<SetProjectCommand projectId={project.name} />
			</div>
			<Link to={routes.projects.pipelines.overview} className="absolute inset-0"></Link>
		</Box>
	);
}

function Statistics({ projectName }: { projectName: string }) {
	const query = useQuery({
		...projectQueries.projectStatistics(projectName)
	});
	if (query.isPending) return <Skeleton className="h-4 w-[120px]" />;
	if (query.isError) return null;
	const statistics = query.data;
	return (
		<div className="flex items-center gap-1">
			<div className="flex items-center gap-0.5">
				<Pipeline width={16} height={16} className="shrink-0 fill-theme-text-tertiary" />
				<p className="text-text-sm text-theme-text-secondary">{statistics.pipelines} pipelines</p>
			</div>
			<div className="flex items-center gap-0.5">
				<Terminal width={16} height={16} className="shrink-0 fill-theme-text-tertiary" />
				<p className="text-text-sm text-theme-text-secondary">{statistics.runs} runs</p>
			</div>
		</div>
	);
}

export function SetProjectCommand({ projectId }: { projectId: string }) {
	const { copied, copyToClipboard } = useCopy();
	const loginCommand = `zenml project set ${projectId}`;

	return (
		<div className="flex items-center gap-2 truncate">
			<div className="flex w-full items-center justify-between gap-1 truncate rounded-md border border-theme-border-moderate bg-theme-surface-secondary px-2 py-1 text-text-sm text-theme-text-secondary">
				<code className="truncate font-normal">{loginCommand}</code>
				{copied ? (
					<>
						<Tick className="h-3 w-3 shrink-0 fill-theme-text-tertiary" />
						<p className="sr-only">copied successfully</p>
					</>
				) : (
					<button className="z-10" onClick={() => copyToClipboard(loginCommand)}>
						<Copy className="h-3 w-3 shrink-0 fill-theme-text-tertiary" />
						<p className="sr-only">Copy tenantUrl</p>
					</button>
				)}
			</div>
		</div>
	);
}

function DefaultProject() {
	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger className="z-10">
					<Badge size="sm" rounded={false} className="font-semibold uppercase" color="purple">
						Default
					</Badge>
				</TooltipTrigger>
				<TooltipContent className="max-w-[320px] space-y-0.5">
					<p className="font-semibold">This is your default project in this workspace</p>
					<p>This project is used automatically when no specific project is selected</p>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
}
