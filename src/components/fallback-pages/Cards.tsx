import { Box } from "@zenml-io/react-component-library";
import { ReactNode } from "react";
import ZenMLLogo from "@/assets/icons/zenml-icon.svg?react";
import Slack from "@/assets/icons/services/slack.svg?react";
import Mail from "@/assets/icons/mail.svg?react";
import FileQuestion from "@/assets/icons/file-question.svg?react";
import FileText from "@/assets/icons/file-text.svg?react";
import File from "@/assets/icons/file.svg?react";
import Terminal from "@/assets/icons/terminal.svg?react";
import Package from "@/assets/icons/package.svg?react";

export function FallbackSupportCard() {
	const links: CardLinkProps[] = [
		{
			text: "Connect with Slack",
			href: "https://zenml.io/slack",
			icon: <Slack className="h-5 w-5" />
		},
		{
			text: "Send us a message",
			href: "mailto:cloud@zenml.io",
			icon: <Mail className="h-5 w-5 fill-primary-600" />
		}
	];

	return (
		<Box className="flex w-full flex-col overflow-hidden">
			<div className={`flex h-[120px] items-center justify-center bg-primary-50 `}>
				<ZenMLLogo className="h-[60px] w-[60px]" />
			</div>
			<div className="p-5">
				<p className="mb-0.5 text-text-lg font-semibold">Need support?</p>
				<p className="mb-2 text-theme-text-secondary">
					Schedule a call with us, connect with our Slack community or send us a message.
				</p>
				<ul className="space-y-1">
					{links.map((link, i) => (
						<li key={i}>
							<CardLink href={link.href} text={link.text} icon={link.icon} />
						</li>
					))}
				</ul>
			</div>
		</Box>
	);
}

export function ResourcesCard() {
	const links: CardLinkProps[] = [
		{
			text: "Browse our docs",
			href: "https://docs.zenml.io",
			icon: <FileText className="h-5 w-5 fill-primary-600" />
		},
		{
			text: "Discover projects",
			href: "https://github.com/zenml-io/zenml-projects",
			icon: <Package className="h-5 w-5 fill-primary-600" />
		},
		{
			text: "Navigate our examples",
			href: "https://github.com/zenml-io/zenml/tree/main/examples/",
			icon: <Terminal className="h-5 w-5 fill-primary-600" />
		},
		{
			text: "Read our blog",
			href: "https://zenml.io/blog",
			icon: <File className="h-5 w-5 fill-primary-600" />
		}
	];

	return (
		<Box className="flex w-full flex-col overflow-hidden">
			<div className={`flex h-[120px] items-center justify-center bg-turquoise-25`}>
				<FileQuestion className="h-[60px] w-[60px] fill-teal-400" />
			</div>
			<div className="p-5">
				<p className="mb-0.5 text-text-lg font-semibold">Resources</p>
				<p className="mb-2 text-theme-text-secondary">
					Need help? Follow our extensive documentation to get started.
				</p>
				<ul className="space-y-1">
					{links.map((link, i) => (
						<li key={i}>
							<CardLink href={link.href} text={link.text} icon={link.icon} />
						</li>
					))}
				</ul>
			</div>
		</Box>
	);
}

type CardLinkProps = {
	href: string;
	text: ReactNode;
	icon?: ReactNode;
};
function CardLink({ href, text, icon }: CardLinkProps) {
	return (
		<a
			className="inline-flex items-center gap-1 font-semibold text-primary-600 underline transition-all duration-200 hover:decoration-transparent"
			target="_blank"
			href={href}
			rel="noopener noreferrer"
		>
			{icon && icon}
			{text}
		</a>
	);
}
