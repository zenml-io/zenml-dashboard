import MCP from "@/assets/images/mcp.webp";
import {
	ProButtons,
	ProFeatureList,
	ProHeadline,
	ProImage,
	ProInfoBadge,
	ProWrapper
} from "@/components/pro/ProCta";
import { useTourContext } from "@/components/tour/TourContext";
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
			<div className="layout-container space-y-5 py-5">
				<ProWrapper className="relative overflow-y-hidden">
					<div className="w-full max-w-none space-y-5 lg:max-w-[900px]">
						<ProHeadline>Access Advanced Model Management Features with ZenML Pro</ProHeadline>
						<ProInfoBadge />
						<ProFeatureList
							features={[
								{
									title: "Model Control Plane Dashboard",
									subtitle: "Centralized model management and monitoring"
								},
								{
									title: "Enterprise Security",
									subtitle: "Social SSO, RBAC, and User Management"
								},
								{
									title: "Managed ZenML Server",
									subtitle: "On your VPC or hosted on our infrastructure"
								},
								{
									title: "Advanced MLOps",
									subtitle: "CI/CD/CT, Artifact Control Plane and more"
								}
							]}
						/>
						<ProButtons />
					</div>
					<ProImage
						className="absolute translate-x-[30%] translate-y-[15%] scale-[40%]"
						src={MCP}
						alt="Screenshot of the ZenML Pro Artifact Control Plane"
					/>
				</ProWrapper>
				<CommandSection />
			</div>
		</div>
	);
}
