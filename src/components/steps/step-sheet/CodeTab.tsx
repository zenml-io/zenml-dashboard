import { Codesnippet } from "@/components/CodeSnippet";
import { CollapsibleCard } from "@/components/CollapsibleCard";
import { ErrorTracebackCollapsible } from "@/components/error-traceback-collapsible";
import { useStepDetail } from "@/data/steps/step-detail-query";
import type { CodeLanguage } from "@/types/code-highlighting";
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

	// In command steps, we show the command instead of the step source code
	// (which would always be the same and not really useful)
	const command = data?.metadata?.config?.command;
	const isCommand = !!command && command.length > 0;

	const title = isCommand ? "Command" : "Code";
	const language: CodeLanguage = isCommand ? "bash" : "python";
	const code = isCommand ? command.join(" ") : data?.metadata?.source_code || "";
	const exceptionCodeLine = isCommand
		? undefined
		: (data?.metadata?.exception_info?.user_code_line ?? undefined);

	return (
		<div className="flex flex-col gap-5">
			{traceback && <ErrorTracebackCollapsible traceback={traceback} />}
			<CollapsibleCard initialOpen title={title}>
				<Codesnippet
					fullWidth
					highlightCode
					wrap
					language={language}
					code={code}
					exceptionCodeLine={exceptionCodeLine}
				/>
			</CollapsibleCard>
		</div>
	);
}
