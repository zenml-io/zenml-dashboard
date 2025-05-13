import RunIcon from "@/assets/icons/terminal.svg?react";
import { CopyButton } from "@/components/CopyButton";
import { DisplayDate } from "@/components/DisplayDate";
import { ExecutionStatusIcon, getExecutionStatusColor } from "@/components/ExecutionStatus";
import { InlineAvatar } from "@/components/InlineAvatar";
import { routes } from "@/router/routes";
import { CodeRepository } from "@/types/code-repository";
import { PipelineRun, PipelineRunBody } from "@/types/pipeline-runs";
import { Stack } from "@/types/stack";
import { User } from "@/types/user";
import { ColumnDef } from "@tanstack/react-table";
import {
	Tag,
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger
} from "@zenml-io/react-component-library";
import { Link } from "react-router-dom";
import { RunDropdown } from "../RunsTab/RunDropdown";
import { RunSelector } from "../RunsTab/RunSelector";

export function getPipelineDetailColumns(): ColumnDef<PipelineRun>[] {
	return [
		{
			id: "check",
			header: "",
			meta: {
				width: "1%"
			},
			accessorFn: (row) => ({ id: row.id }),
			cell: ({ getValue }) => {
				const { id } = getValue<{ id: string }>();
				return <RunSelector id={id} />;
			}
		},
		{
			id: "run",
			header: "Run",
			accessorFn: (row) => ({
				name: row.name,
				id: row.id,
				status: row.body?.status
			}),
			cell: ({ getValue }) => {
				const { name, status, id } = getValue<{
					name: PipelineRun["name"];
					id: PipelineRun["id"];
					status: PipelineRunBody["status"];
				}>();

				return (
					<div className="group/copybutton flex items-center gap-2">
						<RunIcon className={`h-5 w-5 shrink-0 ${getExecutionStatusColor(status)}`} />
						<div>
							<div className="flex items-center gap-1">
								<Link to={routes.projects.runs.detail(id)} className="flex items-center gap-1">
									<h2 className="text-text-md font-semibold">{name}</h2>
								</Link>
								<TooltipProvider>
									<Tooltip>
										<TooltipTrigger className="hover:text-theme-text-brand hover:underline">
											<ExecutionStatusIcon status={status} />
										</TooltipTrigger>
										<TooltipContent className="z-20 capitalize">{status}</TooltipContent>
									</Tooltip>
								</TooltipProvider>
								<CopyButton copyText={name} />
							</div>
							<Link to={routes.projects.runs.detail(id)} className="flex items-center gap-1">
								<p className="text-text-xs text-theme-text-secondary">{id.split("-")[0]}</p>
								<CopyButton copyText={id} />
							</Link>
						</div>
					</div>
				);
			}
		},
		{
			id: "stack",
			header: "Stack",
			accessorFn: (row) => ({
				name: row.body?.stack?.name,
				id: row.body?.stack?.id
			}),
			cell: ({ getValue }) => {
				const { name, id } = getValue<{
					hasPermissionsDenied: Stack["permission_denied"];
					name: Stack["name"];
					id: Stack["id"];
				}>();

				if (!name || !id) return null;

				return (
					<Link to={routes.stacks.overview}>
						<Tag rounded={false} className="inline-block" color="turquoise" emphasis="subtle">
							{name}
						</Tag>
					</Link>
				);
			}
		},
		{
			id: "repository",
			header: "Repository",
			accessorFn: (row) => ({
				name: row.body?.code_reference?.body?.code_repository.name,
				id: row.body?.code_reference?.body?.code_repository.id
			}),
			cell: ({ getValue }) => {
				const { name, id } = getValue<{
					hasPermissionsDenied?: CodeRepository["permission_denied"];
					name?: CodeRepository["name"];
					id?: CodeRepository["id"];
				}>();
				if (!name || !id) return null;

				return (
					<div>
						<Tag rounded={false} className="inline-block" color="grey" emphasis="subtle">
							{name}
						</Tag>
					</div>
				);
			}
		},
		{
			id: "created",
			header: "Created at",
			accessorFn: (row) => row.body?.created,
			cell: ({ getValue }) => (
				<p className="text-text-sm text-theme-text-secondary">
					<DisplayDate dateString={getValue<string>()} />
				</p>
			)
		},
		{
			id: "author",
			header: "Author",
			accessorFn: (row) => ({ author: row.body?.user }),
			cell: ({ getValue }) => {
				const { author } = getValue<{ author: User }>();
				return <InlineAvatar username={author.name} />;
			}
		},
		{
			id: "admin_actions",
			header: "",
			meta: {
				width: "5%"
			},
			cell: ({ row }) => {
				return <RunDropdown id={row.original.id} />;
			}
		}
	];
}
