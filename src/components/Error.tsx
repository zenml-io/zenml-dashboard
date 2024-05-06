import File from "@/assets/icons/file.svg?react";
import AlertCircle from "@/assets/icons/alert-circle.svg?react";
import { EmptyState } from "@/components/EmptyState";

type Props = {
	isAlertCircle?: boolean;
	err: Error;
};

export function ErrorFallback({ err, isAlertCircle = false }: Props) {
	return (
		<EmptyState
			icon={
				isAlertCircle ? (
					<AlertCircle className="h-[120px] w-[120px] fill-neutral-300" />
				) : (
					<File className="h-[120px] w-[120px] fill-neutral-300" />
				)
			}
		>
			<div className="text-center">
				<p className="text-text-lg text-theme-text-secondary">{err.message}</p>
			</div>
		</EmptyState>
	);
}
