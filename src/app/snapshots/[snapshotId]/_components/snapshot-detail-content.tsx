import { CollapsibleChevron } from "@/components/collapsible-chevron";
import { CopyButton } from "@/components/CopyButton";
import { KeyValue } from "@/components/KeyValue";
import { NotAvailable } from "@/components/not-available";
import { PipelineLink } from "@/components/pipelines/pipeline-link";
import { RepoBadge } from "@/components/repositories/RepoBadge";
import { PipelineSnapshot } from "@/types/pipeline-snapshots";
import {
	CollapsibleContent,
	CollapsibleHeader,
	CollapsiblePanel,
	CollapsibleTrigger
} from "@zenml-io/react-component-library";
import { useState } from "react";

type Props = {
	snapshot: PipelineSnapshot;
};

export function DetailsContent({ snapshot }: Props) {
	const [open, setOpen] = useState(true);

	const snapshotId = snapshot.id;
	const pipelineName = snapshot.resources?.pipeline.name;
	const pipelineId = snapshot.resources?.pipeline.id;
	const codeReference = snapshot.resources?.code_reference;
	const codeRepositoryId = codeReference?.body?.code_repository.id;
	const codeCommit = codeReference?.body?.commit;

	return (
		<CollapsiblePanel open={open} onOpenChange={setOpen}>
			<CollapsibleHeader className="flex items-center gap-[10px]">
				<CollapsibleTrigger className="flex w-full gap-2">
					<CollapsibleChevron open={open} />
					Details
				</CollapsibleTrigger>
			</CollapsibleHeader>
			<CollapsibleContent className="border-t border-theme-border-moderate bg-theme-surface-primary px-5 py-3">
				<dl className="grid grid-cols-1 gap-x-[10px] gap-y-2 md:grid-cols-3 md:gap-y-4">
					<KeyValue
						label="Id"
						value={
							<div className="group/copybutton flex items-center gap-0.5">
								{snapshotId}
								<CopyButton copyText={snapshotId} />
							</div>
						}
					/>
					<KeyValue
						label="Pipeline"
						value={
							pipelineName && pipelineId ? (
								<PipelineLink pipelineId={pipelineId} pipelineName={pipelineName} />
							) : (
								<NotAvailable />
							)
						}
					/>

					<KeyValue
						label="Repository/Commit"
						value={
							codeRepositoryId && codeCommit ? (
								<RepoBadge repositoryId={codeRepositoryId} commit={codeCommit} />
							) : (
								<NotAvailable />
							)
						}
					/>
				</dl>
			</CollapsibleContent>
		</CollapsiblePanel>
	);
}
