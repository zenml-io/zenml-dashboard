import FileText from "@/assets/icons/file-text.svg?react";
import File from "@/assets/icons/file.svg?react";
import Mail from "@/assets/icons/mail.svg?react";
import Chat from "@/assets/icons/message-chat-square.svg?react";
import Package from "@/assets/icons/package.svg?react";
import Terminal from "@/assets/icons/terminal.svg?react";
import { Button } from "@zenml-io/react-component-library";

export function SupportCard() {
	const links = [
		{
			text: "Send us a message",
			href: "mailto:cloud@zenml.io",
			icon: <Mail className="h-5 w-5 fill-neutral-500" />
		},

		{
			text: "Join our Slack Community",
			href: "https://zenml.io/slack",
			icon: <Chat className="h-5 w-5 fill-neutral-500" />
		}
	];

	return (
		<div className="space-y-1">
			<p className="text-text-lg font-semibold">Support</p>
			<ul className="space-y-1">
				{links.map((link, i) => (
					<li key={i}>
						<Button
							size="md"
							className="w-fit px-2 text-theme-text-secondary"
							intent="secondary"
							emphasis="minimal"
							asChild
						>
							<a target="_blank" rel="noopener noreferrer" className="flex gap-1" href={link.href}>
								{link.icon}
								<div>{link.text}</div>
							</a>
						</Button>
					</li>
				))}
			</ul>
		</div>
	);
}
export function ResourcesCard() {
	const links = [
		{
			text: "Browse our docs",
			href: "https://docs.zenml.io",
			icon: <FileText className="h-5 w-5 fill-neutral-500" />
		},
		{
			text: "Discover projects",
			href: "https://github.com/zenml-io/zenml-projects",
			icon: <Package className="h-5 w-5 fill-neutral-500" />
		},
		{
			text: "Navigate our examples",
			href: "https://github.com/zenml-io/zenml/tree/main/examples/",
			icon: <Terminal className="h-5 w-5 fill-neutral-500" />
		},
		{
			text: "Read our blog",
			href: "https://zenml.io/blog",
			icon: <File className="h-5 w-5 fill-neutral-500" />
		}
	];

	return (
		<div className="space-y-1">
			<p className="mb-0.5 text-text-lg font-semibold">Resources</p>

			<ul className="space-y-1">
				{links.map((link, i) => (
					<li key={i}>
						<Button
							size="md"
							className="w-fit px-2 text-theme-text-secondary"
							intent="secondary"
							emphasis="minimal"
							asChild
						>
							<a rel="noopener noreferrer" target="_blank" className="flex gap-1" href={link.href}>
								{link.icon}
								<div>{link.text}</div>
							</a>
						</Button>
					</li>
				))}
			</ul>
		</div>
	);
}
