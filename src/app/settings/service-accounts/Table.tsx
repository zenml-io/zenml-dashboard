import Pagination from "@/components/Pagination";
import { SearchField } from "@/components/SearchField";
import { serviceAccountQueries } from "@/data/service-accounts";
import { useBreadcrumbsContext } from "@/layouts/AuthenticatedLayout/BreadcrumbsContext";
import { useQuery } from "@tanstack/react-query";
import { DataTable } from "@zenml-io/react-component-library/components/client";
import { Skeleton } from "@zenml-io/react-component-library/components/server";
import { useEffect, useMemo } from "react";
import { ServiceAccountsButtonGroup } from "./ButtonGroup";
import { getServiceAccountColumns } from "./columns";
import ServiceAccountFallback from "./Fallback";
import {
	ServiceAccountsSelectorProvider,
	useServiceAccountSelectorContext
} from "./SelectorContext";
import { useServiceAccountOverviewSearchParams } from "./service";
import { AddServiceAccountDialog } from "./AddServiceAccount";

export default function ServiceAccountsTable() {
	const { setCurrentBreadcrumbData } = useBreadcrumbsContext();
	const queryParams = useServiceAccountOverviewSearchParams();

	useEffect(() => {
		setCurrentBreadcrumbData({
			segment: "service_accounts",
			data: null
		});
	}, []);

	const cols = useMemo(() => getServiceAccountColumns(), []);

	const { data: serviceAccounts } = useQuery({
		...serviceAccountQueries.serviceAccountList({
			...queryParams,
			sort_by: "desc:created",
			hydrate: true
		})
	});

	if (serviceAccounts && serviceAccounts.items.length < 1 && !queryParams.name) {
		return <ServiceAccountFallback />;
	}
	return (
		<ServiceAccountsSelectorProvider>
			<Header />
			<div className="flex flex-col items-center gap-5">
				<div className="w-full">
					{serviceAccounts ? (
						<DataTable columns={cols} data={serviceAccounts.items} />
					) : (
						<Skeleton className="h-[500px] w-full" />
					)}
				</div>
				{serviceAccounts ? (
					serviceAccounts.total_pages > 1 && (
						<Pagination searchParams={queryParams} paginate={serviceAccounts} />
					)
				) : (
					<Skeleton className="h-[36px] w-[300px]" />
				)}
			</div>
		</ServiceAccountsSelectorProvider>
	);
}

function Header() {
	const queryParams = useServiceAccountOverviewSearchParams();
	const { selectedServiceAccounts } = useServiceAccountSelectorContext();

	return (
		<div className="flex flex-wrap items-center justify-between gap-2">
			{selectedServiceAccounts.length ? (
				<ServiceAccountsButtonGroup />
			) : (
				<div className="flex items-center gap-2">
					<SearchField searchParams={queryParams} />
				</div>
			)}
			<AddServiceAccountDialog isFallback={false} />
		</div>
	);
}
