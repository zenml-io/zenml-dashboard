import { Stack } from "@/types/stack";
import StackIcon from "@/assets/icons/stack.svg?react";
import { Avatar, AvatarFallback } from "@zenml-io/react-component-library/components/client";
import { Box, Tag } from "@zenml-io/react-component-library/components/server";

type Props = {
	stack: Stack;
};

export function StackHeader({ stack }: Props) {
	return (
		<Box className="flex items-center justify-between px-5 py-3">
			<div className="flex items-center gap-2">
				<Avatar type="square" size="md">
					<AvatarFallback size="md">{stack.name[0]}</AvatarFallback>
				</Avatar>
				<div>
					<p className="text-text-lg">{stack.name}</p>
					<p className="text-text-sm text-theme-text-secondary">{stack.id.split("-")[0]}</p>
				</div>
			</div>
			<Tag
				rounded={false}
				className="inline-flex items-center gap-0.5"
				color="turquoise"
				emphasis="subtle"
			>
				<StackIcon className="h-4 w-4 fill-current" />
				<span>Stack</span>
			</Tag>
		</Box>
	);
}
