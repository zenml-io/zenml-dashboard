import ChevronDown from "@/assets/icons/chevron-down.svg?react";
import { CommandListArgs, generateCommandList } from "@/components/fallback-pages/Commands";
import { HelpBox } from "@/components/fallback-pages/Helpbox";
import {
	CollapsibleContent,
	CollapsibleHeader,
	CollapsiblePanel,
	CollapsibleTrigger,
	ProgressOutstanding
} from "@zenml-io/react-component-library";
import { Fragment, useState } from "react";
import InfoBox from "../../components/Infobox";

export function StackCollapsible() {
	const [open, setOpen] = useState(true);
	return (
		<CollapsiblePanel open={open} onOpenChange={setOpen}>
			<CollapsibleHeader className="flex items-center gap-[10px]">
				<CollapsibleTrigger className="flex w-full items-center gap-[10px] text-text-lg font-semibold">
					<ChevronDown
						className={` ${
							open ? "" : "-rotate-90"
						} h-5 w-5 rounded-md fill-neutral-500 transition-transform duration-200 hover:bg-neutral-200`}
					/>
					Getting started with stacks
				</CollapsibleTrigger>
			</CollapsibleHeader>
			<CollapsibleContent className="space-y-5 border-t border-theme-border-moderate bg-theme-surface-primary p-5">
				<InfoBox intent="neutral" className="text-text-md">
					A stack is the configuration of tools and infrastructure that your pipelines can run on.
					When you run ZenML code without configuring a stack, the pipeline will run on the
					so-called default stack. A stack consists of multiple components. All stacks have at
					minimum an <strong>orchestrator</strong> and an <strong>artifact store</strong>.
				</InfoBox>

				<div className="flex items-center gap-2">
					<ProgressOutstanding />
					Administering the stack
				</div>
				<CommandSection />
			</CollapsibleContent>
		</CollapsiblePanel>
	);
}

export function CommandSection() {
	const commands: CommandListArgs[] = [
		{
			command: "zenml stack register a_new_local_stack -o default -a my_artifact_store",
			description: "Register a stack"
		},
		{
			command: "zenml stack list",
			description: "List the stacks that you have registered within your current ZenML server"
		},
		{
			command: "zenml stack delete STACK_NAME",
			description: "Delete a stack that you have previously registered"
		},
		{
			command: "zenml stack set STACK_NAME",
			description: "Set a different stack"
		},
		{
			command: "zenml stack get",
			description: "Check which stack is currently set as the default active stack"
		},
		{
			command: "zenml stack update STACK_NAME -o NEW_ORCHESTRATOR_NAME",
			description: "Update a stack"
		}
	];

	return (
		<section className="space-y-5 pl-8 pr-5">
			<InfoBox className="text-text-md" intent="neutral">
				To register a new stack, you must already have registered the individual components of the
				stack using the commands listed here.
			</InfoBox>
			{commands.map((item, index) => (
				<Fragment key={index}>{generateCommandList(item)}</Fragment>
			))}
			{/* TODO add link */}
			<HelpBox link="" />
		</section>
	);
}
