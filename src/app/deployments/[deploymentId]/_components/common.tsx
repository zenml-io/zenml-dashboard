import AlertCircle from "@/assets/icons/alert-circle.svg?react";
import { EmptyState } from "@/components/EmptyState";

type Props = {
	title: string;
	subtitle?: string;
};

export function AlertEmptyState({ title, subtitle }: Props) {
	return (
		<EmptyState
			className="p-5"
			icon={<AlertCircle className="h-[60px] w-[60px] fill-neutral-300" />}
		>
			<div className="text-center">
				<p className="text-text-lg font-semibold">{title}</p>
				{subtitle && <p className="text-text-md text-theme-text-secondary">{subtitle}</p>}
			</div>
		</EmptyState>
	);
}
