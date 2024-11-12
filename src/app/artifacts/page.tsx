import ACP from "@/assets/images/acp.webp";
import { PageHeader } from "@/components/PageHeader";
import { ProBadge } from "@/components/pro/ProBadge";
import {
	ProButtons,
	ProFeatureList,
	ProHeadline,
	ProImage,
	ProInfoBadge,
	ProWrapper
} from "@/components/pro/ProCta";
import { CommandSection } from "./Fragments";

export default function ModelsPage() {
	return (
		<div>
			<PageHeader className="flex items-center gap-1">
				<h1 className="text-display-xs font-semibold">Artifacts</h1>
				<ProBadge />
			</PageHeader>
			<div className="layout-container space-y-5 py-5">
				<ProWrapper className="relative overflow-y-hidden">
					<div className="w-full max-w-none space-y-5 lg:max-w-[900px]">
						<ProHeadline>Advanced Artifact Management Features with ZenML Pro</ProHeadline>
						<ProInfoBadge />
						<ProFeatureList
							features={[
								{
									title: "Artifact Control Plane Dashboard",
									subtitle: "Artifact management and monitoring"
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
									subtitle: "CI/CD/CT, Model Control Plane and more"
								}
							]}
						/>
						<ProButtons />
					</div>
					<ProImage
						className="absolute translate-x-[30%] translate-y-[15%] scale-[40%]"
						src={ACP}
						alt="Screenshot of the ZenML Pro Artifact Control Plane"
					/>
				</ProWrapper>
				<CommandSection />
			</div>
		</div>
	);
}
