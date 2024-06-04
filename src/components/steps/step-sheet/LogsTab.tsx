import { useStepLogs } from "@/data/steps/step-logs-query";
import { ErrorFallback } from "../../Error";
import { CollapsibleCard } from "@/components/CollapsibleCard";
import { Codesnippet } from "@/components/CodeSnippet";
import { KeyValue } from "@/components/KeyValue";
import Logs from "@/assets/icons/logs.svg?react";
import { Spinner } from "@zenml-io/react-component-library";

type Props = {
	stepId: string;
	stepDetail: any;
};

type LoadingLogsProps = {
	stepId: string;
};

const LoadingLogs = ({ stepId }: LoadingLogsProps) => (
	<section className="flex h-[calc(100vh_-_270px)] items-center justify-center">
		<div className="flex flex-col items-center justify-center">
			<div className="relative mb-2 flex items-center justify-center">
				<Spinner className="h-[120px] w-[120px]" />
				<LogsIcon />
			</div>
			<h2 className="my-3 text-center text-display-xs font-semibold">Loading the Logs</h2>
			<p className="text-center text-text-lg text-theme-text-secondary">
				It can take up to a few minutes. <br /> Please wait while we fetch logs from the artifact
				store.
			</p>
		</div>
	</section>
);

export function StepLogsTab({ stepId, stepDetail }: Props) {
	const enableLogs = stepDetail?.metadata?.config?.enable_step_logs;

	const { data, isPending, isError, error } = useStepLogs({ stepId });

	if (isError) {
		return <ErrorFallback err={error} />;
	}

	if (isPending) {
		return <LoadingLogs stepId={stepId} />;
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

export function LogsIcon() {
	return (
		<div className="absolute rounded-rounded bg-primary-25 p-3">
			<Logs className="h-7 w-7 fill-primary-400" />
		</div>
	);
}
