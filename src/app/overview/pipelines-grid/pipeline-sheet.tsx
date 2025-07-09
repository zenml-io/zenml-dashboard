"use client";
import { Codesnippet } from "@/components/CodeSnippet";
import { SheetHeader } from "@/components/sheet/SheetHeader";
import { Tick } from "@/components/Tick";
import CopyIcon from "@/assets/icons/copy.svg?react";
import CheckCircle from "@/assets/icons/check-circle.svg?react";
import Download from "@/assets/icons/download-01.svg?react";
import {
	Box,
	Button,
	DialogTitle,
	ProgressOutstanding,
	Sheet,
	SheetContent,
	SheetTrigger
} from "@zenml-io/react-component-library";
import { PropsWithChildren } from "react";
import { useCopy } from "@/lib/copy";
import { HelpBox } from "@/components/fallback-pages/Helpbox";

type Props = {
	pipelineContent: string | undefined;
	open: boolean;
	onOpenChange: (isOpen: boolean) => void;
	isDone: boolean;
	name: string;
};

export function GithubPipelineSheet({
	children,
	onOpenChange,
	pipelineContent,
	open,
	name
}: PropsWithChildren<Props>) {
	return (
		<Sheet open={open} onOpenChange={onOpenChange}>
			<SheetTrigger className="w-full">{children}</SheetTrigger>
			<SheetContent aria-describedby={undefined} className="w-[1000px] overflow-y-auto">
				<SheetHeader />
				<SecondaryHeader pipelineContent={pipelineContent} isDone={false} name={name} />
				<div className="p-5">
					<Box className="space-y-5 p-5">
						<div className="space-y-1">
							<p className="text-text-sm text-theme-text-secondary">
								Create a{" "}
								<code className="rounded-sm bg-primary-25 px-[4px] py-[2px] text-theme-text-brand">
									{name}.py
								</code>{" "}
								file that defines your workflow using our Python SDK:
							</p>
							<Codesnippet
								className="w-full max-w-full"
								code={pipelineContent || ""}
								highlightCode
							/>
						</div>
						<div>
							<p className="mb-1 text-text-sm text-theme-text-secondary">Run the pipeline.</p>
							<Codesnippet code={`python ${name}.py`} />
						</div>
						<HelpBox link="https://docs.zenml.io/user-guides/starter-guide/create-an-ml-pipeline" />
					</Box>
				</div>
			</SheetContent>
		</Sheet>
	);
}

type SecondaryHeaderProps = Pick<Props, "isDone" | "name" | "pipelineContent">;
function SecondaryHeader({ isDone, name, pipelineContent }: SecondaryHeaderProps) {
	const { copied, copyToClipboard } = useCopy();

	function handleDownload() {
		if (!pipelineContent) return;
		const blob = new Blob([pipelineContent], { type: "text/x-python" });
		const url = URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = `${name}.py`;
		a.click();
	}

	return (
		<section className="flex items-center justify-between border-b border-theme-border-moderate bg-theme-surface-primary p-5">
			<div className="flex items-center gap-3">
				{isDone ? <Tick /> : <ProgressOutstanding />}
				<DialogTitle className="text-display-xs font-semibold">{name}</DialogTitle>
			</div>
			{pipelineContent && (
				<div className="flex items-center">
					<Button
						intent="secondary"
						emphasis="minimal"
						onClick={handleDownload}
						className="flex aspect-square size-7 shrink-0 items-center justify-center p-0"
					>
						<Download className="size-5 shrink-0 fill-theme-text-secondary" />
						<span className="sr-only">Download Pipeline</span>
					</Button>
					<Button
						intent="secondary"
						emphasis="minimal"
						className="flex aspect-square size-7 shrink-0 items-center justify-center p-0"
						onClick={() => copyToClipboard(pipelineContent)}
					>
						{copied ? (
							<>
								<span className="sr-only">Copied</span>
								<CheckCircle className="size-5 shrink-0 fill-theme-text-secondary" />
							</>
						) : (
							<>
								<span className="sr-only">Copy Pipeline</span>
								<CopyIcon className="size-5 shrink-0 fill-theme-text-secondary" />
							</>
						)}
					</Button>
				</div>
			)}
		</section>
	);
}
