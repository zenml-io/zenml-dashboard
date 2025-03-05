import { createDataTableConsumerContext } from "@/components/table/DataTableConsumerContext";

export const {
	Context: RunsDataTableContext,
	ContextProvider: RunsDataTableContextProvider,
	useContext: useRunsDataTableContext
} = createDataTableConsumerContext();
