import { ServiceAccountAvatar } from "@/components/avatars/service-account-avatar";
import { serviceAccountQueries } from "@/data/service-accounts";
import { useQuery } from "@tanstack/react-query";
import { Badge, Skeleton } from "@zenml-io/react-component-library/components/server";
import { useParams } from "react-router-dom";
import { useServiceAccountDetailBreadcrumbs } from "./breadcrumb";

export function APIKeyHeader() {
	const { serviceAccountId } = useParams() as { serviceAccountId: string };
	const serviceAccount = useQuery({
		...serviceAccountQueries.serviceAccountDetail(serviceAccountId),
		throwOnError: true
	});

	useServiceAccountDetailBreadcrumbs(serviceAccount.data);
	if (serviceAccount.isPending) return <APIKeyHeaderSkeleton />;
	if (serviceAccount.isError) return null;

	const serviceAccountData = serviceAccount.data;

	return (
		<div className="flex items-center gap-3">
			<ServiceAccountAvatar
				size="xl"
				serviceAccountName={serviceAccountData.name}
				serviceAccountAvatar={serviceAccountData.body?.avatar_url ?? undefined}
			/>
			<div className="space-y-1">
				<div className="flex items-center gap-2">
					<p className="text-text-xl font-semibold">{serviceAccountData.name}</p>

					<Badge
						size="sm"
						color={serviceAccountData.body?.active ? "light-purple" : "light-grey"}
						className="text-text-xs font-semibold uppercase"
					>
						{serviceAccountData.body?.active ? "active" : "inactive"}
					</Badge>
				</div>
				<p className="text-text-md text-theme-text-secondary">
					{serviceAccountData.metadata?.description}
				</p>
			</div>
		</div>
	);
}

function APIKeyHeaderSkeleton() {
	return (
		<div className="flex items-center gap-3">
			<Skeleton className="h-9 w-9" />
			<div className="space-y-1">
				<div className="flex flex-wrap items-center gap-2">
					<Skeleton className="h-6 w-[100px]" />
					<Skeleton className="h-5 w-[50px]" />
				</div>
				<Skeleton className="h-5 w-[150px]" />
			</div>
		</div>
	);
}
