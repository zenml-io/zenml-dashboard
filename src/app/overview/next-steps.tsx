import { ReactNode } from "react";
import Stack from "@/assets/icons/stack.svg?react";
import Calendar from "@/assets/icons/calendar.svg?react";
import Slack from "@/assets/icons/services/slack.svg?react";
import { cn } from "@zenml-io/react-component-library/utilities";
import { routes } from "@/router/routes";
import { Link } from "react-router-dom";

export function NextSteps() {
	return (
		<section className="space-y-5">
			<h2 className="text-text-xl font-semibold">Your next steps with ZenML Pro</h2>
			<ul className="grid grid-cols-1 gap-3 md:grid-cols-3">
				<LinkItem
					href={routes.stacks.create.index}
					icon={<Stack className="size-5 shrink-0 fill-primary-400" />}
					backgroundColor="bg-primary-25"
					title="Add your stack"
					description="Connect cloud infrastructure and ML tools to your workspace."
				/>
				<LinkItem
					href="https://zenml.io/slack"
					icon={<Slack className="size-5 shrink-0" />}
					backgroundColor="bg-neutral-100"
					title="Join our Community"
					description="Join our Slack community with thousands of members like you."
				/>
				<LinkItem
					href="https://zenml.io/book-your-demo"
					icon={<Calendar className="size-5 shrink-0 fill-success-400" />}
					backgroundColor="bg-success-50"
					title="Try ZenML Pro"
					description="Book a demo and discover advanced features with our managed solution."
				/>
			</ul>
		</section>
	);
}

type LinkItemProps = {
	href: string;
	icon: ReactNode;
	backgroundColor: string;
	title: ReactNode;
	description: ReactNode;
};
function LinkItem({ href, icon, backgroundColor, title, description }: LinkItemProps) {
	const isExternalLink = href.startsWith("http://") || href.startsWith("https://");

	const linkContent = (
		<>
			<div
				className={cn(
					"flex aspect-square size-8 items-center justify-center rounded-md",
					backgroundColor
				)}
			>
				{icon}
			</div>
			<div className="space-y-0.5">
				<h3 className="text-text-lg font-semibold">{title}</h3>
				<p className="text-text-sm text-theme-text-secondary">{description}</p>
			</div>
		</>
	);

	const commonClassName =
		"space-y-5 rounded-md border border-theme-border-moderate bg-theme-surface-primary p-5 transition-shadow duration-200 hover:shadow-sm";

	if (isExternalLink) {
		return (
			<a className={commonClassName} href={href} target="_blank" rel="noopener noreferrer">
				{linkContent}
			</a>
		);
	}

	return (
		<Link className={commonClassName} to={href}>
			{linkContent}
		</Link>
	);
}
