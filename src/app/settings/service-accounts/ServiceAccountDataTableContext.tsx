import { createDataTableConsumerContext } from "@/components/table/DataTableConsumerContext";

export const {
	Context: ServiceAccountDataTableContext,
	ContextProvider: ServiceAccountDataTableContextProvider,
	useContext: useServiceAccountDataTableContext
} = createDataTableConsumerContext();
