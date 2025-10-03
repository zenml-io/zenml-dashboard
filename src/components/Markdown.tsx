import ReactMarkdown from "react-markdown";
import type { Components, Options } from "react-markdown";
import remarkGfm from "remark-gfm";
import { sanitizeUrl } from "@/lib/url";

type MarkdownProps = Omit<
	Options,
	"children" | "remarkPlugins" | "rehypePlugins" | "components"
> & {
	children?: string | null;
	className?: string;
	components?: Components;
};

export default function Markdown({ children, className, components, ...rest }: MarkdownProps) {
	const defaultComponents: Components = {
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

	const mergedComponents: Components = { ...defaultComponents, ...components };

	return (
		<ReactMarkdown
			className={className}
			remarkPlugins={[remarkGfm]}
			components={mergedComponents}
			{...rest}
		>
			{children ?? ""}
		</ReactMarkdown>
	);
}
