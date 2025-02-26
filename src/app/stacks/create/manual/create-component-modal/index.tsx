import { Dialog, DialogContent, DialogTrigger } from "@zenml-io/react-component-library";
import { snakeCaseToTitleCase } from "@/lib/strings";
import { StackComponentType } from "@/types/components";
import { SelectFlavorStep } from "./flavor-select";
import { useState } from "react";
import { Flavor } from "@/types/flavors";
import { ConfigurationStep } from "./configuration-step";
import { sleep } from "@/lib/common";

type Props = {
	type: StackComponentType;
};

export type SelectedFlavorState = {
	name: string;
	id: string;
	logoUrl?: string;
};

export function CreateComponentDialog({ type }: Props) {
	const [dialogOpen, setDialogOpen] = useState(false);
	const [step, setStep] = useState(0);
	const [selectedFlavor, setSelectedFlavor] = useState<SelectedFlavorState | null>(null);

	async function handleOpenChange(open: boolean) {
		setDialogOpen(open);
		// Not a clean solution, but prevents the flickering on close
		await sleep(100);
		if (!open) {
			setStep(0);
			setSelectedFlavor(null);
		}
	}

	function setFlavorIdAndNext(flavor: Flavor) {
		setSelectedFlavor({
			id: flavor.id,
			name: flavor.name,
			logoUrl: flavor.body?.logo_url ?? undefined
		});
		setStep((prev) => prev + 1);
	}

	function goBack() {
		setStep(0);
		setSelectedFlavor(null);
	}

	return (
		<Dialog open={dialogOpen} onOpenChange={(bool) => handleOpenChange(bool)}>
			<DialogTrigger asChild>
				<button className="w-full rounded-md border border-dashed border-neutral-300 bg-theme-surface-tertiary py-5 text-theme-text-secondary">
					New {snakeCaseToTitleCase(type)}
				</button>
			</DialogTrigger>
			<DialogContent className="w-full sm:max-w-[640px] md:max-w-3xl xl:max-w-[1080px]">
				{step === 0 && <SelectFlavorStep setSelectedFlavor={setFlavorIdAndNext} type={type} />}
				{step === 1 && !!selectedFlavor && (
					<ConfigurationStep
						successHandler={() => handleOpenChange(false)}
						backHandler={goBack}
						{...selectedFlavor}
						type={type}
					/>
				)}
			</DialogContent>
		</Dialog>
	);
}
