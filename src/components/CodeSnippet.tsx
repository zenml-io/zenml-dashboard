import { useState } from "react";
import { cn } from "@zenml-io/react-component-library";
import Copy from "@/assets/icons/copy.svg?react";
import { CodeHighlighter } from "./CodeHighlighter";

type DisplayCodeProps = {
	code: string;
	wrap?: boolean;
	fullWidth?: boolean;
	highlightCode?: boolean;
	className?: string;
	codeClasses?: string;
	language?: string;
};

export function Codesnippet({
	code,
	wrap = false,
	fullWidth = false,
	highlightCode = false,
	className,
	codeClasses,
	language = "python"
}: DisplayCodeProps) {
	const [copied, setCopied] = useState(false);

	async function copyToClipboard(text: string) {
		try {
			await navigator.clipboard.writeText(text);
			setCopied(true);
			setTimeout(() => {
				setCopied(false);
			}, 2000);
		} catch (error) {
			console.error("Failed to copy:", error);
		}
	}

	return (
		<div
			className={cn(
				`flex ${
					fullWidth ? "w-full" : "max-w-fit"
				} justify-between gap-4 rounded-md border border-theme-border-moderate bg-theme-surface-tertiary px-4 py-3`,
				className
			)}
		>
			<pre
				className={cn(
					`${
						wrap ? "" : "whitespace-nowrap"
					} overflow-auto text-left font-mono text-theme-text-primary`,
					codeClasses
				)}
			>
				{highlightCode ? <CodeHighlighter language={language} code={code} /> : <code>{code}</code>}
			</pre>
			<button onClick={() => copyToClipboard(code)}>
				{copied ? <p>Copied!</p> : <Copy className="fill-neutral-500" width={24} height={24} />}
			</button>
		</div>
	);
}
