import File from "@/assets/icons/file.svg?react";
import { EmptyState } from "@/components/EmptyState";

type Props = {
	err: Error;
};

export function StepError({ err }: Props) {
	return (
		<EmptyState icon={<File className="h-[120px] w-[120px] fill-neutral-300" />}>
			<div className="text-center">
				<p className="text-text-lg text-theme-text-secondary">{err.message}</p>
			</div>
		</EmptyState>
	);
}
