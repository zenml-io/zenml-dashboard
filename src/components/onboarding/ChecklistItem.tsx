import ChevronDown from "@/assets/icons/chevron-down.svg?react";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
	ProgressOutstanding,
	cn
} from "@zenml-io/react-component-library";
import { PropsWithChildren, ReactNode, useState } from "react";
import { Tick } from "../Tick";
import { SkippedStep } from "./SkippedStep";

type Props = {
	completed: boolean;
	active?: boolean;
	title: ReactNode;
	hasDownstream: boolean;
};
export function ChecklistItem({
	completed,
	title,
	children,
	hasDownstream
}: PropsWithChildren<Props>) {
	const [open, setOpen] = useState(false);

	return (
		<Collapsible open={open} onOpenChange={setOpen}>
			<div className="flex w-full flex-col gap-3">
				<div className="flex w-full justify-between gap-2">
					{completed ? (
						<Tick className="shrink-0" />
					) : hasDownstream ? (
						<SkippedStep />
					) : (
						<ProgressOutstanding className="shrink-0" />
					)}
					<CollapsibleTrigger className="w-full">
						<ChecklistHeader skipped={hasDownstream} title={title} completed={completed} />
					</CollapsibleTrigger>
					<div className="flex items-center gap-1">
						<CollapsibleTrigger>
							<ChevronDown
								className={` ${
									open ? "" : "-rotate-90"
								} h-5 w-5 shrink-0 rounded-md fill-neutral-500`}
							/>
						</CollapsibleTrigger>
					</div>
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
	skipped: boolean;
};
export function ChecklistHeader({ completed, title, skipped }: HeaderProps) {
	return (
		<div className="flex w-full items-center justify-between gap-2">
			<div className="flex w-full items-center">
				<div
					className={`font-semibold ${cn({
						"text-theme-text-tertiary": completed || skipped,
						"line-through decoration-theme-text-tertiary": completed
					})} 
					`}
				>
					{title}
				</div>
			</div>
		</div>
	);
}
