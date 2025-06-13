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
import { useStopRun } from "./use-stop-run";

type Props = {
	runId: string;
	isActive: boolean;
};
export function RunStopDropdown({ runId, isActive }: Props) {
	const [isOpen, setIsOpen] = useState(false);

	const {
		stopRunQuery: { mutate: stopPipelineRun, isPending }
	} = useStopRun();

	function handleStop() {
		stopPipelineRun({
			runId,
			params: { graceful: true }
		});
	}

	return (
		<DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
			<DropdownMenuTrigger asChild>
				<Button
					disabled={!isActive || isPending}
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
					<span className="sr-only">Open run refresh menu</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="max-w-[100px] lg:max-w-[320px]">
				<DropdownMenuItem
					className="hover:cursor-pointer"
					icon={<StopCircle width={24} height={24} className="size-5 shrink-0" />}
					onSelect={(e) => {
						e.preventDefault();
						handleStop();
					}}
				>
					<div className="space-y-0.25">
						<p>Stop gracefully</p>
						<p className="text-text-xs text-theme-text-secondary">
							Stops the run gracefully. This will allow the current step to finish.
						</p>
					</div>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
