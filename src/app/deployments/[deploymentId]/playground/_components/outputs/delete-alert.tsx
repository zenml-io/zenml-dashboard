import { DeleteAlertContent, DeleteAlertContentBody } from "@/components/DeleteAlertDialog";
import { useDeleteRun } from "@/data/pipeline-runs/delete-run";
import { useQueryClient } from "@tanstack/react-query";
import {
	AlertDialog,
	AlertDialogTrigger,
	Button,
	useToast
} from "@zenml-io/react-component-library";
import { useState } from "react";

type Props = {
	runId: string;
	clearOutputs: () => void;
};

export function DeleteOutputRun({ runId, clearOutputs }: Props) {
	const queryClient = useQueryClient();
	const { toast } = useToast();
	const [open, setOpen] = useState(false);

	const { mutate, isPending } = useDeleteRun({
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["runs"] });
			clearOutputs();
			setOpen(false);
		},
		onError: (e) => {
			toast({
				status: "error",
				emphasis: "subtle",
				description: e.message,
				rounded: true
			});
		}
	});

	function handleRunDelete() {
		mutate({ runId });
	}

	return (
		<AlertDialog open={open} onOpenChange={setOpen}>
			<AlertDialogTrigger asChild>
				<Button type="button" intent="danger" emphasis="subtle" size="md">
					Delete
				</Button>
			</AlertDialogTrigger>
			<DeleteAlertContent
				isPending={isPending}
				title={`Delete Run`}
				handleDelete={() => handleRunDelete()}
			>
				<DeleteAlertContentBody>
					<p>Are you sure?</p>
					<p>This action cannot be undone.</p>
				</DeleteAlertContentBody>
			</DeleteAlertContent>
		</AlertDialog>
	);
}
