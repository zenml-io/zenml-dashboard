import { useState } from "react";
import { Button } from "@zenml-io/react-component-library/components/server";
import {
	Collapsible,
	CollapsibleTrigger,
	CollapsibleContent
} from "@zenml-io/react-component-library/components/client";
import LinkExternal from "@/assets/icons/link-external.svg?react";
import ChevronDown from "@/assets/icons/chevron-down.svg?react";
import { InfoBox } from "@/components/Infobox";
import { Codesnippet } from "@/components/CodeSnippet";
import type { InstallationMethod } from "../types";
import { Markdown } from "@/components/Markdown";

type InstallationMethodCardProps = {
	method: InstallationMethod;
	onOpenLink: (url: string) => void;
};

export function InstallationMethodCard({ method, onOpenLink }: InstallationMethodCardProps) {
	const [isOpen, setIsOpen] = useState(method.type === "automatic" || method.type === "mcpb");
	const linkButtonLabel = method.type === "automatic" ? "Install via Link" : "Open Link";

	return (
		<Collapsible open={isOpen} onOpenChange={setIsOpen}>
			<div className="rounded-md border border-theme-border-moderate">
				<CollapsibleTrigger className="flex w-full items-center justify-between p-4 hover:bg-theme-surface-secondary">
					<h4 className="text-text-sm font-semibold">{method.title}</h4>
					<ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
				</CollapsibleTrigger>
				<CollapsibleContent>
					<div className="space-y-4 border-t border-theme-border-moderate p-4">
						{method.description && (
							<p className="text-text-sm text-theme-text-secondary">{method.description}</p>
						)}

						{method.hasDeepLink && method.deepLinkUrl && (
							<Button
								intent="primary"
								size="md"
								emphasis="bold"
								aria-label={`${linkButtonLabel} (opens in new window)`}
								onClick={() => onOpenLink(method.deepLinkUrl!)}
								className="flex items-center gap-2"
							>
								<LinkExternal className="h-4 w-4 fill-current" />
								{linkButtonLabel}
							</Button>
						)}

						{method.steps.length > 0 && (
							<div className="space-y-2">
								<h5 className="text-text-sm font-medium">Installation Steps:</h5>
								<div className="space-y-2 text-text-sm">
									{method.steps.map((step, index) => (
										<div key={index} className="flex items-start gap-2">
											<span className="rounded-full flex h-5 w-5 shrink-0 items-center justify-center bg-theme-surface-secondary text-text-xs font-medium">
												{index + 1}
											</span>
											<Markdown markdown={step} className="text-theme-text-secondary" />
										</div>
									))}
								</div>
							</div>
						)}

						{method.config && (
							<div className="space-y-2">
								<h5 className="text-text-sm font-medium">Configuration:</h5>
								<Codesnippet
									code={method.config}
									highlightCode={true}
									language="json"
									wrap={true}
									fullWidth={true}
								/>
							</div>
						)}

						{method.bashCommand && (
							<div className="space-y-2">
								<h5 className="text-text-sm font-medium">Command:</h5>
								<Codesnippet
									code={method.bashCommand}
									highlightCode={true}
									language="bash"
									wrap={true}
									fullWidth={true}
								/>
							</div>
						)}

						{method.note && (
							<InfoBox intent="primary">
								<p className="text-text-sm">{method.note}</p>
							</InfoBox>
						)}
					</div>
				</CollapsibleContent>
			</div>
		</Collapsible>
	);
}
