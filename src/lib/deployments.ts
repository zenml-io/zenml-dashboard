import { DeploymentStatus } from "@/types/deployments";
import { Tag } from "@zenml-io/react-component-library";
import { ComponentPropsWithoutRef } from "react";

export function getDeploymentStatusBackground(status: DeploymentStatus | undefined) {
	if (!status) return "bg-neutral-50";
	switch (status) {
		case "running":
			return "bg-success-500";
		case "error":
			return "bg-error-500";
		case "pending":
			return "bg-warning-500";
		case "unknown":
		case "absent":
			return "bg-neutral-500";
	}
}

export function getDeploymentStatusTagColor(
	status: DeploymentStatus | undefined
): ComponentPropsWithoutRef<typeof Tag>["color"] {
	if (!status) return "grey";
	switch (status) {
		case "running":
			return "green";
		case "error":
			return "red";
		case "pending":
			return "yellow";
		case "unknown":
		case "absent":
			return "grey";
	}
}
