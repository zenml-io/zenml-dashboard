import { useStepLogs } from "@/data/steps/step-logs-query";
import { ErrorFallback } from "../../Error";
import { Skeleton } from "@zenml-io/react-component-library";
import { CollapsibleCard } from "@/components/CollapsibleCard";
import { Codesnippet } from "@/components/CodeSnippet";
import { KeyValue } from "@/components/KeyValue";

type Props = {
	stepId: string;
	stepDetail: any;
};

export function StepLogsTab({ stepId, stepDetail }: Props) {
	const enableLogs = stepDetail?.metadata?.config?.enable_step_logs;

	const { data, isPending, isError, error } = useStepLogs({ stepId });

	if (isError) {
		return <ErrorFallback err={error} />;
	}

	if (isPending) {
		return <Skeleton className="h-[500px] rounded-md lg:col-span-2" />;
	}

	return (
		<CollapsibleCard initialOpen title="Logs">
			{typeof enableLogs === "boolean" && enableLogs === false ? (
				<dl className="grid grid-cols-1 gap-x-[10px] gap-y-2 md:grid-cols-3 md:gap-y-4">
					<KeyValue label="Enable logs" value="Disabled" />
				</dl>
			) : (
				<Codesnippet fullWidth wrap code={data || ""} />
			)}
		</CollapsibleCard>
	);
}
