import { Button } from "@zenml-io/react-component-library/components";
import Plus from "@/assets/icons/plus.svg?react";
import Minus from "@/assets/icons/minus.svg?react";
import Maximize from "@/assets/icons/maximize.svg?react";
import Refresh from "@/assets/icons/refresh.svg?react";
import { useReactFlow } from "reactflow";
import { usePipelineRun } from "../../data/pipeline-runs/pipeline-run-detail-query";
import { usePipelineRunGraph } from "../../data/pipeline-runs/pipeline-run-graph-query";

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
						<Plus className="h-5 w-5 bg-theme-surface-primary fill-theme-text-primary" />
					</Button>
				</div>
				<div>
					<Button
						onClick={() => zoomOut()}
						emphasis="subtle"
						className="rounded-sharp border-none bg-theme-surface-primary p-0.5"
						intent="secondary"
					>
						<Minus className="h-5 w-5 fill-theme-text-primary" />
					</Button>
				</div>
			</div>
			<Button
				className="h-6 w-6 bg-theme-surface-primary p-0.5"
				onClick={() => fitView()}
				emphasis="subtle"
				intent="secondary"
			>
				<Maximize className="h-5 w-5 fill-theme-text-primary" />
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
				<Refresh className="h-5 w-5 fill-theme-text-primary" />
			</Button>
		</div>
	);
}
