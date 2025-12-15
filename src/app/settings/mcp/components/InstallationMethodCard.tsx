import LinkExternal from "@/assets/icons/link-external.svg?react";
import { Codesnippet } from "@/components/CodeSnippet";
import { CollapsibleCard } from "@/components/CollapsibleCard";
import { InfoBox } from "@/components/Infobox";
import { Markdown } from "@/components/Markdown";
import { Button } from "@zenml-io/react-component-library";
import { isSafeDeepLinkUrl } from "../lib/deep-link-validation";
import type { InstallationMethod } from "../types";

type InstallationMethodCardProps = {
	method: InstallationMethod;
};

export function InstallationMethodCard({ method }: InstallationMethodCardProps) {
	const isInitialOpen = method.type === "automatic" || method.type === "mcpb";
	const linkButtonLabel = method.type === "automatic" ? "Install via Link" : "Open Link";
	const showDeepLink =
		method.hasDeepLink && method.deepLinkUrl && isSafeDeepLinkUrl(method.deepLinkUrl);

	return (
		<CollapsibleCard initialOpen={isInitialOpen} title={method.title}>
			<div className="space-y-4">
				{method.description && (
					<p className="text-text-sm text-theme-text-secondary">{method.description}</p>
				)}

				{showDeepLink && (
					<Button asChild size="md" emphasis="bold" intent="primary" className="inline-flex">
						<a href={method.deepLinkUrl} target="_blank" rel="noopener noreferrer">
							<LinkExternal className="h-4 w-4 fill-current" />
							{linkButtonLabel}
						</a>
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
		</CollapsibleCard>
	);
}
