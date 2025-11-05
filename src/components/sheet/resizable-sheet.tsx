import { cn } from "@zenml-io/react-component-library";
import { SheetClose, SheetContent } from "@zenml-io/react-component-library/components/client";
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";

type CustomProps = {
	autoSaveId?: string;
};

export const ResizableSheetContent = forwardRef<
	ElementRef<typeof SheetContent>,
	ComponentPropsWithoutRef<typeof SheetContent> & CustomProps
>(({ children, className, autoSaveId, ...rest }, ref) => {
	return (
		<SheetContent
			{...rest}
			ref={ref}
			className={cn(
				"h-full w-full !max-w-full !border-0 !bg-transparent p-0 !shadow-none",
				className
			)}
		>
			<PanelGroup autoSaveId={autoSaveId} direction="horizontal" className="h-full">
				<Panel defaultSize={30} minSize={10} className="relative bg-transparent">
					<SheetClose className="absolute inset-0 hover:cursor-default" />
				</Panel>
				<PanelResizeHandle className="w-[1px] bg-theme-border-moderate transition-colors duration-200 data-[resize-handle-state=drag]:bg-theme-border-bold data-[resize-handle-state=hover]:bg-theme-border-bold" />
				<Panel
					className="!overflow-y-auto bg-theme-surface-secondary"
					minSize={25}
					defaultSize={50}
				>
					{children}
				</Panel>
			</PanelGroup>
		</SheetContent>
	);
});

ResizableSheetContent.displayName = "ResizableSheetContent";
