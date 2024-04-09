import { Sheet, SheetContent, SheetTrigger } from "@zenml-io/react-component-library";
import { PropsWithChildren } from "react";
import { StepSheetContent } from "./SheetContent";

type Props = {
	stepId: string;
	onOpenChange?: (isOpen: boolean) => void;
};

export function StepSheet({ children, stepId, onOpenChange }: PropsWithChildren<Props>) {
	return (
		<Sheet onOpenChange={onOpenChange}>
			<SheetTrigger asChild>{children}</SheetTrigger>
			<SheetContent className="w-[1000px] overflow-y-auto">
				<StepSheetContent stepId={stepId} />
			</SheetContent>
		</Sheet>
	);
}
