import FileText from "@/assets/icons/file-text.svg?react";
import File from "@/assets/icons/file.svg?react";
import Mail from "@/assets/icons/mail.svg?react";
import { cn } from "@zenml-io/react-component-library";
import { ReactNode } from "react";

const resources: SupportResourceItemProps[] = [
	{
		icon: <Mail className="size-5 shrink-0 fill-warning-500" />,
		backgroundColor: "bg-warning-50",
		title: "Send us a message",
		href: "mailto:cloud@zenml.io"
	},
	{
		icon: <FileText className="size-5 shrink-0 fill-blue-400" />,
		backgroundColor: "bg-blue-25",
		title: "Browse our docs",
		href: "https://docs.zenml.io"
	},
	{
		icon: <File className="size-5 shrink-0 fill-primary-400" />,
		backgroundColor: "bg-primary-25",
		title: "Read our blog",
		href: "https://zenml.io/blog"
	}
];

export function SupportResources() {
	return (
		<section className="space-y-5">
			<h2 className="text-text-lg font-semibold">Support Resources</h2>
			<ul className="grid grid-cols-2 gap-3 xl:grid-cols-3">
				{resources.map((resource, idx) => (
					<li key={idx}>
						<SupportResourceItem {...resource} />
					</li>
				))}
			</ul>
		</section>
	);
}

type SupportResourceItemProps = {
	icon: ReactNode;
	backgroundColor: string;
	title: ReactNode;
	href: string;
};
function SupportResourceItem({ icon, backgroundColor, title, href }: SupportResourceItemProps) {
	return (
		<a
			href={href}
			target="_blank"
			rel="noreferrer noopener"
			className="flex items-center gap-3 overflow-hidden rounded-md border border-theme-border-moderate bg-theme-surface-primary p-1 transition-shadow duration-200 hover:shadow-sm"
		>
			<div
				className={cn(
					"flex aspect-square size-8 items-center justify-center rounded-md",
					backgroundColor
				)}
			>
				{icon}
			</div>
			<div className="space-y-0.5">
				<span className="font-semibold">{title}</span>
			</div>
		</a>
	);
}
