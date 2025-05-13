"use client";
import Box from "@/assets/icons/container.svg?react";
import SlashDivider from "@/assets/icons/slash-divider.svg?react";
import { CopyButton } from "@/components/CopyButton";
import { projectQueries } from "@/data/projects";
import { useServerInfo } from "@/data/server/info-query";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@zenml-io/react-component-library";

export function IdSection() {
	return (
		<div className="flex items-center gap-5 truncate">
			<div className="flex aspect-square h-8 w-8 shrink-0 items-center justify-center rounded-md bg-primary-25">
				<Box width={24} height={24} className="shrink-0 fill-primary-400" />
			</div>
			<div className="truncate">
				<Id />
				<div className="flex items-center">
					<WorkspaceName />
					<SlashDivider width={20} height={20} className="shrink-0 fill-neutral-200" />
					<ProjectName />
				</div>
			</div>
		</div>
	);
}

function WorkspaceName() {
	const serverQuery = useServerInfo();

	if (serverQuery.isPending) return <Skeleton className="h-6 w-[300px]" />;
	if (serverQuery.isError) return null;

	const server = serverQuery.data;

	return (
		<p className="truncate text-theme-text-tertiary">{server.name || server.id?.split("-")[0]}</p>
	);
}

function ProjectName() {
	return <p className="truncate text-text-xl font-semibold">default</p>;
}

function Id() {
	const projectQuery = useQuery({ ...projectQueries.projectDetail("default") });

	if (projectQuery.isPending) return <Skeleton className="h-4 w-[100px]" />;
	if (projectQuery.isError) return null;

	const project = projectQuery.data;

	return (
		<div className="group/copybutton flex items-center gap-1">
			<p className="text-text-sm text-theme-text-secondary">{project.id.split("-")[0]}</p>
			<CopyButton copyText={project.id} />
		</div>
	);
}
