import { Button } from "@zenml-io/react-component-library";
import { useNavigate } from "react-router-dom";

type Props = {
	isPending: boolean;
};

export function CreateSnapshotFormFooter({ isPending }: Props) {
	const navigate = useNavigate();

	return (
		<div className="flex items-center justify-end gap-2 p-5">
			<Button type="button" onClick={() => navigate(-1)} intent="secondary" size="md">
				Cancel
			</Button>
			<Button type="submit" size="md" disabled={isPending}>
				{isPending && (
					<div className="h-4 w-4 animate-spin rounded-rounded border-2 border-theme-text-negative border-b-theme-text-brand" />
				)}
				Create Snapshot
			</Button>
		</div>
	);
}
