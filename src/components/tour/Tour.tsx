import { Button } from "@zenml-io/react-component-library";
import Joyride, { Step, TooltipRenderProps } from "react-joyride";

function ModalComponent({ step, primaryProps, size, index }: TooltipRenderProps) {
	return (
		<div className="rounded-lg max-w-[300px] space-y-2 rounded-md bg-white p-6 shadow-sm">
			{step.title && <div className="text-text-lg font-semibold">{step.title}</div>}
			<div className="text-theme-text-secondary">{step.content}</div>
			<div className="flex items-center justify-end py-1">
				<Button size="md" {...primaryProps}>
					Next
				</Button>
			</div>
			<div className="flex justify-center gap-2">
				{Array.from({ length: size }, (_, i) => (
					<div
						key={i}
						className={`h-2 w-2 rounded-rounded ${i === index ? "bg-primary-500" : "bg-[#DEE2E6]"} `}
					/>
				))}
			</div>
		</div>
	);
}

const steps: Step[] = [
	{
		content:
			"All your pipelines and runs are now consolidated in one convenient location. Instantly access the DAG for the latest run or browse through the list of runs for each pipeline.",
		target: "#pipelines-sidebar-link",
		title: "Pipelines and runs, now together",
		disableBeacon: true,
		disableOverlayClose: true
	},
	{
		content: "test2",
		target: "#test2",
		title: "test2",
		disableBeacon: true
	}
];

export function ProductTour() {
	return (
		<Joyride
			styles={{
				overlay: {
					background: "rgba(0, 0, 0, 0.15)"
				}
			}}
			tooltipComponent={ModalComponent}
			run
			steps={steps}
		/>
	);
}
