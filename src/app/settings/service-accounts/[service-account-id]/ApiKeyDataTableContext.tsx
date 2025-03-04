import { createDataTableConsumerContext } from "@/components/table/DataTableConsumerContext";

export const {
	Context: ApiKeyDataTableContext,
	ContextProvider: ApiKeyDataTableContextProvider,
	useContext: useApiKeyDataTableContext
} = createDataTableConsumerContext();
