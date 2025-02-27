import { createDataTableConsumerContext } from "@/components/table/DataTableConsumerContext";

export const {
	Context: PipelineDataTableContext,
	ContextProvider: PipelineDataTableContextProvider,
	useContext: usePipelineDataTableContext
} = createDataTableConsumerContext();
