import { getDeploymentStatusBackground } from "@/lib/deployments";
import { capitalize } from "@/lib/strings";
import { DeploymentStatus } from "@/types/deployments";
import { cn } from "@zenml-io/react-component-library";
import { Tag } from "@zenml-io/react-component-library/components/server";
import { ComponentProps } from "react";

type Props = ComponentProps<typeof Tag> & {
	status: DeploymentStatus | undefined;
};

export function DeploymentStatusTag({ status, className, ...props }: Props) {
	return (
		<Tag
			size="xs"
			emphasis="subtle"
			rounded={false}
			className={cn("inline-flex items-center gap-1 text-theme-text-primary", className)}
			color="grey"
			{...props}
		>
			<div
				className={`size-1 shrink-0 rounded-rounded ${getDeploymentStatusBackground(status)}`}
			></div>
			{capitalize(status ?? "")}
		</Tag>
	);
}
