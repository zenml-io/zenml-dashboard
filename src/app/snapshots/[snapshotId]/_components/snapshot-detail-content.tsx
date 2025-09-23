import PipelineIcon from "@/assets/icons/dataflow.svg?react";
import { CollapsibleChevron } from "@/components/collapsible-chevron";
import { CopyButton } from "@/components/CopyButton";
import { KeyValue } from "@/components/KeyValue";
import { RepoBadge } from "@/components/repositories/RepoBadge";
import { routes } from "@/router/routes";
import { PipelineSnapshot } from "@/types/pipeline-snapshots";
import {
	CollapsibleContent,
	CollapsibleHeader,
	CollapsiblePanel,
	CollapsibleTrigger,
	Tag
} from "@zenml-io/react-component-library";
import { useState } from "react";
import { Link } from "react-router-dom";

type Props = {
	snapshot: PipelineSnapshot;
};

export function DetailsContent({ snapshot }: Props) {
	const [open, setOpen] = useState(true);

	const snapshotId = snapshot.id;
	const pipelineName = snapshot.metadata?.pipeline.name;
	const pipelineId = snapshot.metadata?.pipeline.id;
	const codeReference = snapshot.metadata?.code_reference;
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
								<Link to={routes.projects.pipelines.detail.runs(pipelineId)}>
									<Tag
										color="purple"
										className="inline-flex items-center gap-0.5"
										rounded={false}
										emphasis="subtle"
									>
										<PipelineIcon className="mr-1 h-4 w-4 fill-theme-text-brand" />
										{pipelineName}
									</Tag>
								</Link>
							) : (
								"Not available"
							)
						}
					/>

					<KeyValue
						label="Repository/Commit"
						value={
							codeRepositoryId && codeCommit ? (
								<RepoBadge repositoryId={codeRepositoryId} commit={codeCommit} />
							) : (
								"Not available"
							)
						}
					/>
				</dl>
			</CollapsibleContent>
		</CollapsiblePanel>
	);
}
