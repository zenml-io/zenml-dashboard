import { Tag } from "@zenml-io/react-component-library/components/server";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger
} from "@zenml-io/react-component-library/components/client";
import { ExecutionStatusIcon, getExecutionStatusTagColor } from "../../ExecutionStatus";
import { ExecutionStatus } from "@/types/pipeline-runs";

type Props = {
	stepStatus: ExecutionStatus;
	isStatusUnknown: boolean;
};

export function StepStatusTooltip({ stepStatus, isStatusUnknown }: Props) {
	function BaseTag() {
		return (
			<Tag
				color={getExecutionStatusTagColor(isStatusUnknown ? "unknown" : stepStatus)}
				rounded
				emphasis="subtle"
				className="flex w-fit items-center gap-1 capitalize"
			>
				<ExecutionStatusIcon
					className="fill-current"
					status={isStatusUnknown ? "unknown" : stepStatus}
				/>
				{isStatusUnknown ? "Unknown - Last reported: " + stepStatus : stepStatus}
			</Tag>
		);
	}

	if (isStatusUnknown) {
		return (
			<TooltipProvider>
				<Tooltip>
					<TooltipTrigger className="z-10 cursor-default">
						<BaseTag />
					</TooltipTrigger>
					<TooltipContent className="text-center">
						Last reported as <b>{stepStatus}</b> but current status unknown due to pipeline failure.
						<br />
						Communication may be lost.
					</TooltipContent>
				</Tooltip>
			</TooltipProvider>
		);
	}

	return <BaseTag />;
}
