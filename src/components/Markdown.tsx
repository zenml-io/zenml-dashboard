import ReactMarkdown from "react-markdown";
import type { Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import { sanitizeUrl } from "@/lib/url";

type Props = {
	className?: string;
	markdown: string;
};

export function Markdown({ className, markdown }: Props) {
	const components: Components = {
		a({ href, node: _node, children, target, rel, ...props }) {
			const sanitized = href ? sanitizeUrl(href) : undefined;
			const safeHref = sanitized && sanitized.startsWith("unsafe:") ? undefined : sanitized;
			const anchorTarget = target ?? "_blank";
			const anchorRel = rel ?? "noopener noreferrer";
			return (
				<a {...props} href={safeHref} target={anchorTarget} rel={anchorRel}>
					{children}
				</a>
			);
		},
		img({ src, alt, node: _node, ...props }) {
			const sanitized = src ? sanitizeUrl(src) : undefined;
			if (!sanitized || sanitized.startsWith("unsafe:")) return null;
			return <img {...props} src={sanitized} alt={alt ?? ""} />;
		}
	};

	return (
		<ReactMarkdown className={className} remarkPlugins={[remarkGfm]} components={components}>
			{markdown}
		</ReactMarkdown>
	);
}
