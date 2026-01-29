import AlertCircle from "@/assets/icons/alert-circle.svg?react";
import ArrowLeft from "@/assets/icons/arrow-left.svg?react";
import { Button } from "@zenml-io/react-component-library/components/server";
import { CollapsibleCard } from "./CollapsibleCard";

type Props = {
	traceback: string;
};

export function ErrorTracebackCollapsible({ traceback }: Props) {
	function goToError() {
		const errorLineElement = document.querySelector(".error-highlight-line");
		if (errorLineElement) {
			errorLineElement.scrollIntoView({ behavior: "smooth" });
		}
	}

	return (
		<CollapsibleCard
			initialOpen
			title={
				<>
					<AlertCircle className="h-5 w-5 fill-theme-text-error" /> Error
				</>
			}
			className="border border-error-200"
			headerClassName="flex justify-between border-b border-error-200"
			headerChildren={
				<Button className="whitespace-nowrap" onClick={goToError} intent="danger" emphasis="subtle">
					Go to error
					<ArrowLeft className="h-5 w-5 -rotate-90 fill-error-700" />
				</Button>
			}
		>
			<div className="whitespace-pre-wrap font-mono">{traceback}</div>
		</CollapsibleCard>
	);
}
