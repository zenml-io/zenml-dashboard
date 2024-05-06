import ChevronDown from "@/assets/icons/chevron-down.svg?react";
import { Key, Value } from "@/components/KeyValue";
import { snakeCaseToTitleCase } from "@/lib/strings";
import { StackComponent } from "@/types/components";
import { PipelineRun } from "@/types/pipeline-runs";
import {
	CollapsibleContent,
	CollapsibleHeader,
	CollapsiblePanel,
	CollapsibleTrigger
} from "@zenml-io/react-component-library";
import { ReactNode, useState } from "react";

type Props = {
	component: StackComponent;
	run: PipelineRun;
};

export function StackComponentCollapsible({ component, run }: Props) {
	const [open, setOpen] = useState(false);

	const keyName = `${component.body?.type}.${component.body?.flavor}`;
	const settings =
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		(run.metadata?.config.settings as { [key: string]: any } | undefined)?.[keyName] ?? "";

	if (!settings || Object.keys(settings).length === 0) {
		return (
			<CollapsibleHeader
				intent="secondary"
				className="grid w-full grid-cols-2 gap-2 rounded-md border border-theme-border-moderate pl-[60px]"
			>
				<span>{snakeCaseToTitleCase(component.body?.type as string)}</span>
				<div>{component.name}</div>
			</CollapsibleHeader>
		);
	}

	return (
		<CollapsiblePanel className="w-full" open={open} onOpenChange={setOpen}>
			<CollapsibleHeader intent="secondary" className="flex items-center justify-between ">
				<div className="flex w-full items-center gap-[10px]">
					<CollapsibleTrigger>
						<ChevronDown
							className={` ${
								open ? "" : "-rotate-90"
							} h-5 w-5 rounded-md fill-neutral-500 transition-transform duration-200 hover:bg-neutral-200`}
						/>
					</CollapsibleTrigger>
					<div className="grid w-full grid-cols-2 gap-2">
						<span>{snakeCaseToTitleCase(component.body?.type as string)}</span>
						<div>{component.name}</div>
					</div>
				</div>
			</CollapsibleHeader>
			<CollapsibleContent className="border-t border-theme-border-moderate bg-theme-surface-primary px-5 py-3">
				<dl className="grid grid-cols-1 gap-x-[10px] gap-y-2 pl-[36px] md:grid-cols-2 md:gap-y-4">
					{Object.entries(settings).map(([key, value]) => (
						<KeyValue key={key} label={key} value={JSON.stringify(value)} />
					))}
				</dl>
			</CollapsibleContent>
		</CollapsiblePanel>
	);
}

function KeyValue({ label, value }: { label: string; value: string | ReactNode }) {
	return (
		<>
			<Key className="col-span-1 text-theme-text-secondary">{label}</Key>
			<Value className="col-span-1 w-full truncate text-neutral-700">{value}</Value>
		</>
	);
}
