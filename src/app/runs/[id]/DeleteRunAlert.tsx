import AlertCircle from "@/assets/icons/alert-circle.svg?react";
import Tick from "@/assets/icons/tick-circle.svg?react";
import { useQueryClient } from "@tanstack/react-query";
import { AlertDialog, useToast } from "@zenml-io/react-component-library";
import { useNavigate, useParams } from "react-router-dom";
import { DeleteAlertContent, DeleteAlertContentBody } from "../../../components/DeleteAlertDialog";
import { useDeleteRun } from "../../../data/pipeline-runs/delete-run";
import { routes } from "../../../router/routes";

type Props = {
	open: boolean;
	setOpen: (bool: boolean) => void;
};

export function DeleteRunAlert({ open, setOpen }: Props) {
	const { toast } = useToast();
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const { runId } = useParams() as { runId: string };
	const { mutate } = useDeleteRun({
		onSuccess: async () => {
			queryClient.invalidateQueries({ queryKey: ["runs"] });
			toast({
				status: "success",
				emphasis: "subtle",
				icon: <Tick className="h-5 w-5 shrink-0 fill-success-700" />,
				description: "Run deleted successfully",
				rounded: true
			});
			setOpen(false);
			navigate(routes.pipelines.overview);
		},
		onError: (e) => {
			toast({
				status: "error",
				emphasis: "subtle",
				icon: <AlertCircle className="h-5 w-5 shrink-0 fill-error-700" />,
				description: e.message,
				rounded: true
			});
		}
	});
	async function handleDelete() {
		mutate({ runId });
	}

	return (
		<AlertDialog open={open} onOpenChange={setOpen}>
			<DeleteAlertContent title={`Delete Run`} handleDelete={() => handleDelete()}>
				<DeleteAlertContentBody>
					<p>Are you sure?</p>
					<p>This action cannot be undone.</p>
					<p>
						Deleting a run here does not guarantee that this run will get deleted in the underlying
						orchestrator.
					</p>
				</DeleteAlertContentBody>
			</DeleteAlertContent>
		</AlertDialog>
	);
}
