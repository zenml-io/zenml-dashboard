import MCP from "@/assets/images/mcp.webp";
import { PageHeader } from "@/components/PageHeader";
import { ProBadge } from "@/components/ProBadge";
import { useTourContext } from "@/components/tour/TourContext";
import { CTASection, modelFeatures } from "@/contents/cloud-only";
import { useEffect } from "react";
import { CommandSection } from "./Fragments";

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
				<ProBadge />
			</PageHeader>
			<div className="layout-container space-y-5 py-5">
				<CTASection
					feature="model"
					image={{ src: MCP, alt: "Screenshot of the ZenML Pro Model Control plane" }}
					features={modelFeatures}
				/>
				<CommandSection />
			</div>
		</div>
	);
}
