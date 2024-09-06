import { pipelineQueries } from "@/data/pipelines";
import { useDeletePipeline } from "@/data/pipelines/delete-pipeline";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@zenml-io/react-component-library";
import { SetStateAction, createContext, useContext, useState } from "react";

type PipelinesSelectorContextProps = {
	selectedPipelines: string[];
	setSelectedPipelines: (actions: SetStateAction<string[]>) => void;
	bulkDeletePipelines: (runIds: string[]) => Promise<void>;
};

const PipelinesSelectorContext = createContext<PipelinesSelectorContextProps | null>(null);

export function PipelinesSelectorProvider({ children }: { children: React.ReactNode }) {
	const [selectedPipelines, setSelectedPipelines] = useState<string[]>([]);
	const queryClient = useQueryClient();

	const { toast } = useToast();

	const deleteRunMutation = useDeletePipeline();

	const bulkDeletePipelines = async (runIds: string[]) => {
		try {
			// Use mutateAsync to handle each delete operation
			const deletePromises = runIds.map((id) => deleteRunMutation.mutateAsync({ pipelineId: id }));

			await Promise.all(deletePromises);
			toast({
				description: "Deleted successfully.",
				status: "success",
				emphasis: "subtle",
				rounded: true
			});
			await queryClient.invalidateQueries({ queryKey: pipelineQueries.all });
			setSelectedPipelines([]);
		} catch (error) {
			console.error("Failed to delete some pipelines:", error);
		}
	};

	return (
		<PipelinesSelectorContext.Provider
			value={{ selectedPipelines, setSelectedPipelines, bulkDeletePipelines }}
		>
			{children}
		</PipelinesSelectorContext.Provider>
	);
}

export function usePipelinesSelectorContext() {
	const context = useContext(PipelinesSelectorContext);
	if (!context)
		throw new Error("usePipelinesSelectorContext must be used within a PipelinesSelectorProvider");
	return context;
}
