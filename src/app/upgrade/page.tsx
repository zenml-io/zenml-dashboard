import { UpgradeProvider } from "./components/Context";
import { UpgradeWrapperBox } from "./components/form/Wrapper";

export default function UpgradePage() {
	return (
		<div className="flex items-center justify-center lg:h-full">
			<div className="layout-container py-5">
				<UpgradeProvider>
					<UpgradeWrapperBox />
				</UpgradeProvider>
			</div>
		</div>
	);
}
