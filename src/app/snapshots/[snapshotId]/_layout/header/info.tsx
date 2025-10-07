import SnapshotIcon from "@/assets/icons/snapshot.svg?react";
import { CopyButton } from "@/components/CopyButton";
import { DisplayDate } from "@/components/DisplayDate";
import { InlineAvatar } from "@/components/InlineAvatar";
import { pipelineSnapshotQueries } from "@/data/pipeline-snapshots";
import { capitalize } from "@/lib/strings";
import { getUsername } from "@/lib/user";
import { PipelineSnapshot } from "@/types/pipeline-snapshots";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@zenml-io/react-component-library/components/server";
import { useSnapshotDetailRunsBreadcrumbs } from "./breadcrumbs";
import { useActiveTab } from "./use-active-tab";

type Props = {
	snapshotId: string;
};

export function SnapshotDetailInfo({ snapshotId }: Props) {
	const snapshotQuery = useQuery({
		...pipelineSnapshotQueries.detail(snapshotId),
		throwOnError: true
	});
	const activeTab = useActiveTab();

	useSnapshotDetailRunsBreadcrumbs(capitalize(activeTab), snapshotQuery.data);

	if (snapshotQuery.isPending) return <InfoSkeleton />;
	if (snapshotQuery.isError) return null;

	const snapshot = snapshotQuery.data;

	return <SnapshotDetailInfoContent snapshot={snapshot} />;
}

function SnapshotDetailInfoContent({ snapshot }: { snapshot: PipelineSnapshot }) {
	const name = snapshot.name;
	const id = snapshot.id;

	const user = snapshot.resources?.user ?? undefined;
	const updated = snapshot.body?.updated;

	return (
		<section className="flex flex-col gap-0.5 bg-theme-surface-primary">
			<div className="group/copybutton flex items-center gap-0.5">
				<h2 className="text-semi-bold text-text-sm text-theme-text-secondary">{id}</h2>
				<CopyButton copyText={id} />
			</div>

			<div className="flex items-center gap-1">
				<SnapshotIcon className={`h-5 w-5 shrink-0 fill-primary-400`} />
				<h2 className="text-text-lg font-semibold text-theme-text-primary">{name}</h2>
			</div>

			<div className="flex items-center gap-1 pt-1 text-text-sm text-theme-text-secondary">
				Updated by{" "}
				<InlineAvatar
					isServiceAccount={!!user?.body?.is_service_account}
					username={getUsername(user!)}
					avatarUrl={user?.body?.avatar_url || undefined}
				/>
				at <DisplayDate dateString={updated || ""} />
			</div>
		</section>
	);
}

function InfoSkeleton() {
	return (
		<section className="flex flex-col gap-0.5 bg-theme-surface-primary">
			{/* ID row with copy button */}
			<div className="flex items-center gap-0.5">
				<Skeleton className="h-4 w-[200px]" />
				<Skeleton className="h-4 w-4" />
			</div>

			{/* Title row with icon and share button */}
			<div className="flex justify-between">
				<div className="flex items-center gap-1">
					<Skeleton className="h-5 w-5" />
					<Skeleton className="h-6 w-[180px]" />
				</div>
				<Skeleton className="h-6 w-8" />
			</div>

			{/* Updated by row with avatar and date */}
			<div className="flex items-center gap-1 pt-1">
				<Skeleton className="h-4 w-[70px]" /> {/* "Updated by" text */}
				<Skeleton className="h-5 w-5 rounded-rounded" /> {/* Avatar */}
				<Skeleton className="h-4 w-[80px]" /> {/* Username */}
				<Skeleton className="h-4 w-[20px]" /> {/* "at" text */}
				<Skeleton className="h-4 w-[100px]" /> {/* Date */}
			</div>
		</section>
	);
}
