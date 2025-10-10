import { DeploymentInvocationResponse } from "@/types/deploymen-invocations";
import { PlaygroundLoader } from "../loader";
import { PlaygroundOutputsContent } from "./content";
import { PlaygroundOutputsEmptyState } from "./empty-state";

type Props = {
	isInvoking: boolean;
	outputs: DeploymentInvocationResponse | undefined;
	clearOutputs: () => void;
};

export function PlaygroundOutputs({ outputs, isInvoking, clearOutputs }: Props) {
	if (isInvoking) return <PlaygroundLoader subtitle="Invoking Endpoint..." />;
	if (!outputs)
		return (
			<div className="h-full py-5 pl-5 pr-5 xl:pr-0">
				<PlaygroundOutputsEmptyState />
			</div>
		);

	return <PlaygroundOutputsContent outputs={outputs} clearOutputs={clearOutputs} />;
}
