import { DeploymentInvocationResponse } from "@/types/deploymen-invocations";
import Editor from "@monaco-editor/react";
import { PlaygroundLoader } from "../loader";
import { PlaygroundOutputsEmptyState } from "./empty-state";
import { PlaygroundOutputsFooter } from "./footer";
import { PlaygroundRunCard } from "./run-card";
import { PlaygroundEmptyState } from "../error";

type Props = {
	isInvoking: boolean;
	outputs: DeploymentInvocationResponse | undefined;
	clearOutputs: () => void;
};

export function PlaygroundOutputs({ outputs, isInvoking, clearOutputs }: Props) {
	if (isInvoking) return <PlaygroundLoader subtitle="Invoking Endpoint..." />;
	if (!outputs)
		return (
			<div className="h-full p-5">
				<PlaygroundOutputsEmptyState />
			</div>
		);

	const { metadata } = outputs;
	return (
		<div className="flex h-full w-full flex-col divide-y divide-theme-border-moderate">
			<div className="flex h-full flex-col gap-5 overflow-auto p-5">
				<p className="text-text-lg font-semibold">Output</p>
				<div>
					<PlaygroundRunCard
						success={outputs.success}
						runId={metadata.run_id || undefined}
						runName={metadata.run_name || undefined}
						duration={outputs.execution_time}
					/>
				</div>
				{outputs.success === true ? (
					<Editor
						value={JSON.stringify(outputs.outputs, null, "\t")}
						language="json"
						options={{
							minimap: { enabled: false },
							readOnly: true,
							wrappingStrategy: "advanced",
							wordWrap: "on",
							wordWrapColumn: 80
						}}
						className="h-full flex-1 overflow-hidden border border-theme-border-moderate p-5"
					/>
				) : (
					<PlaygroundEmptyState
						title="Failed to invoke deployment"
						subtitle={outputs.error || "Failed to invoke deployment"}
					/>
				)}
			</div>
			<PlaygroundOutputsFooter runId={metadata.run_id || undefined} clearOutputs={clearOutputs} />
		</div>
	);
}
