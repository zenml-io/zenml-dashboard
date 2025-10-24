import { Tabs } from "@radix-ui/react-tabs";
import { useState } from "react";
import { FormProvider } from "react-hook-form";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { ComponentsSelection } from "./ComponentSelection";
import { TypeOverview } from "./TypeOverview";
import { useManualStack } from "./useManualStack";

export default function CreateStackManualPage() {
	const [selectedTab, setSelectedTab] = useState("");
	const { createManualStack, form } = useManualStack();

	return (
		<FormProvider {...form}>
			<Tabs
				value={selectedTab}
				onValueChange={setSelectedTab}
				className="lg:h-full lg:overflow-hidden"
			>
				<form
					onSubmit={form.handleSubmit(createManualStack)}
					className="hidden h-full flex-col lg:flex"
				>
					<PanelGroup direction="horizontal">
						<Panel className="!overflow-y-auto" defaultSize={50} minSize={33}>
							<ComponentsSelection />
						</Panel>
						<PanelResizeHandle className="w-[1px] bg-theme-border-moderate transition-colors duration-200 data-[resize-handle-state=drag]:bg-theme-border-bold data-[resize-handle-state=hover]:bg-theme-border-bold" />
						<Panel className="!overflow-y-auto" defaultSize={50} minSize={33}>
							<TypeOverview />
						</Panel>
					</PanelGroup>
				</form>
				<form onSubmit={form.handleSubmit(createManualStack)} className="block lg:hidden">
					<TypeOverview />
					<ComponentsSelection />
				</form>
			</Tabs>
		</FormProvider>
	);
}
