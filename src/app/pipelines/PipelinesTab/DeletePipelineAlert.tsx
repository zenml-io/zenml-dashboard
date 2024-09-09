import Trash from "@/assets/icons/trash.svg?react";
import { DeleteAlertContent } from "@/components/DeleteAlertDialog";
import { AlertDialog, AlertDialogTrigger, Button } from "@zenml-io/react-component-library";
import { useState } from "react";
import { usePipelinesSelectorContext } from "./PipelineSelectorContext";

export function DeletePipelineAlert() {
	const [isOpen, setIsOpen] = useState(false);
	const { bulkDeletePipelines, selectedPipelines } = usePipelinesSelectorContext();

	async function handleDelete() {
		await bulkDeletePipelines(selectedPipelines);
		setIsOpen(false);
	}

	return (
		<AlertDialog open={isOpen} onOpenChange={setIsOpen}>
			<AlertDialogTrigger>
				<Button
					className="rounded-sharp border-none bg-white"
					size="md"
					emphasis="subtle"
					intent="secondary"
				>
					<Trash className="h-5 w-5 shrink-0 gap-1 fill-neutral-400" />
					Delete
				</Button>
			</AlertDialogTrigger>
			<DeleteAlertContent
				title={`Delete Pipeline${selectedPipelines.length >= 2 ? "s" : ""}`}
				handleDelete={handleDelete}
			/>
		</AlertDialog>
	);
}
