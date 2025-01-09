import Copy from "@/assets/icons/copy.svg?react";
import { Codesnippet } from "@/components/CodeSnippet";
import { InfoBox } from "@/components/Infobox";
import { Tick } from "@/components/Tick";
import { Button } from "@zenml-io/react-component-library/components/server";
import { useState } from "react";

type Props = {
	value: string;
};

export function ApiKeySuccess({ value }: Props) {
	return (
		<div className="space-y-3 overflow-x-hidden px-7 py-5 text-text-md text-theme-text-primary">
			<div className="space-y-0.5">
				<p className="text-text-md font-semibold text-theme-text-primary">
					Here is your new API Key
				</p>
				<p className="text-text-md text-theme-text-secondary">Your key was created successfully</p>
			</div>
			<Hintbox />
			<CopyKeySection value={value} />
			<div className="h-[1px] bg-theme-border-moderate" aria-hidden="true"></div>
			<div className="space-y-3 pt-5">
				<div className="flex items-center gap-1">
					<p className="text-text-md font-semibold text-theme-text-primary">Using your API Key</p>
					<a
						target="_blank"
						rel="noreferrer noopener"
						href="https://docs.zenml.io/how-to/project-setup-and-management/connecting-to-zenml/connect-with-a-service-account"
						className="link text-text-sm text-primary-400"
					>
						Learn More
					</a>
				</div>
				<p className="text-theme-text-secondary">
					To log in to the ZenML server using the generated key, you can run the following CLI
					command and enter the API key when prompted:
				</p>
				<Codesnippet highlightCode wrap code={`zenml login --api-key ${window.location.origin}`} />
				<p className="text-theme-text-secondary">
					Alternatively, you can set the following environment variables to configure workloads
					where CLI interaction is not possible:
				</p>
				<Codesnippet
					highlightCode
					wrap
					code={`ZENML_STORE_URL: ${window.location.origin}
ZENML_STORE_API_KEY: ${value}`}
				/>
			</div>
		</div>
	);
}

function CopyKeySection({ value }: { value: string }) {
	const [copied, setCopied] = useState(false);
	function copyToClipboard(text: string) {
		if (navigator.clipboard) {
			navigator.clipboard.writeText(text);
			setCopied(true);
			setTimeout(() => {
				setCopied(false);
			}, 2000);
		}
	}

	return (
		<section className="flex w-full items-center justify-between gap-5 overflow-hidden py-5 text-text-md">
			<code className="w-[3/4] min-w-0 flex-1 overflow-x-auto font-sans text-display-xs">
				{value}
			</code>

			{copied ? (
				<>
					<Tick className="h-5 w-5 shrink-0 fill-theme-text-tertiary" />
					<p className="sr-only">copied successfully</p>
				</>
			) : (
				<Button
					intent="secondary"
					emphasis="subtle"
					onClick={() => copyToClipboard(value)}
					size="md"
				>
					<Copy className="h-4 w-4 shrink-0 fill-theme-text-primary" />
					<p>Copy</p>
				</Button>
			)}
		</section>
	);
}

function Hintbox() {
	return (
		<InfoBox>
			Important: This key is your authentication for API access and will not be shown again. Please
			copy it and store it securely.
		</InfoBox>
	);
}
