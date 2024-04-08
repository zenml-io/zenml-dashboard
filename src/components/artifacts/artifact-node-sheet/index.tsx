import { Sheet, SheetContent, SheetTrigger } from "@zenml-io/react-component-library";
import { PropsWithChildren } from "react";
import { ArtifactSheetContent } from "./SheetContent";

type Props = {
	artifactVersionId: string;
	onOpenChange?: (isOpen: boolean) => void;
};

export function ArtifactSheet({
	children,
	artifactVersionId,
	onOpenChange
}: PropsWithChildren<Props>) {
	return (
		<Sheet onOpenChange={onOpenChange}>
			<SheetTrigger asChild>{children}</SheetTrigger>
			<SheetContent className="w-[1000px] overflow-y-auto">
				<ArtifactSheetContent artifactVersionId={artifactVersionId} />
			</SheetContent>
		</Sheet>
	);
}
