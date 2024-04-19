import { Icon } from "@/components/Icon";
import { PageHeader } from "@/components/PageHeader";
type Props = {
	namespace: string;
};

export function Header({ namespace }: Props) {
	return (
		<PageHeader>
			<div className="flex items-center gap-1">
				<Icon name="pipeline" className={`h-5 w-5 fill-neutral-400`} />
				<h1 className="text-display-xs font-semibold">{decodeURIComponent(namespace)}</h1>
			</div>
		</PageHeader>
	);
}
