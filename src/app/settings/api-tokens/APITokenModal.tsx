import Clock from "@/assets/icons/clock.svg?react";
import Copy from "@/assets/icons/copy.svg?react";
import ExternalLink from "@/assets/icons/link-external.svg?react";
import { Codesnippet } from "@/components/CodeSnippet";
import { InfoBox } from "@/components/Infobox";
import { Tick } from "@/components/Tick";
import { routes } from "@/router/routes";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle
} from "@zenml-io/react-component-library/components/client";
import { Button } from "@zenml-io/react-component-library/components/server";
import { jwtDecode } from "jwt-decode";
import { useState } from "react";
import Countdown, { CountdownRendererFn } from "react-countdown";
import { ErrorBoundary } from "react-error-boundary";
import { Link } from "react-router-dom";

type Props = {
	token: string;
	open: boolean;
	setOpen(open: boolean): void;
};
export function ApiTokenModal({ token, open, setOpen }: Props) {
	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogContent className="max-w-[700px]">
				<DialogHeader>
					<DialogTitle>API Token Created Successfully</DialogTitle>
				</DialogHeader>
				<div className="space-y-3 overflow-hidden px-7 py-5">
					<Headline />
					<ExpiryInfo />
					<CopyToken token={token} />
					<ErrorBoundary fallbackRender={() => null}>
						<ExpiresIn token={token} />
					</ErrorBoundary>
					<div
						role="separator"
						aria-hidden="true"
						className="h-[1px] bg-theme-border-moderate"
					></div>
					<UsingApiToken token={token} />
					<ApiDocs />
					<div
						role="separator"
						aria-hidden="true"
						className="h-[1px] bg-theme-border-moderate"
					></div>
					<ServiceAccountLink />
				</div>
			</DialogContent>
		</Dialog>
	);
}

function Headline() {
	return (
		<section>
			<p className="font-semibold">Here is your new API Token</p>
			<p className="text-theme-text-secondary">
				This token provides temporary access to your ZenML Server
			</p>
		</section>
	);
}

function ExpiryInfo() {
	return (
		<InfoBox>
			Important: This token expires in 1 hour and cannot be retrieved later. Please, copy it now.
		</InfoBox>
	);
}

function CopyToken({ token }: { token: string }) {
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
		<section className="flex items-center gap-5 py-5">
			<code className="block overflow-x-auto whitespace-nowrap font-sans text-display-xs">
				{token}
			</code>
			{copied ? (
				<div className="flex h-7 items-center">
					<Tick className="h-5 w-5 shrink-0 fill-theme-text-tertiary" />
					<p className="sr-only">copied successfully</p>
				</div>
			) : (
				<Button
					onClick={() => copyToClipboard(token)}
					size="md"
					intent="secondary"
					className="flex items-center gap-1"
					emphasis="subtle"
				>
					<Copy className="size-4 shrink-0 fill-inherit" />
					Copy
				</Button>
			)}
		</section>
	);
}

const renderer: CountdownRendererFn = ({ days, hours, minutes, seconds, completed }) => {
	if (completed) {
		return <span className="font-semibold text-theme-text-error">Expired</span>;
	}
	const padWithZero = (num: number) => String(num).padStart(2, "0");
	// Build the display parts based on remaining time
	const parts = [];

	if (days > 0) {
		parts.push(`${days}`);
	}

	if (days > 0 || hours > 0) {
		parts.push(`${padWithZero(hours)}`);
	}

	if (days > 0 || hours > 0 || minutes > 0) {
		parts.push(`${padWithZero(minutes)}`);
	}

	parts.push(`${padWithZero(seconds)}`);

	return <span className="font-semibold">{parts.join(":")}</span>;
};
function ExpiresIn({ token }: { token: string }) {
	if (!token) return null;
	const decoded = jwtDecode(token);
	if (!decoded.exp) return null;
	return (
		<div className="flex flex-wrap items-center justify-center gap-3 rounded-sm border border-theme-border-moderate bg-theme-surface-tertiary py-1 text-center">
			<Clock className="size-5 shrink-0 fill-theme-text-secondary" />
			<div>
				Expires in:{" "}
				<Countdown
					daysInHours
					renderer={renderer}
					zeroPadTime={2}
					date={new Date(decoded.exp * 1000)}
				/>
			</div>
		</div>
	);
}

function UsingApiToken({ token }: { token: string }) {
	const myUserEndpoint = `${window.location.origin}/api/v1/current-user`;

	return (
		<section className="space-y-1">
			<div className="font-semibold">Using your API Token</div>
			<div className="space-y-2">
				<p className="text-theme-text-secondary">
					To use the API token to run queries against the Server API, you can run the following
					commands:
				</p>
				<Codesnippet code={getCurlCommand(token, myUserEndpoint)} />
				<Codesnippet code={getWgetCommand(token, myUserEndpoint)} />
			</div>
		</section>
	);
}

function ApiDocs() {
	const docsUrl = `${window.location.origin}/docs`;
	return (
		<section className="space-y-2">
			<p className="font-semibold">API Documentation</p>
			<p className="text-theme-text-secondary">
				Access our OpenAPI dashboard for comprehensive documentation on all available REST API
				endpoints:
			</p>
			<Button
				asChild
				size="md"
				intent="secondary"
				className="flex w-fit items-center gap-1"
				emphasis="subtle"
			>
				<a target="_blank" rel="noopener noreferrer" href={docsUrl}>
					<span>Open the documentation</span>
					<ExternalLink className="size-5 shrink-0 fill-inherit" />
				</a>
			</Button>
		</section>
	);
}

function ServiceAccountLink() {
	return (
		<p>
			For long-term programmatic access, consider{" "}
			<Link className="link text-theme-text-brand" to={routes.settings.service_accounts.overview}>
				setting up a service account instead.
			</Link>
		</p>
	);
}

function getCurlCommand(token: string, endpoint: string) {
	return `curl -H "Authorization: Bearer ${token}" "${encodeURI(endpoint)}"`;
}

function getWgetCommand(token: string, endpoint: string) {
	return `wget --header="Authorization: Bearer ${token}" "${encodeURI(endpoint)}"`;
}
