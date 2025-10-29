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
	copyCode?: string;
	exceptionCodeLine?: number;
	exceptionTraceback?: string;
};

export function Codesnippet({
	code,
	wrap = false,
	fullWidth = false,
	highlightCode = false,
	className,
	codeClasses,
	language = "python",
	copyCode = code,
	exceptionCodeLine,
	exceptionTraceback
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
		<>
			{exceptionTraceback && (
				<div className="mt-4 whitespace-pre-wrap font-mono text-theme-text-error">
					{exceptionTraceback}
				</div>
			)}
			<div className="relative w-full">
				<div
					className={cn(
						`flex ${
							fullWidth ? "w-full" : "max-w-fit"
						} justify-between gap-4 rounded-md border border-theme-border-moderate bg-theme-surface-tertiary px-4 py-3 font-normal`,
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
						{highlightCode ? (
							<CodeHighlighter language={language} code={code} />
						) : (
							<code>{code}</code>
						)}
					</pre>
					{exceptionCodeLine && (
						<div
							className="pointer-events-none absolute left-0 h-[24px] w-full bg-red-500/30"
							style={{ top: `${24 * exceptionCodeLine + 17}px` }}
						></div>
					)}
					<button onClick={() => copyToClipboard(copyCode)}>
						{copied ? <p>Copied!</p> : <Copy className="fill-neutral-500" width={24} height={24} />}
					</button>
				</div>
			</div>
		</>
	);
}
