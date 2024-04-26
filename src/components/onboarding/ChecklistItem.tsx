import { getServerSettingsKey, useServerSettings } from "@/data/server/get-server-settings";
import { useUpdateServerSettings } from "@/data/server/update-server-settings-mutation";
import { OnboardingChecklistItemName, OnboardingState } from "@/types/onboarding";
import { useQueryClient } from "@tanstack/react-query";
import {
	Button,
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
	ProgressOutstanding
} from "@zenml-io/react-component-library";
import { PropsWithChildren, ReactNode, useState } from "react";
import { Icon } from "../Icon";
import { Tick } from "../Tick";

type Props = {
	completed: boolean;
	active?: boolean;
	title: ReactNode;
	itemName: OnboardingChecklistItemName;
};
export function ChecklistItem({
	completed,
	title,
	children,
	itemName,
	active = true
}: PropsWithChildren<Props>) {
	const [open, setOpen] = useState(false);
	const queryClient = useQueryClient();
	const { data } = useServerSettings({ throwOnError: true });

	const { mutate } = useUpdateServerSettings({
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: getServerSettingsKey() });
		}
	});

	function markAsDone() {
		const newOnboardingState: OnboardingState = {
			...data?.metadata?.onboarding_state,
			[itemName]: true
		};
		mutate({ onboarding_state: newOnboardingState });
	}

	return (
		<Collapsible open={open} onOpenChange={setOpen}>
			<div className="flex w-full flex-col gap-3">
				<div className="flex w-full justify-between gap-2">
					<CollapsibleTrigger className="w-full">
						<ChecklistHeader title={title} completed={completed} />
					</CollapsibleTrigger>
					<div className="flex items-center gap-1">
						{!completed && active && (
							<Button
								onClick={markAsDone}
								className="items-center whitespace-nowrap"
								intent="primary"
								emphasis="subtle"
							>
								<Icon name="check" className="h-5 w-5 fill-primary-600" /> <span>Mark as done</span>
							</Button>
						)}
						<Icon
							name="chevron-down"
							className={` ${
								open ? "" : "-rotate-90"
							} h-5 w-5 shrink-0 rounded-md fill-neutral-500`}
						/>
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
