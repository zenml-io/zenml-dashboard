import { Button } from "@zenml-io/react-component-library";
import Joyride, { Step, TooltipRenderProps } from "react-joyride";

function ModalComponent({ step, primaryProps }: TooltipRenderProps) {
	return (
		<div className="rounded-lg rounded-md bg-white p-6 shadow-sm">
			{step.content}
			<Button {...primaryProps}>Next</Button>
		</div>
	);
}

const steps: Step[] = [
	{
		content: "test",
		target: "#test",
		title: "test",
		disableBeacon: true
		// styles: {
		// 	spotlight: {
		// 		backgroundColor: "rgba(0, 0, 0, 0.9)"
		// 	}
		// }
	},
	{
		content: "test2",
		target: "#test2",
		title: "test2",
		disableBeacon: true
	}
];

export function ProductTour() {
	return <Joyride tooltipComponent={ModalComponent} run steps={steps} />;
}
