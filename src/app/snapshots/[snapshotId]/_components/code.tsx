import { Codesnippet } from "@/components/CodeSnippet";
import { CollapsibleChevron } from "@/components/collapsible-chevron";
import {
	CollapsibleContent,
	CollapsibleHeader,
	CollapsiblePanel,
	CollapsibleTrigger
} from "@zenml-io/react-component-library";
import { useState } from "react";
import { useParams } from "react-router-dom";

export function SnapshotCodeCollapsible() {
	const { snapshotId } = useParams() as {
		snapshotId: string;
	};

	const [open, setOpen] = useState(true);
	const code = `from zenml.client import Client

Client().trigger_pipeline(snapshot_id="${snapshotId}")`;
	return (
		<CollapsiblePanel open={open} onOpenChange={setOpen}>
			<CollapsibleHeader className="flex items-center gap-[10px]">
				<CollapsibleTrigger className="flex w-full gap-2">
					<CollapsibleChevron open={open} />
					<span>Code</span>
				</CollapsibleTrigger>
			</CollapsibleHeader>
			<CollapsibleContent className="border-t border-theme-border-moderate bg-theme-surface-primary px-5 py-3">
				<p className="mb-2">Trigger the snapshot</p>
				<Codesnippet fullWidth highlightCode wrap code={code} />
			</CollapsibleContent>
		</CollapsiblePanel>
	);
}
