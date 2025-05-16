import { createDataTableConsumerContext } from "@/components/tables/helper";
import { componentQueries } from "@/data/components";
import { useDeleteComponent } from "@/data/components/delete-component";
import { useBulkDelete } from "@/lib/bulk-delete";

export const {
	Context: ComponentSelectorContext,
	ContextProvider: ComponentSelectorContextProvider,
	useContext: useComponentSelectorContext
} = createDataTableConsumerContext();

export function useComponentBulkDelete() {
	const { setRowSelection } = useComponentSelectorContext();

	const { mutateAsync } = useDeleteComponent();

	async function handleDelete(id: string) {
		await mutateAsync({ componentId: id });
	}

	return useBulkDelete({
		deleteFn: handleDelete,
		queryKeyToInvalidate: componentQueries.all,
		setRowSelection
	});
}
