import RunIcon from "@/assets/icons/terminal-square.svg?react";
import { routes } from "@/router/routes";
import { ExecutionStatus } from "@/types/pipeline-runs";
import { Tag } from "@zenml-io/react-component-library/components/server";
import { Link } from "react-router-dom";
import { getExecutionStatusTagColor } from "../ExecutionStatus";

type Props = {
	runId: string;
	status?: ExecutionStatus;
};

export function RunStatusTag({ runId, status }: Props) {
	return (
		<Link to={routes.projects.runs.detail(runId)}>
			<Tag
				emphasis="subtle"
				rounded={false}
				className="inline-flex items-center gap-0.5"
				color={getExecutionStatusTagColor(status)}
			>
				<RunIcon className={`h-3 w-3 fill-current`} />
				{runId.split("-")[0]}
			</Tag>
		</Link>
	);
}
