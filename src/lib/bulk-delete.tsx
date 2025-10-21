import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@zenml-io/react-component-library";

type BulkDeleteConfig = {
	deleteFn: (id: string) => Promise<void>;
	queryKeyToInvalidate: readonly string[];
	setRowSelection: (selection: Record<string, boolean>) => void;
};

export function useBulkDelete({
	deleteFn,
	queryKeyToInvalidate,
	setRowSelection
}: BulkDeleteConfig) {
	const queryClient = useQueryClient();
	const { toast } = useToast();

	async function bulkDelete(ids: string[]) {
		if (!ids.length) {
			return;
		}
		try {
			const results = await Promise.allSettled(ids.map((id) => deleteFn(id)));

			const failures = results
				.map((result, index) => ({
					id: ids[index],
					status: result.status,
					error: result.status === "rejected" ? result.reason : null
				}))
				.filter((result) => result.status === "rejected");

			// Only clear selection for successfully deleted items
			const newSelection = Object.fromEntries(failures.map((f) => [f.id, true]));
			setRowSelection(newSelection);

			// Show appropriate toast messages
			if (failures.length === 0) {
				toast({
					description: "All items deleted successfully.",
					status: "success",
					emphasis: "subtle",
					rounded: true
				});
			} else {
				console.error(
					"Failed to delete items:\n",
					failures.map(({ id, error }) => `${id}: ${error}`).join("\n")
				);

				// Show individual toast for each failure with the actual error cause
				failures.forEach(({ id, error }) => {
					toast({
						status: "error",
						emphasis: "subtle",
						description: ids.length < 2 ? `${error}` : `Failed to delete ${id}: ${error}`,
						rounded: true
					});
				});
			}
			await queryClient.invalidateQueries({ queryKey: queryKeyToInvalidate });
		} catch (error) {
			console.error("Bulk delete operation failed:", error);
			toast({
				status: "error",
				emphasis: "subtle",
				description: "Bulk delete operation failed unexpectedly",
				rounded: true
			});
		}
	}
	return { bulkDelete };
}
