import { ProWrapper } from "@/components/pro/ProCta";
import { useUpgradeContext } from "../Context";
import { UpgradeFormStep } from "./index";
import Image from "@/assets/images/upgrade-form.webp";
import { SubmitSuccess } from "../Success";

export function UpgradeWrapperBox() {
	const { submitSuccess } = useUpgradeContext();
	return (
		<ProWrapper className="relative min-h-[620px]">
			<img
				src={Image}
				className="absolute hidden -translate-x-3/4 -rotate-[5deg] scale-75 xl:block 2xl:-translate-x-[60%]"
			/>
			{submitSuccess === false && <UpgradeFormStep />}
			{submitSuccess === true && <SubmitSuccess />}
		</ProWrapper>
	);
}
