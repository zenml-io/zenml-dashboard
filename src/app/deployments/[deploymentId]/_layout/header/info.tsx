import { DisplayDate } from "@/components/DisplayDate";
import { InlineAvatar } from "@/components/InlineAvatar";
import { deploymentQueries } from "@/data/deployments";
import { getUsername } from "@/lib/user";
import { Deployment } from "@/types/deployments";
import { useQuery } from "@tanstack/react-query";
import { Skeleton, Tag } from "@zenml-io/react-component-library/components/server";
import { DeploymentDetailHeaderInfoSubrow } from "./info-subrow";
import { usePipelineDetailRunsBreadcrumbs } from "./use-breadcrumb";
import { capitalize } from "@/lib/strings";
import { useActiveTab } from "./use-active-tab";
// import { useSnapshotDetailRunsBreadcrumbs } from "./breadcrumbs";

type Props = {
	deploymentId: string;
};

export function DeploymentDetailHeaderInfo({ deploymentId }: Props) {
	const deploymentQuery = useQuery({
		...deploymentQueries.detail(deploymentId),
		throwOnError: true
	});

	const activeTab = useActiveTab();
	usePipelineDetailRunsBreadcrumbs(capitalize(activeTab), deploymentQuery.data);

	if (deploymentQuery.isPending) return <InfoSkeleton />;
	if (deploymentQuery.isError) return null;

	const deployment = deploymentQuery.data;

	return <SnapshotDetailInfoContent deployment={deployment} />;
}

function SnapshotDetailInfoContent({ deployment }: { deployment: Deployment }) {
	const name = deployment.name;
	const status = deployment.body?.status;

	const user = deployment.resources?.user ?? undefined;
	const updated = deployment.body?.updated;

	return (
		<section className="space-y-2 bg-theme-surface-primary">
			<div className="flex items-center gap-1">
				<h1 className="text-display-xs font-semibold text-theme-text-primary">{name}</h1>
				<Tag
					emphasis="subtle"
					rounded={false}
					className="inline-flex items-center gap-0.5"
					color="green"
				>
					{status}
				</Tag>
			</div>
			<div className="flex flex-wrap items-center justify-between gap-1">
				<DeploymentDetailHeaderInfoSubrow deployment={deployment} />
				<div className="flex items-center gap-1 text-text-sm text-theme-text-secondary lg:whitespace-nowrap">
					Deployed by{" "}
					<InlineAvatar
						isServiceAccount={!!user?.body?.is_service_account}
						username={getUsername(user!)}
						avatarUrl={user?.body?.avatar_url || undefined}
					/>
					at <DisplayDate dateString={updated || ""} />
				</div>
			</div>
		</section>
	);
}

function InfoSkeleton() {
	return (
		<section className="space-y-2 bg-theme-surface-primary">
			{/* Title row with name and status tag */}
			<div className="flex items-center gap-1">
				<Skeleton className="h-6 w-[180px]" /> {/* Name */}
				<Skeleton className="h-5 w-[60px] rounded-sm" /> {/* Status tag */}
			</div>
			{/* Bottom row with subrow info and deployed by info */}
			<div className="flex flex-wrap items-center justify-between gap-1">
				<Skeleton className="h-4 w-[120px]" /> {/* Subrow content placeholder */}
				<div className="flex items-center gap-1">
					<Skeleton className="h-4 w-[80px]" /> {/* "Deployed by" text */}
					<Skeleton className="h-5 w-5 rounded-rounded" /> {/* Avatar */}
					<Skeleton className="h-4 w-[60px]" /> {/* Username */}
					<Skeleton className="h-4 w-[20px]" /> {/* "at" text */}
					<Skeleton className="h-4 w-[100px]" /> {/* Date */}
				</div>
			</div>
		</section>
	);
}
