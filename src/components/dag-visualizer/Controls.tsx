import { Button } from "@zenml-io/react-component-library/components";
import { useReactFlow } from "reactflow";
import { usePipelineRun } from "../../data/pipeline-runs/pipeline-run-detail-query";
import { usePipelineRunGraph } from "../../data/pipeline-runs/pipeline-run-graph-query";
import { Icon } from "../Icon";

type Props = {
	runId: string;
};

export function DagControls({ runId }: Props) {
	const { fitView, zoomIn, zoomOut } = useReactFlow();

	const run = usePipelineRun({ runId });
	const graph = usePipelineRunGraph({ runId });

	return (
		<div aria-label="Dag Controls" className="absolute left-4 top-4 z-10 flex flex-col gap-1">
			<div className="divide-y divide-neutral-300 overflow-hidden rounded-md border border-neutral-300">
				<div>
					<Button
						onClick={() => zoomIn()}
						emphasis="subtle"
						className="rounded-sharp border-none p-0.5"
						intent="secondary"
					>
						<Icon
							name="plus"
							className="h-5 w-5 bg-theme-surface-primary fill-theme-text-primary"
						/>
					</Button>
				</div>
				<div>
					<Button
						onClick={() => zoomOut()}
						emphasis="subtle"
						className="rounded-sharp border-none bg-theme-surface-primary p-0.5"
						intent="secondary"
					>
						<Icon name="minus" className="h-5 w-5 fill-theme-text-primary" />
					</Button>
				</div>
			</div>
			<Button
				className="h-6 w-6 bg-theme-surface-primary p-0.5"
				onClick={() => fitView()}
				emphasis="subtle"
				intent="secondary"
			>
				<Icon name="maximize" className="h-5 w-5 fill-theme-text-primary" />
			</Button>
			<Button
				className="h-6 w-6 bg-theme-surface-primary p-0.5"
				onClick={() => {
					run.refetch();
					graph.refetch();
				}}
				emphasis="subtle"
				intent="secondary"
			>
				<span className="sr-only">Refresh</span>
				<Icon name="refresh" className="h-5 w-5 fill-theme-text-primary" />
			</Button>
		</div>
	);
}
