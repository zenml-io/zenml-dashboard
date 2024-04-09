import Pipeline from "@/assets/icons/pipeline.svg?react";
import { PageHeader } from "@/components/PageHeader";
type Props = {
	namespace: string;
};

export function Header({ namespace }: Props) {
	return (
		<PageHeader>
			<div className="flex items-center gap-1">
				<Pipeline className={`h-5 w-5 fill-neutral-400`} />
				<h1 className="text-display-xs font-semibold">{decodeURIComponent(namespace)}</h1>
			</div>
		</PageHeader>
	);
}
