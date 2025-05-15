"use client";

import { Dialog, DialogContent } from "@zenml-io/react-component-library/components/client";
import { Button } from "@zenml-io/react-component-library";
import { Spinner } from "@zenml-io/react-component-library/components/server";
import TickCircle from "@/assets/icons/tick-circle.svg?react";
import Connectivity from "@/assets/illustrations/connectivity.webp";
import { ResourcesModel } from "@/types/service-connectors";

type Props = {
	open: boolean;
	isLoading: boolean;
	isError?: boolean;
	onClose?: () => void;
	onSuccess?: () => void;
	data?: ResourcesModel;
};

export function LoadingDialog({ open, isLoading, isError, onClose, onSuccess, data }: Props) {
	const hasError = !!data?.error;
	const error = data?.error ?? undefined;
	return (
		<Dialog open={open}>
			<DialogContent
				onPointerDownOutside={(e) => (isLoading ? e.preventDefault() : onClose?.())}
				onEscapeKeyDown={(e) => (isLoading ? e.preventDefault() : onClose?.())}
				className="max-w-[540px] p-8"
			>
				<div className="flex w-full flex-col items-center justify-center space-y-5">
					{isLoading && !data && <LoadingState onClose={onClose} />}
					{!isLoading && !isError && !hasError && <SuccessState onSuccess={onSuccess} />}
					{!isLoading && (isError || hasError) && <ErrorState error={error} onClose={onClose} />}
				</div>
			</DialogContent>
		</Dialog>
	);
}

function LoadingState({ onClose }: { onClose?: () => void }) {
	return (
		<>
			<Spinner />
			<div className="space-y-2 text-center">
				<p className="text-display-xs font-semibold">Verifying your service connector</p>
				<p className="text-text-lg text-theme-text-secondary">
					Please wait while we check your connection <br />
					This may take up to a minute.
				</p>
			</div>
			<Button size="md" emphasis="subtle" onClick={onClose} intent="secondary" className="mt-4">
				Cancel
			</Button>
		</>
	);
}

function SuccessState({ onSuccess }: { onSuccess?: () => void }) {
	return (
		<>
			<TickCircle width={180} height={180} className="fill-theme-text-success" />
			<div className="space-y-2 text-center">
				<p className="text-display-xs font-semibold">Connection verified successfully!</p>
				<p className="text-text-lg text-theme-text-secondary">
					Ready to show your available resources
				</p>
			</div>
			<Button size="md" onClick={onSuccess} className="mt-4">
				Display Resources
			</Button>
		</>
	);
}

function ErrorState({ onClose, error }: { onClose?: () => void; error?: string }) {
	return (
		<>
			<img src={Connectivity} alt="Connectivity" width={180} height={180} />
			<div className="space-y-2 text-center">
				<p className="text-display-xs font-semibold">We couldn't verify your connection</p>
				{error && (
					<p className="max-h-[250px] overflow-auto rounded-md border border-theme-border-moderate bg-theme-surface-secondary p-1 text-left font-mono">
						{error}
					</p>
				)}
				<p className="text-text-lg text-theme-text-secondary">
					Please try again to list your resources
				</p>
			</div>
			<Button size="md" emphasis="subtle" onClick={onClose} intent="secondary" className="mt-4">
				Close
			</Button>
		</>
	);
}
