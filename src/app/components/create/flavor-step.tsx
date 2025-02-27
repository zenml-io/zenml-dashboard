import ArrowLeft from "@/assets/icons/arrow-left.svg?react";
import { SelectFlavorList } from "@/components/stack-components/create-component/flavor-select";
import * as Wizard from "@/components/wizard/Wizard";
import { snakeCaseToTitleCase } from "@/lib/strings";
import { StackComponentType } from "@/types/components";
import { Flavor } from "@/types/flavors";
import { Button } from "@zenml-io/react-component-library/components/server";

type Props = {
	type: StackComponentType;
	handleFlavorSelect: (flavor: Flavor) => void;
	handleBack: () => void;
};

export function FlavorStep({ type, handleFlavorSelect, handleBack }: Props) {
	return (
		<>
			<Wizard.Header className="flex items-center gap-2">
				<Button
					intent="secondary"
					emphasis="subtle"
					className="flex aspect-square size-6 items-center justify-center"
					onClick={() => handleBack()}
				>
					<ArrowLeft className="size-5 shrink-0" />
					<span className="sr-only">Go step back</span>
				</Button>
				<span>Select your {snakeCaseToTitleCase(type)} Flavor</span>{" "}
			</Wizard.Header>
			<Wizard.Body>
				<SelectFlavorList type={type} setSelectedFlavor={handleFlavorSelect} />
			</Wizard.Body>
		</>
	);
}
