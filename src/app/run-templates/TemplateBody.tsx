import templates from "@/assets/images/templates.webp";
import { Box, Button } from "@zenml-io/react-component-library";
import { Link } from "react-router-dom";
import { routes } from "../../router/routes";

const features = [
	"Run pipelines from the dashboard with Templates",
	"Re-run a pipeline easily from the UI",
	"Model and Artifact Control Plane Dashboard",
	"Managed ZenML server on your VPC or hosted on our servers",
	"Social SSO, RBAC, and User Management",
	"CI/CD/CT, and more!"
];

export function CtaSection() {
	return (
		<Box className="relative overflow-hidden border border-warning-100 px-7 py-5">
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
					<Button
						asChild
						className="truncate bg-warning-600 hover:bg-warning-400 active:bg-warning-500 active:ring-warning-50"
						size="md"
					>
						<Link to={routes.upgrade}>Try Pro Features</Link>
					</Button>
					<Button emphasis="minimal" size="md">
						<a href="https://www.zenml.io/pro" target="_blank" rel="noopener noreferrer">
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
