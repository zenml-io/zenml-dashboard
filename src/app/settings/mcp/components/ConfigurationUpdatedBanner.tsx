import CheckCircle from "@/assets/icons/check-circle.svg?react";
import Close from "@/assets/icons/close.svg?react";

type ConfigurationUpdatedBannerProps = {
	onDismiss: () => void;
};

export function ConfigurationUpdatedBanner({ onDismiss }: ConfigurationUpdatedBannerProps) {
	return (
		<div className="flex w-full items-center justify-between gap-2 rounded-md border border-success-300 bg-success-50 px-4 py-3 text-success-900">
			<div className="flex items-center gap-2">
				<CheckCircle className="size-5 shrink-0 fill-current" />
				<p className="font-semibold">Your configuration has been updated</p>
				<p className="text-text-sm">
					Configuration links and code snippets now include your API key.
				</p>
			</div>

			<button type="button" onClick={onDismiss} aria-label="Dismiss notification">
				<Close className="size-5 fill-current" />
			</button>
		</div>
	);
}
