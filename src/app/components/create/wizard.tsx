import { Wrapper } from "@/components/wizard/Wizard";
import { StackComponentType } from "@/types/components";
import { Flavor } from "@/types/flavors";
import { useState } from "react";
import { ConfiguratinStep } from "./config-step";
import { FlavorStep } from "./flavor-step";
import { TypeSelect } from "./type-step";

export function RegisterComponentWizard() {
	const [step, setStep] = useState(0);
	const [type, setType] = useState<StackComponentType | null>(null);
	const [flavor, setFlavor] = useState<Flavor | null>();

	function selectTypeHandler(type: StackComponentType) {
		setType(type);
		setStep(1);
	}

	function selectFlavorHandler(flavor: Flavor) {
		setFlavor(flavor);
		setStep(2);
	}

	function goBack() {
		setStep((step) => step - 1);
	}

	return (
		<Wrapper>
			{step === 0 && <TypeSelect selectTypeHandler={selectTypeHandler} />}
			{step === 1 && type && (
				<FlavorStep type={type} handleFlavorSelect={selectFlavorHandler} handleBack={goBack} />
			)}
			{step === 2 && flavor && type && (
				<ConfiguratinStep flavor={flavor} type={type} handleBack={goBack} />
			)}
		</Wrapper>
	);
}
