import { Button, Tag } from "@zenml-io/react-component-library/components/server";
import { ReactNode } from "react";

const templates: TemplateItemProps[] = [
	{
		title: "ZenCoder",
		description: "Your own MLOps Engineer",
		href: "https://github.com/zenml-io/zenml-projects/tree/main/zencoder",
		tag: "LLM",
		image: {
			src: "https://public-flavor-logos.s3.eu-central-1.amazonaws.com/projects/1.jpg",
			alt: "ZenCoder"
		}
	},
	{
		title: "Night Watch",
		description: "AI Database Summaries While You Sleep",
		href: "https://github.com/zenml-io/zenml-projects/tree/main/nightwatch-ai",
		tag: "Text Summarization",
		image: {
			src: "https://public-flavor-logos.s3.eu-central-1.amazonaws.com/projects/2.jpg",
			alt: "Night Watch"
		}
	},
	{
		title: "Magic Photobooth",
		description:
			"A personalized AI image generation product that can create your avatars from a selfie.",
		href: "https://github.com/zenml-io/zenml-projects/tree/main/magic-photobooth",
		tag: "Image Generation",
		image: {
			src: "https://public-flavor-logos.s3.eu-central-1.amazonaws.com/projects/3.jpg",
			alt: "Magic Photobooth"
		}
	},
	{
		title: "GameSense",
		description: "The LLM That Understands Gamers",
		href: "https://github.com/zenml-io/zenml-projects/tree/main/gamesense",
		tag: "LLM",
		image: {
			src: "https://public-flavor-logos.s3.eu-central-1.amazonaws.com/projects/4.jpg",
			alt: "GameSense"
		}
	}
];

export function Templates() {
	return (
		<section className="space-y-5">
			<div className="flex items-center justify-between">
				<h2 className="text-text-lg font-semibold">Start with a project template</h2>
				<Button className="bg-theme-surface-primary" intent="secondary" emphasis="subtle" asChild>
					<a target="_blank" rel="noreferrer noopener" href="https://docs.zenml.io/user-guides">
						See more
					</a>
				</Button>
			</div>
			<ul className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4">
				{templates.map((template, idx) => (
					<li key={idx}>
						<TemplateItem {...template} />
					</li>
				))}
			</ul>
		</section>
	);
}

type TemplateItemProps = {
	title: ReactNode;
	description: ReactNode;
	href: string;
	tag: string;
	image: {
		src: string;
		alt: string;
	};
};
function TemplateItem({ title, description, href, tag, image }: TemplateItemProps) {
	return (
		<a
			href={href}
			target="_blank"
			rel="noreferrer noopener"
			className="block overflow-hidden rounded-md border border-theme-border-moderate transition-shadow duration-200 hover:shadow-sm"
		>
			<img className="h-[110px] w-full object-cover" src={image.src} alt={image.alt} />
			<div className="flex h-[150px] flex-col justify-between bg-theme-surface-primary p-3">
				<div>
					<p className="text-text-lg font-semibold">{title}</p>
					<p className="text-text-sm text-theme-text-secondary">{description}</p>
				</div>
				<Tag emphasis="subtle" rounded={false} size="xs" className="w-fit" color="purple">
					{tag}
				</Tag>
			</div>
		</a>
	);
}
