import { Codesnippet } from "@/components/CodeSnippet";
import { CollapsibleChevron } from "@/components/collapsible-chevron";
import { PipelineSnapshot } from "@/types/pipeline-snapshots";
import {
	CollapsibleContent,
	CollapsibleHeader,
	CollapsiblePanel,
	CollapsibleTrigger
} from "@zenml-io/react-component-library";
import { useState } from "react";

import { SnapshotDetailWrapper } from "./fetch-wrapper";

export function SnapshotCodeCollapsible() {
	return <SnapshotDetailWrapper Component={SnapshotCodeContent} />;
}

type Props = {
	snapshot: PipelineSnapshot;
};

function SnapshotCodeContent({ snapshot }: Props) {
	const [open, setOpen] = useState(true);

	const runnable = snapshot.body?.runnable;

	if (!runnable) return null;

	const snapshotId = snapshot.id;
	const code = `from zenml.client import Client

Client().trigger_pipeline(snapshot_name_or_id="${snapshotId}")`;
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
