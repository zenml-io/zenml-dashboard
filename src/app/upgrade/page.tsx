import { UpgradeProvider } from "./components/Context";
import { UpgradeWrapperBox } from "./components/form/Wrapper";

export default function UpgradePage() {
	return (
		<div className="flex h-full items-center justify-center">
			<div className="layout-container">
				<UpgradeProvider>
					<UpgradeWrapperBox />
				</UpgradeProvider>
			</div>
		</div>
	);
}
