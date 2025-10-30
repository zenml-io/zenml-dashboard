import { cn, Tag } from "@zenml-io/react-component-library";
import StackIcon from "@/assets/icons/stack.svg?react";
import { ComponentProps } from "react";

type Props = ComponentProps<typeof Tag> & {
	stackName: string;
};

export function StackTag({ stackName, className, ...props }: Props) {
	return (
		<Tag
			className={cn("flex max-w-full items-center gap-1 text-turquoise-600", className)}
			color="turquoise"
			emphasis="subtle"
			rounded={false}
			{...props}
		>
			<StackIcon className="h-4 w-4 shrink-0 fill-current" />
			<span className="truncate">{stackName}</span>
		</Tag>
	);
}
