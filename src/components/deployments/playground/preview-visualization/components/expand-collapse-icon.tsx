import ExpandLines from "@/assets/icons/expand_lines.svg?react";
import CollapseLines from "@/assets/icons/collapse_lines.svg?react";
import { cn } from "@zenml-io/react-component-library/utilities";

type Props = {
	className?: string;
	expanded: boolean;
};

export function ExpandCollapseLineIcon({ expanded, className }: Props) {
	const classNames = cn("size-3 shrink-0", className);
	return expanded ? (
		<CollapseLines className={classNames} />
	) : (
		<ExpandLines className={classNames} />
	);
}
