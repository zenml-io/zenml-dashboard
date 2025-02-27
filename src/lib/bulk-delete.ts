import { toast } from "@zenml-io/react-component-library";
import { isFetchError } from "@/lib/fetch-error";
import { useQueryClient } from "@tanstack/react-query";

export interface BulkDeleteConfig<
	QueryKeys extends string[] | readonly string[],
	MutationParams,
	Ctx = void
> {
	getParams: (id: string, ctx: Ctx) => MutationParams;
	useMutation: () => {
		mutateAsync: (params: MutationParams) => Promise<unknown>;
	};
	useQueryKeys: () => {
		all: QueryKeys | ((ctx: Ctx) => QueryKeys);
	};
	useDataTableContext: () => {
		setRowSelection: (selection: Record<string, boolean>) => void;
	};
}

export function createUseBulkDelete<
	QueryKeys extends string[] | readonly string[],
	MutationParams,
	Ctx = void
>({
	useMutation,
	useQueryKeys,
	useDataTableContext,
	getParams
}: BulkDeleteConfig<QueryKeys, MutationParams, Ctx>) {
	return function useBulkDelete() {
		const queryClient = useQueryClient();
		const deleteMutation = useMutation();
		const { setRowSelection } = useDataTableContext();
		const queryKeys = useQueryKeys();

		const bulkDelete = async (ids: string[], ctx: Ctx) => {
			try {
				const deletePromises = ids.map((id) => deleteMutation.mutateAsync(getParams(id, ctx)));
				await Promise.all(deletePromises);

				const queryKey = typeof queryKeys.all === "function" ? queryKeys.all(ctx) : queryKeys.all;
				await queryClient.invalidateQueries({ queryKey });
				setRowSelection({});

				toast({
					description: "Deleted successfully.",
					status: "success",
					emphasis: "subtle",
					rounded: true
				});
			} catch (e) {
				console.error("Failed to delete some items:", e);

				if (isFetchError(e)) {
					toast({
						status: "error",
						emphasis: "subtle",
						description: e.message,
						rounded: true
					});
				}
			}
		};

		return { bulkDelete };
	};
}
