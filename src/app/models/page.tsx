import { PageHeader } from "@/components/PageHeader";
import { Badge } from "@zenml-io/react-component-library";
import { CommandSection, InfoBox } from "./Fragments";
import { CTASection, modelFeatures } from "@/contents/cloud-only";
import MCP from "@/assets/images/mcp.webp";
import { useTourContext } from "@/components/tour/TourContext";
import { useEffect } from "react";

export default function ModelsPage() {
	const {
		setTourState,
		tourState: { tourActive }
	} = useTourContext();

	useEffect(() => {
		if (tourActive) {
			setTourState((prev) => ({ ...prev, run: true, stepIndex: prev.stepIndex }));
		}
	}, [tourActive]);

	return (
		<div>
			<PageHeader className="flex items-center gap-1">
				<h1 className="text-display-xs font-semibold">Models</h1>
				<Badge color="purple" rounded size="sm">
					<span className="font-semibold text-primary-500">Pro</span>
				</Badge>
			</PageHeader>
			<div className="layout-container space-y-5 py-5">
				<InfoBox />
				<CTASection
					image={{ src: MCP, alt: "Screenshot of the ZenML Pro Model Control plane" }}
					features={modelFeatures}
				/>
				<CommandSection />
			</div>
		</div>
	);
}
