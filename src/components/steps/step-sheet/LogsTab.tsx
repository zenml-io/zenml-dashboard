import { useStepLogs } from "@/data/steps/step-logs-query";
import { StepError } from "./Error";
import { Skeleton } from "@zenml-io/react-component-library";
import { CollapsibleCard } from "@/components/CollapsibleCard";
import { Codesnippet } from "@/components/CodeSnippet";

type Props = {
	stepId: string;
};

export function StepLogsTab({ stepId }: Props) {
	const { data, isPending, isError, error } = useStepLogs({ stepId });

	if (isError) {
		return <StepError err={error} />;
	}

	if (isPending) {
		return <Skeleton className="h-[500px] rounded-md lg:col-span-2" />;
	}

	return (
		<CollapsibleCard initialOpen title="Code">
			<Codesnippet fullWidth highlightCode wrap code={data || ""} />
		</CollapsibleCard>
	);
}
