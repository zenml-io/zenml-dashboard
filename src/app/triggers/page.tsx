import Triggers from "@/assets/images/triggers.avif";
import {
	ProButtons,
	ProFeatureList,
	ProHeadline,
	ProImage,
	ProInfoBadge,
	ProWrapper
} from "@/components/pro/ProCta";

export default function TriggersPage() {
	return (
		<div>
			<div className="layout-container space-y-5 py-5">
				<ProWrapper className="relative overflow-y-hidden">
					<div className="w-full max-w-none space-y-5 lg:max-w-[900px]">
						<ProHeadline>Advanced Native Scheduling, Webhooks, and Triggers</ProHeadline>
						<ProInfoBadge />
						<ProFeatureList
							features={[
								{
									title: "Automate recurring training and evaluation jobs",
									subtitle: "Schedule pipelines to run at specific times or intervals"
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
						src={Triggers}
						alt="Screenshot of the ZenML Pro Triggers"
					/>
				</ProWrapper>
			</div>
		</div>
	);
}
