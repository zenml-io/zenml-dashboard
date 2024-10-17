import {
	CollapsibleContent,
	CollapsiblePanel,
	CollapsibleTrigger,
	ProgressOutstanding,
	cn
} from "@zenml-io/react-component-library";
import ChevronDown from "@/assets/icons/chevron-down.svg?react";
import { PropsWithChildren, ReactNode, useEffect, useState } from "react";
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
	hasDownstream,
	active = false
}: PropsWithChildren<Props>) {
	const [open, setOpen] = useState(active);

	useEffect(() => {
		setOpen(active);
	}, [active]);

	return (
		<CollapsiblePanel
			disabled={!(hasDownstream || active || completed)}
			open={open}
			onOpenChange={setOpen}
		>
			<div className="flex w-full flex-col gap-3 bg-theme-surface-primary px-5 py-3">
				<div className="flex w-full justify-between gap-2">
					{completed ? (
						<Tick className="shrink-0" />
					) : hasDownstream ? (
						<SkippedStep />
					) : (
						<ProgressOutstanding className="shrink-0" />
					)}
					<CollapsibleTrigger className="w-full">
						<ChecklistHeader
							active={active}
							skipped={hasDownstream}
							title={title}
							completed={completed}
						/>
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
			</div>

			{children && (
				<CollapsibleContent className="border-t border-theme-border-moderate">
					<div className="flex w-full items-center gap-2 bg-theme-surface-primary p-5">
						<div className="w-[28px] shrink-0" />
						<div className="w-full min-w-0 flex-1">{children}</div>
					</div>
				</CollapsibleContent>
			)}
		</CollapsiblePanel>
	);
}

type HeaderProps = {
	completed: boolean;
	title: ReactNode;
	skipped: boolean;
	active?: boolean;
};
export function ChecklistHeader({ completed, title, skipped, active }: HeaderProps) {
	return (
		<div className="flex w-full items-center justify-between gap-2">
			<div className="flex w-full items-center">
				<div
					className={cn("text-text-xl", {
						"text-theme-text-tertiary line-through decoration-theme-text-tertiary":
							completed || skipped,
						"font-semibold": active,
						"text-theme-text-secondary": !active && !completed
					})}
				>
					{title}
				</div>
			</div>
		</div>
	);
}
