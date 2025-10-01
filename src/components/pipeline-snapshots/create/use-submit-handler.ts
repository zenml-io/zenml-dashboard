import { fetchPipelineRun } from "@/data/pipeline-runs/pipeline-run-detail-query";
import { pipelineSnapshotQueries } from "@/data/pipeline-snapshots";
import { useUpdateSnapshot } from "@/data/pipeline-snapshots/update-snapshot";
import { routes } from "@/router/routes";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@zenml-io/react-component-library";
import { useNavigate } from "react-router-dom";
import { CreatePipelineSnapshotFormSchema } from "./form-schema";

export function useSubmitHandler(originalSnapshotId: string | null) {
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const { toast } = useToast();
	const { mutate, isPending } = useUpdateSnapshot({
		onSuccess(data) {
			queryClient.invalidateQueries({ queryKey: [...pipelineSnapshotQueries.all, data.id] });
			navigate(routes.projects.snapshots.detail.overview(data.id));
		},
		onError(error) {
			toast({
				status: "error",
				description: error instanceof Error ? error.message : "Failed to create snapshot",
				rounded: true
			});
		}
	});

	async function handleCreateSnapshot({ name, run }: CreatePipelineSnapshotFormSchema) {
		if (originalSnapshotId !== null) {
			mutate({
				snapshotId: originalSnapshotId,
				payload: { name }
			});
			return;
		}

		let snapshotId: string | undefined;

		try {
			const fetchedRun = await fetchPipelineRun({ runId: run });
			snapshotId = fetchedRun.resources?.snapshot?.id;
		} catch (error) {
			toast({
				status: "error",
				emphasis: "subtle",
				description: "Failed to fetch run",
				rounded: true
			});
		}

		if (!snapshotId) {
			return toast({
				status: "error",
				emphasis: "subtle",
				description: "Snapshot not found",
				rounded: true
			});
		}

		mutate({
			snapshotId,
			payload: { name }
		});
	}

	return { handleCreateSnapshot, isPending };
}
