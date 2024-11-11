import { useEffect } from "react";
import { useBreadcrumbsContext } from "../../layouts/AuthenticatedLayout/BreadcrumbsContext";
import { UpgradeProvider } from "./components/Context";
import { UpgradeWrapperBox } from "./components/form/Wrapper";

export default function UpgradePage() {
	const { setCurrentBreadcrumbData } = useBreadcrumbsContext();
	useEffect(() => {
		setCurrentBreadcrumbData({ segment: "upgrade", data: null });
	}, []);
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
