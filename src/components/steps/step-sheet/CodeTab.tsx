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

export function StepCodeTab({ stepId }: Props) {
	const { data, isPending, isError, error } = useStepDetail({ stepId });

	if (isError) return <ErrorFallback err={error} />;

	if (isPending) return <Skeleton className="h-[300px] w-full" />;

	const traceback = data?.metadata?.exception_info?.traceback;

	function goToError() {
		const errorLineElement = document.querySelector(".error-highlight-line");
		if (errorLineElement) {
			errorLineElement.scrollIntoView({ behavior: "smooth" });
		}
	}

	return (
		<div className="flex flex-col gap-5">
			{traceback && (
				<CollapsibleCard
					initialOpen
					title={
						<>
							<AlertCircle className="h-5 w-5 fill-red-500" /> Error
						</>
					}
					className="border border-error-200"
					headerClassName="flex justify-between border-b border-error-200"
					headerChildren={
						<Button
							className="whitespace-nowrap border border-red-500 bg-white text-red-500 hover:bg-white active:bg-white"
							onClick={goToError}
						>
							Go to error
							<ArrowLeft className="h-5 w-5 -rotate-90 fill-red-500" />
						</Button>
					}
				>
					<div className="mt-4 whitespace-pre-wrap font-mono text-text-sm">{traceback}</div>
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
