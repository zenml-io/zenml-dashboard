import { Codesnippet } from "@/components/CodeSnippet";
import { CollapsibleCard } from "@/components/CollapsibleCard";
import { useStepDetail } from "@/data/steps/step-detail-query";
import { Button, Skeleton } from "@zenml-io/react-component-library";
import { ErrorFallback } from "../../Error";
import AlertCircle from "@/assets/icons/alert-circle.svg?react";
import ArrowLeft from "@/assets/icons/arrow-left.svg?react";

type Props = {
	stepId: string;
};

function goToError() {
	const errorLineElement = document.querySelector(".error-highlight-line");
	if (errorLineElement) {
		errorLineElement.scrollIntoView({ behavior: "smooth" });
	}
}

export function StepCodeTab({ stepId }: Props) {
	const { data, isPending, isError, error } = useStepDetail({ stepId });

	if (isError) return <ErrorFallback err={error} />;

	if (isPending) return <Skeleton className="h-[300px] w-full" />;

	const traceback = data?.metadata?.exception_info?.traceback;

	return (
		<div className="flex flex-col gap-5">
			{traceback && (
				<CollapsibleCard
					initialOpen
					title={
						<>
							<AlertCircle className="h-5 w-5 fill-theme-text-error" /> Error
						</>
					}
					contentClassName="border-t border-error-200"
					className="border border-error-200"
					headerClassName="flex justify-between"
					headerChildren={
						<Button
							className="whitespace-nowrap"
							onClick={goToError}
							intent="danger"
							emphasis="subtle"
						>
							Go to error
							<ArrowLeft className="h-5 w-5 -rotate-90 fill-error-700" />
						</Button>
					}
				>
					<div className="whitespace-pre-wrap font-mono text-text-md">{traceback}</div>
				</CollapsibleCard>
			)}
			<CollapsibleCard initialOpen title="Code">
				<Codesnippet
					fullWidth
					highlightCode
					wrap
					code={data?.metadata?.source_code || ""}
					exceptionCodeLine={data?.metadata?.exception_info?.step_code_line ?? undefined}
				/>
			</CollapsibleCard>
		</div>
	);
}
