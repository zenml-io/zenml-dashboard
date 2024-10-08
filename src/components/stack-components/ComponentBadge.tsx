import { StackComponentType } from "@/types/components";
import { Tag } from "@zenml-io/react-component-library";
import { ComponentIcon } from "@/components/ComponentIcon";
import { ReactNode } from "react";

type Props = {
	type: StackComponentType;
	children?: ReactNode;
};
export function ComponentBadge({ type, children }: Props) {
	return (
		<Tag
			rounded={false}
			className="inline-flex shrink items-center gap-0.5 overflow-x-hidden text-text-sm"
			color="purple"
			emphasis="minimal"
		>
			<ComponentIcon type={type} className="h-4 w-4 shrink-0 fill-current" />
			<div className="truncate">{children}</div>
		</Tag>
	);
}
