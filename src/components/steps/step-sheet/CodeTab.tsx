import { Codesnippet } from "@/components/CodeSnippet";
import { CollapsibleCard } from "@/components/CollapsibleCard";
import { ErrorTracebackCollapsible } from "@/components/error-traceback-collapsible";
import { useStepDetail } from "@/data/steps/step-detail-query";
import { Skeleton } from "@zenml-io/react-component-library";
import { ErrorFallback } from "../../Error";

type Props = {
	stepId: string;
};

export function StepCodeTab({ stepId }: Props) {
	const { data, isPending, isError, error } = useStepDetail({ stepId });

	if (isError) return <ErrorFallback err={error} />;

	if (isPending) return <Skeleton className="h-[300px] w-full" />;

	const traceback = data?.metadata?.exception_info?.traceback;
	const exceptionCodeLine = data?.metadata?.exception_info?.user_code_line ?? undefined;

	return (
		<div className="flex flex-col gap-5">
			{traceback && <ErrorTracebackCollapsible traceback={traceback} />}
			<CollapsibleCard initialOpen title="Code">
				<Codesnippet
					fullWidth
					highlightCode
					wrap
					code={data?.metadata?.source_code || ""}
					exceptionCodeLine={exceptionCodeLine}
				/>
			</CollapsibleCard>
		</div>
	);
}
