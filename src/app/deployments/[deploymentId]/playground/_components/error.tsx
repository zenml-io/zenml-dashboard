import Rocket from "@/assets/icons/rocket.svg?react";
import { EmptyState } from "@/components/EmptyState";

type Props = {
	error: unknown;
};

export function PlaygroundError({ error }: Props) {
	if (error instanceof Error) {
		return <PlaygroundEmptyState title="An error occurred" subtitle={error.message} />;
	}
	return null;
}

export function PlaygroundEmptyState({ subtitle, title }: { title?: string; subtitle: string }) {
	return (
		<EmptyState icon={<Rocket className="h-[120px] w-[120px] fill-neutral-300" />}>
			<div className="text-center">
				{title && <div className="mb-2 text-display-xs font-semibold">{title}</div>}
				<p className="text-lg text-theme-text-secondary">{subtitle}</p>
			</div>
		</EmptyState>
	);
}
