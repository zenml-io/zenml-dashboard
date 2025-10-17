import { cn } from "@zenml-io/react-component-library";
import { SheetContent } from "@zenml-io/react-component-library/components/client";
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";

type CustomProps = {
	handleSheetClose: () => void;
	autoSaveId?: string;
};

export const ResizableSheetContent = forwardRef<
	ElementRef<typeof SheetContent>,
	ComponentPropsWithoutRef<typeof SheetContent> & CustomProps
>(({ children, className, handleSheetClose, autoSaveId, ...rest }, ref) => {
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
					<div className="absolute inset-0" onClick={handleSheetClose} />
				</Panel>
				<PanelResizeHandle />
				<Panel className="!overflow-y-auto bg-theme-surface-primary" minSize={25} defaultSize={50}>
					{children}
				</Panel>
			</PanelGroup>
		</SheetContent>
	);
});

ResizableSheetContent.displayName = "ResizableSheetContent";
