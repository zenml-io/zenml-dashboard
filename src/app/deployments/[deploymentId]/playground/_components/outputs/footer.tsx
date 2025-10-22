import { DeleteOutputRun } from "./delete-alert";

type Props = {
	clearOutputs: () => void;
	runId?: string;
};

export function PlaygroundOutputsFooter({ clearOutputs, runId }: Props) {
	return (
		<div className="flex items-center justify-end p-5">
			{runId && <DeleteOutputRun runId={runId} clearOutputs={clearOutputs} />}
		</div>
	);
}
