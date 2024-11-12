import { UpgradeFormSection } from "./Form";
import { UpgradeSteps } from "./Steps";

export function UpgradeFormStep() {
	return (
		<section className="flex w-full flex-col-reverse items-center justify-end gap-5 lg:flex-row lg:gap-[100px] xl:pl-[200px] 2xl:pl-[300px]">
			<UpgradeSteps />
			<UpgradeFormSection />
		</section>
	);
}
