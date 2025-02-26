import { SelectFlavorList } from "@/components/stack-components/create-component/flavor-select";
import { snakeCaseToTitleCase } from "@/lib/strings";
import { StackComponentType } from "@/types/components";
import { Flavor } from "@/types/flavors";
import {
	DialogHeader,
	DialogTitle,
	ScrollArea
} from "@zenml-io/react-component-library/components/client";

type Props = {
	type: StackComponentType;
	setSelectedFlavor: (flavor: Flavor) => void;
};
export function SelectFlavorStep({ type, setSelectedFlavor }: Props) {
	return (
		<>
			<DialogHeader>
				<DialogTitle>Select {snakeCaseToTitleCase(type)} Flavor</DialogTitle>
			</DialogHeader>
			<ScrollArea viewportClassName="max-h-[70vh]">
				<div className="p-5">
					<SelectFlavorList setSelectedFlavor={setSelectedFlavor} type={type} />
				</div>
			</ScrollArea>
		</>
	);
}
