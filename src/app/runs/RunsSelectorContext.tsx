import { useDeleteRun } from "@/data/pipeline-runs/delete-run";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@zenml-io/react-component-library";
import { SetStateAction, createContext, useContext, useState } from "react";

type RunsSelectorContextProps = {
	selectedRuns: string[];
	setSelectedRuns: (actions: SetStateAction<string[]>) => void;
	bulkDeleteRuns: (runIds: string[]) => Promise<void>;
};

const RunsSelectorContext = createContext<RunsSelectorContextProps | null>(null);

export function RunsSelectorProvider({ children }: { children: React.ReactNode }) {
	const [selectedRuns, setSelectedRuns] = useState<string[]>([]);
	const queryClient = useQueryClient();

	const { toast } = useToast();

	const deleteRunMutation = useDeleteRun();

	const bulkDeleteRuns = async (runIds: string[]) => {
		try {
			// Use mutateAsync to handle each delete operation
			const deletePromises = runIds.map((id) => deleteRunMutation.mutateAsync({ runId: id }));

			await Promise.all(deletePromises);
			toast({
				description: "Deleted successfully.",
				status: "success",
				emphasis: "subtle",
				rounded: true
			});
			await queryClient.invalidateQueries({ queryKey: ["runs"] });
			setSelectedRuns([]);
		} catch (error) {
			console.error("Failed to delete some runs:", error);
		}
	};

	return (
		<RunsSelectorContext.Provider value={{ selectedRuns, setSelectedRuns, bulkDeleteRuns }}>
			{children}
		</RunsSelectorContext.Provider>
	);
}

export function useRunsSelectorContext() {
	const context = useContext(RunsSelectorContext);
	if (!context)
		throw new Error("useRunsSelectorContext must be used within a RunsSelectorProvider");
	return context;
}
