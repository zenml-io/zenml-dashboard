"use client";

import ChevronDown from "@/assets/icons/chevron-down.svg?react";
import StopCircle from "@/assets/icons/stop-circle.svg?react";
import {
	Button,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger
} from "@zenml-io/react-component-library";
import { useState } from "react";
import { StopImmediatelyAlert } from "./stop-alert";

type Props = {
	runId: string;
	isActive: boolean;
};
export function RunStopDropdown({ runId, isActive }: Props) {
	const [isOpen, setIsOpen] = useState(false);
	const [isStopAlertOpen, setIsStopAlertOpen] = useState(false);

	return (
		<>
			<StopImmediatelyAlert open={isStopAlertOpen} setOpen={setIsStopAlertOpen} runId={runId} />
			<DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
				<DropdownMenuTrigger asChild>
					<Button
						disabled={!isActive}
						intent="secondary"
						emphasis="subtle"
						size="sm"
						className="group flex aspect-square items-center justify-center rounded-l-sharp border-l-0 p-0"
					>
						<ChevronDown
							width={20}
							height={20}
							className="size-4 shrink-0 fill-theme-text-primary transition-all duration-200 group-disabled:fill-neutral-300"
						/>
						<span className="sr-only">Open stop run menu</span>
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent className="max-w-[100px] lg:max-w-[320px]">
					<DropdownMenuItem
						className="hover:cursor-pointer"
						icon={<StopCircle width={24} height={24} className="size-5 shrink-0" />}
						onSelect={() => {
							setIsStopAlertOpen(true);
						}}
					>
						<div className="space-y-0.25">
							<p>Stop immediately</p>
							<p className="text-text-xs text-theme-text-secondary">
								Stops the run immediately. This won't allow the current step to finish.
							</p>
						</div>
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</>
	);
}
