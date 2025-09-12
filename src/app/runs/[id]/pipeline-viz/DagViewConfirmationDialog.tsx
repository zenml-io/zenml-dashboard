import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle
} from "@zenml-io/react-component-library";
import { Button } from "@zenml-io/react-component-library/components/server";

type Props = {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	nodeCount: number;
	threshold: number;
	onConfirm: () => void;
};

export function DagViewConfirmationDialog({
	open,
	onOpenChange,
	nodeCount,
	threshold,
	onConfirm
}: Props) {
	const handleConfirm = () => {
		onConfirm();
		onOpenChange(false);
	};

	return (
		<AlertDialog open={open} onOpenChange={onOpenChange}>
			<AlertDialogContent className="p-0">
				<AlertDialogHeader className="py-2 pl-5 pr-3">
					<AlertDialogTitle className="text-text-lg font-semibold">
						Switch to DAG View
					</AlertDialogTitle>
				</AlertDialogHeader>
				<div className="border-y border-theme-border-moderate px-5 py-5">
					<AlertDialogDescription className="space-y-2">
						<p>
							This pipeline has <strong>{nodeCount} nodes</strong>, which exceeds the recommended
							threshold of {threshold} nodes for DAG visualization.
						</p>
						<p>
							Rendering a large DAG may impact performance and take longer to load. Do you want to
							continue?
						</p>
					</AlertDialogDescription>
				</div>
				<AlertDialogFooter className="flex justify-end gap-3 px-5 py-3">
					<AlertDialogCancel asChild>
						<Button intent="secondary">Cancel</Button>
					</AlertDialogCancel>
					<AlertDialogAction asChild>
						<Button onClick={handleConfirm} intent="primary">
							Continue
						</Button>
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
