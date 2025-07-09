import { useSearchParams } from "react-router-dom";
import { SuccessBanner } from "./success-banner";
import { SupportResources } from "./support-resources";
import { Templates } from "./templates";
import { NextSteps } from "./next-steps";
import { Welcome } from "./welcome";

export default function OverviewPage() {
	const [queryParams] = useSearchParams();

	const displayBanner = queryParams.get("success") === "true";

	return (
		<div className="layout-container space-y-8 py-5">
			{displayBanner && <SuccessBanner />}
			<Welcome />
			<NextSteps />
			<Templates />
			<SupportResources />
		</div>
	);
}
