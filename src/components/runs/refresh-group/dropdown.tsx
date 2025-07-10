import {
	Button,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger
} from "@zenml-io/react-component-library";
import Icon from "@/assets/icons/running.svg?react";
import ChevronDown from "@/assets/icons/chevron-down.svg?react";
import { useDeepRefresh } from "./deep-refresh";
import { useState } from "react";

type Props = {
	runId: string;
};
export function RunRefreshDropdown({ runId }: Props) {
	const [isOpen, setIsOpen] = useState(false);
	const { isPending, mutate: fetchOrchestratorPipelineRun } = useDeepRefresh(setIsOpen);

	return (
		<DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
			<DropdownMenuTrigger asChild>
				<Button
					intent="primary"
					emphasis="subtle"
					size="sm"
					className="flex aspect-square items-center justify-center rounded-l-sharp border-l-0 p-0"
				>
					<ChevronDown width={20} height={20} className="size-4 shrink-0" />
					<span className="sr-only">Open run refresh menu</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end" className="max-w-[100px] lg:max-w-[320px]">
				<DropdownMenuItem
					className="hover:cursor-pointer"
					icon={<Icon width={24} height={24} className="size-5 shrink-0" />}
					onSelect={(e) => {
						e.preventDefault();
						fetchOrchestratorPipelineRun({ runId, queries: { include_steps: false } });
					}}
					disabled={isPending}
				>
					<div className="space-y-0.25">
						<p>Deep Refresh</p>
						<p className="text-text-xs text-theme-text-secondary">
							Queries the orchestrator directly. Takes longer but ensures most up-to-date data
						</p>
					</div>
				</DropdownMenuItem>
				<DropdownMenuItem
					className="hover:cursor-pointer"
					icon={<Icon width={24} height={24} className="size-5 shrink-0" />}
					onSelect={(e) => {
						e.preventDefault();
						fetchOrchestratorPipelineRun({ runId, queries: { include_steps: true } });
					}}
					disabled={isPending}
				>
					<div className="space-y-0.25">
						<p>Step Refresh</p>
						<p className="text-text-xs text-theme-text-secondary">
							Include steps in the refresh. Takes longer but ensures most up-to-date data
						</p>
					</div>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
