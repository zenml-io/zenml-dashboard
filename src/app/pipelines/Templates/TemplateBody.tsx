import { InfoBox as InfoBoxPrimitive } from "@/components/Infobox";
import templates from "@/assets/images/templates.webp";
import { Box, Button } from "@zenml-io/react-component-library";

export function TemplateBody() {
	return (
		<div className="layout-container space-y-5">
			<InfoBox />
			<CtaSection />
		</div>
	);
}

function InfoBox() {
	return (
		<InfoBoxPrimitive>
			<div className="flex w-full flex-wrap items-center gap-x-2 gap-y-0.5 text-text-md">
				<p className="font-semibold">This is a ZenML Pro feature. </p>
				<p>
					Upgrade to ZenML Pro to access the Templates and save settings and run pipelines from the
					dashboard.
				</p>
			</div>
		</InfoBoxPrimitive>
	);
}

const features = [
	"Run pipelines from the dashboard with Templates",
	"Re-run a pipeline easily from the UI",
	"Model and Artifact Control Plane Dashboard",
	"Managed ZenML server on your VPC or hosted on our servers",
	"Social SSO, RBAC, and User Management",
	"CI/CD/CT, and more!"
];

function CtaSection() {
	return (
		<Box className="relative overflow-hidden px-7 py-5">
			<div className="max-w-[450px] space-y-4">
				<h2 className="text-display-xs font-semibold">
					Access Advanced Template Features with ZenML Pro
				</h2>
				<ul className="space-y-2">
					{features.map((item, i) => (
						<li key={i} className="text-text-md text-theme-text-secondary">
							{item}
						</li>
					))}
				</ul>
				<div className="flex flex-wrap items-center gap-2">
					<Button size="md" asChild>
						<a href="https://cloud.zenml.io/signup" target="_blank" rel="noopener noreferrer">
							Upgrade to ZenML Pro
						</a>
					</Button>
					<Button emphasis="minimal" size="md">
						<a href="https://www.zenml.io/cloud" target="_blank" rel="noopener noreferrer">
							Learn more
						</a>
					</Button>
				</div>
			</div>
			<img
				className="absolute right-0 top-0 hidden translate-x-[30%] scale-75 md:translate-y-[30%] lg:block xl:-translate-y-[5%]"
				src={templates}
				alt="Screenshot of Zenml Pro Templates Feature"
			/>
		</Box>
	);
}
