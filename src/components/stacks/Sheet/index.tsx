import { ResizableSheetContent } from "@/components/sheet/resizable-sheet";
import { SheetHeader } from "@/components/sheet/SheetHeader";
import { Sheet, SheetTrigger } from "@zenml-io/react-component-library";
import { PropsWithChildren, useState } from "react";
import { ComponentList } from "./ComponentList";
import { IntegrationsContextProvider } from "./IntegrationsContext";
import { StackHeadline } from "./StackHeadline";
import { StackLabels } from "./StackLabels";
import { StackSetCommand } from "./StackSetCommand";

type Props = {
	stackId: string;
};

export function StackSheet({
	children,
	stackId,
	stackName
}: PropsWithChildren<Props & { stackName: string }>) {
	const [isOpen, setIsOpen] = useState(false);
	return (
		<Sheet open={isOpen} onOpenChange={setIsOpen}>
			<SheetTrigger>{children}</SheetTrigger>
			<ResizableSheetContent className="overflow-y-auto">
				<IntegrationsContextProvider>
					<SheetHeader />
					<StackHeadline stackId={stackId} />
					<StackSetCommand name={stackName} />
					<ComponentList stackId={stackId} />
					<StackLabels stackId={stackId} />
				</IntegrationsContextProvider>
			</ResizableSheetContent>
		</Sheet>
	);
}
