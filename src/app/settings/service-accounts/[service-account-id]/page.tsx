import { Box } from "@zenml-io/react-component-library/components/server";
import { useQuery } from "@tanstack/react-query";
import { Badge, Skeleton } from "@zenml-io/react-component-library/components/server";
import { useEffect } from "react";
import { useBreadcrumbsContext } from "@/layouts/AuthenticatedLayout/BreadcrumbsContext";
import { useParams } from "react-router-dom";
import { serviceAccountQueries } from "@/data/service-accounts";
import ServiceAccountDetailTable from "./Table";

export default function ServiceAccountDetail() {
	return (
		<Box className="space-y-5 p-5">
			<div>
				<APIKeyHeader />
				<h1 className="my-5 text-text-lg font-semibold">API Keys</h1>
			</div>
			<ServiceAccountDetailTable />
		</Box>
	);
}

export function APIKeyHeader() {
	const { setCurrentBreadcrumbData } = useBreadcrumbsContext();
	const { serviceAccountId } = useParams() as { serviceAccountId: string };
	const serviceAccount = useQuery({
		...serviceAccountQueries.serviceAccountDetail(serviceAccountId),
		throwOnError: true
	});

	useEffect(() => {
		if (serviceAccount.data) {
			setCurrentBreadcrumbData({
				segment: "service_account_detail",
				data: serviceAccount.data
			});
		}
	}, [serviceAccount.data, setCurrentBreadcrumbData]);

	if (serviceAccount.isPending) return <Skeleton className="h-9 w-full" />;
	if (serviceAccount.isError) return null;

	const serviceAccountData = serviceAccount.data;

	return (
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
			<p className="text-text-md text-theme-text-secondary ">
				{serviceAccountData.metadata?.description}
			</p>
		</div>
	);
}
