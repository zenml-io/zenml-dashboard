"use client";
import ChevronRight from "@/assets/icons/chevron-right-double.svg?react";
import Expand from "@/assets/icons/expand-full.svg?react";
import { routes } from "@/router/routes";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "@zenml-io/react-component-library";
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
			<SheetContent className="w-[1000px] overflow-y-auto">
				<div className="flex h-9 items-center gap-1 border-b border-theme-border-moderate bg-theme-surface-primary px-4 py-3">
					<Button asChild intent="secondary" emphasis="minimal">
						<SheetClose className="focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:pointer-events-none">
							<ChevronRight className="h-5 w-5 fill-neutral-500" />
							<span className="sr-only">Close</span>
						</SheetClose>
					</Button>
					<Button intent="secondary" asChild emphasis="minimal">
						<Link to={routes.components.detail(componentId)}>
							<Expand className="h-5 w-5 shrink-0 fill-neutral-500" />
							<span className="sr-only">Expand component detail to page</span>
						</Link>
					</Button>
				</div>
				<div className="@container">
					<StackComponentsDetailHeader isPanel componentId={componentId} />
					<StackComponentTabs
						isPanel
						runsTabContent={<RunsList componentId={componentId} />}
						stacksTabContent={<StackList componentId={componentId} />}
						componentId={componentId}
					/>
				</div>
			</SheetContent>
		</Sheet>
	);
}
