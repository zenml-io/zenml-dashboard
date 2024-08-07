import { Box, buttonVariants } from "@zenml-io/react-component-library";

const cloudOnlyFeatures = [
	"Managed ZenML server on your VPC or hosted on our servers",
	"Social SSO, RBAC, and User Management"
];

export const modelFeatures = [
	"Model Control Plane Dashboard",
	...cloudOnlyFeatures,
	"CI/CD/CT, Artifact Control Plane and more!"
];
export const artifactFeatures = [
	"Artifact Control Plane Dashboard",
	...cloudOnlyFeatures,
	"CI/CD/CT, Model Control Plane and more!"
];

type CTASectionProps = {
	image: {
		src: string;
		alt: string;
	};
	features: string[];
	feature: "model" | "artifact";
};
export function CTASection({ features, image, feature }: CTASectionProps) {
	return (
		<Box className="relative overflow-hidden px-7 py-5">
			<div className="max-w-[450px] space-y-4">
				<p className="text-display-xs font-semibold">
					Access Advanced {feature === "artifact" ? "Artifact" : "Model"} Management Features with
					ZenML Pro
				</p>
				<ul className="space-y-2">
					{features.map((item, i) => (
						<li key={i} className="text-text-md text-theme-text-secondary">
							{item}
						</li>
					))}
				</ul>
				<div className="flex flex-wrap items-center gap-2">
					<a
						href="https://cloud.zenml.io/signup"
						target="_blank"
						rel="noopener noreferrer"
						className={buttonVariants({ intent: "primary", size: "md" })}
					>
						Upgrade to ZenML Pro
					</a>
					<a
						href="https://www.zenml.io/cloud"
						target="_blank"
						rel="noopener noreferrer"
						className={buttonVariants({ intent: "primary", size: "md", emphasis: "minimal" })}
					>
						Learn more
					</a>
				</div>
			</div>
			<img
				className="absolute right-0 top-0 hidden translate-x-[45%] translate-y-[10%] rounded-md border border-theme-border-moderate lg:block"
				src={image.src}
				alt={image.alt}
			/>
		</Box>
	);
}
