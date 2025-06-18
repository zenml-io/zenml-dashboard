import Logs from "@/assets/icons/logs.svg?react";
import { EmptyState } from "@/components/EmptyState";

type Props = {
	title: string;
	subtitle: string;
};

export function EmptyStateLogs({ title, subtitle }: Props) {
	return (
		<EmptyState icon={<Logs className="h-[120px] w-[120px] fill-neutral-300" />}>
			<div className="text-center">
				<div className="mb-2 text-display-xs font-semibold">{title}</div>
				<p className="text-lg text-theme-text-secondary">{subtitle}</p>
			</div>
		</EmptyState>
	);
}
