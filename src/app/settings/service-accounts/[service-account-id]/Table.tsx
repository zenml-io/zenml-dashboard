import Pagination from "@/components/Pagination";
import { SearchField } from "@/components/SearchField";
import { serviceAccountQueries } from "@/data/service-accounts";
import { useQuery } from "@tanstack/react-query";
import { DataTable, Skeleton } from "@zenml-io/react-component-library";
import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { useServiceAccountOverviewSearchParams } from "../service";
import { AddApiKeyDialog } from "./AddApiKeyDialog";
import { ApiKeyButtonGroup } from "./ButtonGroup";
import { getServiceAccountDetailColumn } from "./columns";
import ApiKeyFallback from "./Fallback";
import { ApiKeysSelectorProvider, useApiKeySelectorContext } from "./SelectorContext";

export default function ServiceAccountDetailTable() {
	const { serviceAccountId } = useParams() as { serviceAccountId: string };
	const queryParams = useServiceAccountOverviewSearchParams();

	const cols = useMemo(() => getServiceAccountDetailColumn(), []);

	const { data: serviceAccountApis } = useQuery({
		...serviceAccountQueries.serviceAccountApiKeys(serviceAccountId, {
			...queryParams,
			sort_by: "desc:created",
			hydrate: true
		})
	});

	if (serviceAccountApis && serviceAccountApis?.items.length < 1 && !queryParams.name) {
		return <ApiKeyFallback />;
	}

	return (
		<ApiKeysSelectorProvider>
			<Header serviceAccountId={serviceAccountId} />

			<div className="flex flex-col items-center gap-5">
				<div className="w-full">
					{serviceAccountApis ? (
						<DataTable columns={cols} data={serviceAccountApis.items} />
					) : (
						<Skeleton className="h-[500px] w-full" />
					)}
				</div>
				{serviceAccountApis ? (
					serviceAccountApis.total_pages > 1 && (
						<Pagination searchParams={queryParams} paginate={serviceAccountApis} />
					)
				) : (
					<Skeleton className="h-[36px] w-[300px]" />
				)}
			</div>
		</ApiKeysSelectorProvider>
	);
}

function Header({ serviceAccountId }: { serviceAccountId: string }) {
	const queryParams = useServiceAccountOverviewSearchParams();
	const { selectedApiKeys } = useApiKeySelectorContext();

	return (
		<div className="mb-4 flex flex-wrap items-center justify-between gap-2">
			{selectedApiKeys.length ? (
				<ApiKeyButtonGroup serviceAccountId={serviceAccountId} />
			) : (
				<div className="flex items-center gap-2">
					<SearchField searchParams={queryParams} />
				</div>
			)}
			<AddApiKeyDialog isFallback={false} serviceAccountId={serviceAccountId} />
		</div>
	);
}
