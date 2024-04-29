import Close from "@/assets/icons/close.svg?react";
import { Button, cn } from "@zenml-io/react-component-library";
import Joyride, { Step, TooltipRenderProps } from "react-joyride";

function ModalComponent({ step, primaryProps, size, index, skipProps }: TooltipRenderProps) {
	return (
		<div
			className={cn(
				"rounded-lg relative w-[300px] space-y-2 rounded-md bg-white p-6 shadow-sm",
				step.data?.className
			)}
		>
			<Button
				{...skipProps}
				className="absolute right-3 top-3 flex h-6 w-6 items-center justify-center p-0"
				intent="secondary"
				emphasis="minimal"
			>
				<Close className="h-5 w-5 shrink-0" /> <span className="sr-only">Close</span>
			</Button>
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
		content:
			"Soon you'll enjoy direct access to stacks and stack components through a newly updated interface right from your dashboard. Until then, rely on the CLI for all your needs.",
		target: "#stacks-sidebar-link",
		title: "Stacks and components",
		disableBeacon: true,
		disableOverlayClose: true
	},
	{
		content:
			"We are preparing new direct management options for repositories, secrets, and connectors now accesible from your server settings. Until then, the CLI can assist you.",
		target: "#settings-sidebar-link",
		title: "New home for your repos, secrets and connectors",
		disableBeacon: true,
		data: {
			className: "w-[480px]"
		},
		disableOverlayClose: true
	},
	{
		content:
			"Find out more about our advanced ZenML Cloud features like model and artifact management.",
		target: "#models-sidebar-link",
		title: "OSS is just the beginning",
		disableBeacon: true,

		disableOverlayClose: true
	}
];

export function ProductTour() {
	return (
		<Joyride
			floaterProps={{}}
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
