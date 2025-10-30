import Expand from "@/assets/icons/expand-full.svg?react";
import { SheetHeader } from "@/components/sheet/SheetHeader";
import { ResizableSheetContent } from "@/components/sheet/resizable-sheet";
import { routes } from "@/router/routes";
import { Sheet, SheetTrigger } from "@zenml-io/react-component-library";
import { Button } from "@zenml-io/react-component-library/components/server";
import { PropsWithChildren } from "react";
import { Link } from "react-router-dom";
import { StackComponentsDetailHeader } from "../component-detail/Header";
import { StackComponentTabs } from "../component-detail/Tabs";
import { RunsList } from "./runs-tab/RunsList";
import { StackList } from "./stacks-tab/StackList";

type Props = {
	componentId: string;
	onOpenChange?: (isOpen: boolean) => void;
};

export function ComponentSheet({ children, onOpenChange, componentId }: PropsWithChildren<Props>) {
	return (
		<Sheet onOpenChange={onOpenChange}>
			<SheetTrigger asChild>{children}</SheetTrigger>
			<ResizableSheetContent className="overflow-y-auto">
				<SheetHeader className="gap-0.5">
					<Button
						className="flex aspect-square items-center justify-center p-0"
						intent="secondary"
						asChild
						emphasis="minimal"
					>
						<Link to={routes.components.detail(componentId)}>
							<Expand className="h-5 w-5 shrink-0 fill-neutral-500" />
							<span className="sr-only">Expand component detail to page</span>
						</Link>
					</Button>
				</SheetHeader>
				<div className="@container">
					<StackComponentsDetailHeader isPanel componentId={componentId} />
					<StackComponentTabs
						isPanel
						runsTabContent={<RunsList componentId={componentId} />}
						stacksTabContent={<StackList componentId={componentId} />}
						componentId={componentId}
					/>
				</div>
			</ResizableSheetContent>
		</Sheet>
	);
}
