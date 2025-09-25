import PipelineIcon from "@/assets/icons/pipeline.svg?react";
import { routes } from "@/router/routes";
import { Tag } from "@zenml-io/react-component-library";
import { Link } from "react-router-dom";
type Props = {
	pipelineId: string;
	pipelineName: string;
};

export function PipelineTag({ pipelineId, pipelineName }: Props) {
	return (
		<Link to={routes.projects.pipelines.detail.runs(pipelineId)}>
			<Tag
				size="xs"
				color="purple"
				className="inline-flex items-center gap-0.5 text-primary-400"
				rounded={false}
				emphasis="minimal"
			>
				<PipelineIcon className="size-3 shrink-0 fill-primary-400" />
				{pipelineName}
			</Tag>
		</Link>
	);
}
