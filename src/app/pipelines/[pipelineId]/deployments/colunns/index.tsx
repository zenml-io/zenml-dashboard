import Rocket from "@/assets/icons/rocket.svg?react";
import { CopyButton } from "@/components/CopyButton";
import { DisplayDate } from "@/components/DisplayDate";
import { InlineAvatar } from "@/components/InlineAvatar";
import { SnapshotLink } from "@/components/pipeline-snapshots/snapshot-link";
import { getDeploymentStatusBackground } from "@/lib/deployments";
import { capitalize } from "@/lib/strings";
import { routes } from "@/router/routes";
import { Deployment } from "@/types/deployments";
import { ColumnDef } from "@tanstack/react-table";
import { Tag } from "@zenml-io/react-component-library/components/server";
import { useMemo } from "react";
import { Link } from "react-router-dom";

export function useDeploymentColumns(): ColumnDef<Deployment>[] {
	return useMemo<ColumnDef<Deployment>[]>(
		() => [
			{
				id: "name",
				header: "Deployment",
				accessorFn: (row) => row.name,

				cell: ({ row }) => {
					const name = row.original.name;
					const id = row.original.id;
					return (
						<div className="group/copybutton flex items-center gap-2">
							<Rocket className={`h-5 w-5 fill-primary-400`} />
							<div>
								<div className="flex items-center gap-1">
									<Link
										to={routes.projects.deployments.detail.overview(id)}
										className="flex items-center gap-1"
									>
										<span className="text-text-md font-semibold text-theme-text-primary">
											{name ?? "Unnamed"}
										</span>
									</Link>

									<CopyButton copyText={name ?? ""} />
								</div>
							</div>
						</div>
					);
				}
			},
			{
				id: "status",
				header: "Status",
				accessorFn: (row) => row.body?.status,
				cell: ({ row }) => {
					const status = row.original.body?.status;
					if (!status) return <div>No status</div>;

					return (
						<Tag
							size="xs"
							emphasis="subtle"
							rounded={false}
							className="inline-flex items-center gap-1 text-theme-text-primary"
							color="grey"
						>
							<div
								className={`size-1 shrink-0 rounded-rounded ${getDeploymentStatusBackground(status)}`}
							></div>
							{capitalize(status)}
						</Tag>
					);
				}
			},
			{
				id: "snapshot",
				header: "Snapshot",
				accessorFn: (row) => row.resources?.snapshot?.name,
				cell: ({ row }) => {
					const snapshot = row.original.resources?.snapshot;
					const snapshotName = snapshot?.name;
					const snapshotId = snapshot?.id;
					if (!snapshotName || !snapshotId) return null;
					return <SnapshotLink snapshotId={snapshotId} snapshotName={snapshotName} />;
				}
			},
			{
				id: "author",
				header: "Author",
				accessorFn: (row) => row.resources?.user?.name,
				cell: ({ row }) => {
					const author = row.original.resources?.user;
					if (!author) return null;
					return (
						<InlineAvatar
							username={author.name}
							isServiceAccount={!!author.body?.is_service_account}
							avatarUrl={author.body?.avatar_url ?? undefined}
						/>
					);
				}
			},
			{
				id: "created",
				header: "Created at",
				accessorFn: (row) => ({
					date: row.body?.created
				}),
				cell: ({ getValue }) => {
					const { date } = getValue<{
						date: string;
					}>();
					return <DisplayDate dateString={date} />;
				}
			}
		],

		[]
	);
}
