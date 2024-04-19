import { EmptyState } from "@/components/EmptyState";
import { Icon } from "./Icon";

type Props = {
	isAlertCircle?: boolean;
	err: Error;
};

export function ErrorFallback({ err, isAlertCircle = false }: Props) {
	return (
		<EmptyState
			icon={
				isAlertCircle ? (
					<Icon name="alert-circle" className="h-[120px] w-[120px] fill-neutral-300" />
				) : (
					<Icon name="file" className="h-[120px] w-[120px] fill-neutral-300" />
				)
			}
		>
			<div className="text-center">
				<p className="text-text-lg text-theme-text-secondary">{err.message}</p>
			</div>
		</EmptyState>
	);
}
