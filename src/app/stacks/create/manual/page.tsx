import { Tabs } from "@radix-ui/react-tabs";
import { useState } from "react";
import { FormProvider } from "react-hook-form";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { ComponentsSelection } from "./ComponentSelection";
import { TypeOverview } from "./TypeOverview";
import { useManualStack } from "./useManualStack";
import { useMediaQuery } from "@/hooks/use-media-query";

export default function CreateStackManualPage() {
	const [selectedTab, setSelectedTab] = useState("");
	const { createManualStack, form } = useManualStack();

	const isMobile = useMediaQuery(1024);

	return (
		<FormProvider {...form}>
			<Tabs
				value={selectedTab}
				onValueChange={setSelectedTab}
				className="lg:h-full lg:overflow-hidden"
			>
				<form onSubmit={form.handleSubmit(createManualStack)} className="flex flex-col lg:h-full">
					{isMobile ? (
						<div className="block">
							<TypeOverview />
							<ComponentsSelection />
						</div>
					) : (
						<PanelGroup direction="horizontal">
							<Panel className="!overflow-y-auto" defaultSize={50} minSize={33}>
								<ComponentsSelection />
							</Panel>
							<PanelResizeHandle className="w-[1px] bg-theme-border-moderate transition-colors duration-200 data-[resize-handle-state=drag]:bg-theme-border-bold data-[resize-handle-state=hover]:bg-theme-border-bold" />
							<Panel className="!overflow-y-auto" defaultSize={50} minSize={33}>
								<TypeOverview />
							</Panel>
						</PanelGroup>
					)}
				</form>
			</Tabs>
		</FormProvider>
	);
}
