import {
	Button,
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
	ProgressOutstanding
} from "@zenml-io/react-component-library";
import { PropsWithChildren, ReactNode, useState } from "react";
import { Tick } from "../Tick";

type Props = {
	completed: boolean;
	title: ReactNode;
};
export function ChecklistItem({ completed, title, children }: PropsWithChildren<Props>) {
	const [open, setOpen] = useState(true);
	return (
		<Collapsible open={open} onOpenChange={setOpen}>
			<div className="flex w-full flex-col gap-3">
				<div className="flex w-full justify-between gap-2">
					<CollapsibleTrigger className="w-full">
						<ChecklistHeader title={title} completed={completed} />
					</CollapsibleTrigger>
					{!completed && (
						<Button className="whitespace-nowrap" intent="primary" emphasis="subtle">
							Mark as done
						</Button>
					)}
				</div>
				{children && (
					<CollapsibleContent>
						<div className="flex w-full items-center gap-2">
							<div className="w-[28px] shrink-0" />
							<div className="w-full min-w-0 flex-1">{children}</div>
						</div>
					</CollapsibleContent>
				)}
			</div>
		</Collapsible>
	);
}

type HeaderProps = {
	completed: boolean;
	title: ReactNode;
};
export function ChecklistHeader({ completed, title }: HeaderProps) {
	return (
		<div className="flex w-full items-center justify-between gap-2">
			<div className="flex w-full items-center gap-2">
				{completed ? <Tick /> : <ProgressOutstanding />}
				<div
					className={`font-semibold ${
						completed ? "text-theme-text-tertiary line-through decoration-theme-text-tertiary" : ""
					}
					`}
				>
					{title}
				</div>
			</div>
		</div>
	);
}
