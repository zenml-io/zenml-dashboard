import Eye from "@/assets/icons/eye.svg?react";
import EyeOff from "@/assets/icons/eye-off.svg?react";
import Copy from "@/assets/icons/copy.svg?react";
import { useCopy } from "@/lib/copy";
import { routes } from "@/router/routes";
import { Button, Input } from "@zenml-io/react-component-library/components/server";
import CheckCircle from "@/assets/icons/check-circle.svg?react";
import { useState } from "react";
import { Link } from "react-router-dom";

type TokenSectionProps = {
	token: string | null;
	onTokenChange: (token: string | null) => void;
};

export function TokenSection({ token, onTokenChange }: TokenSectionProps) {
	const [showToken, setShowToken] = useState(false);
	const { copied, copyToClipboard } = useCopy();

	const hasToken = Boolean(token);
	const placeholder = "Paste your API key here";

	const handleCopy = () => {
		if (!token) return;
		copyToClipboard(token);
	};

	const handleRemove = () => {
		onTokenChange(null);
		setShowToken(false);
	};

	return (
		<div className="space-y-4">
			<div className="space-y-1">
				<div className="flex items-center gap-2">
					<h2 className="text-text-lg font-semibold">Add an API key to authenticate MCP clients</h2>
				</div>
				<p className="text-text-sm text-theme-text-secondary">
					Paste an existing API key created from a Service Account. This key will be used in the
					client configuration snippets below.
				</p>
				<p className="-mt-2 text-text-sm text-theme-text-secondary">
					You can manage API keys on the{" "}
					<Link
						to={routes.settings.service_accounts.overview}
						className="link text-theme-text-brand"
					>
						Service Accounts
					</Link>{" "}
					settings page.
				</p>
			</div>

			<div className="flex flex-col gap-2 sm:flex-row sm:items-center">
				<div className="relative">
					<Input
						type={hasToken && !showToken ? "password" : "text"}
						value={token ?? ""}
						onChange={(e) => onTokenChange(e.target.value || null)}
						placeholder={placeholder}
						className={`w-full border-theme-border-moderate bg-theme-surface-tertiary font-mono text-text-md text-theme-text-secondary sm:w-[440px] ${
							hasToken ? "pr-24" : ""
						}`}
					/>
					{hasToken ? (
						<div className="absolute right-1 top-1/2 flex -translate-y-1/2 items-center gap-0.5">
							<Button
								intent="secondary"
								emphasis="minimal"
								onClick={() => setShowToken((prev) => !prev)}
								className="flex size-5 items-center justify-center p-0"
							>
								{showToken ? (
									<>
										<span className="sr-only">Hide token</span>
										<EyeOff width={16} height={16} className="fill-neutral-500" />
									</>
								) : (
									<>
										<span className="sr-only">Show token</span>
										<Eye width={16} height={16} className="fill-neutral-500" />
									</>
								)}
							</Button>
							<Button
								intent="secondary"
								emphasis="minimal"
								size="sm"
								onClick={handleCopy}
								className="flex size-5 items-center justify-center p-0"
								aria-describedby="token-copy-status"
							>
								{copied ? (
									<CheckCircle width={16} height={16} className="shrink-0 fill-neutral-500" />
								) : (
									<Copy width={16} height={16} className="shrink-0 fill-neutral-500" />
								)}
								<span className="sr-only">{copied ? "Copied" : "Copy"}</span>
							</Button>
						</div>
					) : null}
				</div>

				{hasToken && (
					<Button intent="danger" emphasis="subtle" size="md" onClick={handleRemove}>
						Remove
					</Button>
				)}
			</div>
		</div>
	);
}
