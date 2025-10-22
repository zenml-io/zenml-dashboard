import { DeploymentInvocationResponse } from "@/types/deployment-invocations";
import Editor from "@monaco-editor/react";
import { PlaygroundEmptyState } from "../error";
import { PlaygroundOutputsFooter } from "./footer";
import { PlaygroundOutputsHeader } from "./header";
import { PlaygroundRunCard } from "./run-card";
import { useState } from "react";
import { PlaygroundOutputsView } from "./types";
import { PlaygroundOutputsPreviewVisualization } from "@/components/deployments/playground/preview-visualization";

type Props = {
	outputs: DeploymentInvocationResponse;
	clearOutputs: () => void;
};

export function PlaygroundOutputsContent({ outputs, clearOutputs }: Props) {
	const [activeView, setActiveView] = useState<PlaygroundOutputsView>("preview");
	const { metadata } = outputs;

	return (
		<div className="flex h-full w-full flex-col divide-y divide-theme-border-moderate">
			<div className="flex h-full flex-col gap-5 overflow-auto py-5 pl-5 pr-5 xl:pr-0">
				<PlaygroundOutputsHeader activeView={activeView} setActiveView={setActiveView} />
				<div>
					<PlaygroundRunCard
						success={outputs.success}
						runId={metadata.run_id || undefined}
						runName={metadata.run_name || undefined}
						duration={outputs.execution_time}
					/>
				</div>
				{outputs.success === true ? (
					activeView === "preview" ? (
						<PlaygroundOutputsPreviewVisualization json={outputs.outputs} />
					) : (
						<Editor
							theme="github-light"
							value={JSON.stringify(outputs.outputs, null, "\t")}
							language="json"
							options={{
								minimap: { enabled: false },
								readOnly: true,
								wrappingStrategy: "advanced",
								wordWrap: "on",
								wordWrapColumn: 80
							}}
							className="h-full border border-theme-border-moderate"
						/>
					)
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
