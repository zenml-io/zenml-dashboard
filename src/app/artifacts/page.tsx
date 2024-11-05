import ACP from "@/assets/images/acp.webp";
import { PageHeader } from "@/components/PageHeader";
import { ProBadge } from "@/components/ProBadge";
import { CTASection, artifactFeatures } from "@/contents/cloud-only";
import { CommandSection } from "./Fragments";

export default function ModelsPage() {
	return (
		<div>
			<PageHeader className="flex items-center gap-1">
				<h1 className="text-display-xs font-semibold">Artifacts</h1>
				<ProBadge />
			</PageHeader>
			<div className="layout-container space-y-5 py-5">
				<CTASection
					feature="artifact"
					image={{ src: ACP, alt: "Screenshot of the ZenML Pro Artifact Control plane" }}
					features={artifactFeatures}
				/>
				<CommandSection />
			</div>
		</div>
	);
}
