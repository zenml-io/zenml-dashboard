import { useWizardContext } from "@/context/WizardContext";
import { cn } from "@zenml-io/react-component-library";
import { ReactNode } from "react";
import { Tick } from "../Tick";

type Props = {
	entries: string[];
};

export function LeftSideMenu({ entries }: Props) {
	return (
		<aside className="whitespace-nowrap p-2 text-text-sm">
			<ul className="space-y-5">
				{entries.map((entry, index) => (
					<li key={index}>
						<LeftSideMenuItem index={index}>{entry}</LeftSideMenuItem>
					</li>
				))}
			</ul>
		</aside>
	);
}

type LeftSideMenuItemProps = {
	index: number;
	children: ReactNode;
};
function LeftSideMenuItem({ index, children }: LeftSideMenuItemProps) {
	const { currentStep } = useWizardContext();

	const classNames = cn("font-semibold flex items-center gap-1", {
		"text-theme-text-tertiary": index < currentStep,
		"text-theme-text-secondary": index > currentStep
	});

	return (
		<div className={classNames}>
			<StepIndicator index={index} />
			<span>{children}</span>
		</div>
	);
}

type StepIndicatorProps = {
	index: number;
};
function StepIndicator({ index }: StepIndicatorProps) {
	const { currentStep } = useWizardContext();
	const displayIndex = index + 1;
	if (currentStep > index) return <Tick className="h-5 w-5" tickClasses="w-3 h-3" />;
	if (currentStep === index)
		return (
			<div className="flex h-5 w-5 items-center justify-center rounded-rounded bg-primary-300 text-white">
				{displayIndex}
			</div>
		);
	if (currentStep < index)
		return (
			<div className="flex h-5 w-5 items-center justify-center rounded-rounded bg-neutral-300	 text-white">
				{displayIndex}
			</div>
		);
}
