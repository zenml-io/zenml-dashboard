import { AddComponentsGrid } from "@/components/stacks/edit-create/add-component-grid";
import { StackFormButtonBar } from "@/components/stacks/edit-create/button-bar";
import { StackNameInput } from "@/components/stacks/edit-create/stack-name-input";
import { routes } from "@/router/routes";
import { StackComponent } from "@/types/components";
import { Stack } from "@/types/stack";
import { zodResolver } from "@hookform/resolvers/zod";
import { Tabs } from "@radix-ui/react-tabs";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { ComponentsSelection } from "../../create/manual/ComponentSelection";
import { formSchema, FormType } from "../../create/manual/schema";
import { useUpdateStackHook } from "./use-update-stack";
import { UpdateStackWarningBanner } from "./update-warning-banner";

type UpdateFormProps = {
	stackId: string;
	stack: Stack;
	initialFormData: FormType;
};

export function UpdateForm({ stackId, stack, initialFormData }: UpdateFormProps) {
	const [selectedTab, setSelectedTab] = useState("");
	const { updateExistingStack, isPending: isUpdating } = useUpdateStackHook(stackId);

	const form = useForm<FormType>({
		resolver: zodResolver(formSchema(stack.name)),
		defaultValues: initialFormData
	});

	return (
		<FormProvider {...form}>
			<Tabs value={selectedTab} onValueChange={setSelectedTab} className="flex-1 overflow-hidden">
				<form onSubmit={form.handleSubmit(updateExistingStack)} className="h-full">
					<PanelGroup direction="horizontal" className="h-full !flex-col md:!flex-row">
						<Panel className="!overflow-y-auto" defaultSize={50} minSize={33}>
							<div className="flex h-full flex-1 flex-col">
								<UpdateStackWarningBanner />
								<ComponentsSelection
									initialComponents={
										stack.metadata?.components as Record<string, StackComponent[]> | undefined
									}
								/>
							</div>
						</Panel>
						<PanelResizeHandle className="w-[1px] bg-theme-border-moderate transition-colors duration-200 data-[resize-handle-state=drag]:bg-theme-border-bold data-[resize-handle-state=hover]:bg-theme-border-bold" />
						<Panel
							className="!overflow-y-auto bg-theme-surface-primary"
							defaultSize={50}
							minSize={33}
						>
							<UpdateTypeOverview isUpdating={isUpdating} />
						</Panel>
					</PanelGroup>
				</form>
			</Tabs>
		</FormProvider>
	);
}

type UpdateTypeOverviewProps = {
	isUpdating: boolean;
};

function UpdateTypeOverview({ isUpdating }: UpdateTypeOverviewProps) {
	return (
		<div className="flex h-full flex-col justify-between space-y-5">
			<div className="space-y-5 p-5">
				<StackNameInput />
				<AddComponentsGrid />
			</div>
			<StackFormButtonBar
				cancelRoute={routes.stacks.overview}
				submitLabel="Update Stack"
				isLoading={isUpdating}
			/>
		</div>
	);
}
