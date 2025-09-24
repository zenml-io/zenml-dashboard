import { routes } from "@/router/routes";
import { cn, Tag } from "@zenml-io/react-component-library";
import { ComponentPropsWithoutRef } from "react";
import { Link } from "react-router-dom";
import PipelineIcon from "@/assets/icons/pipeline.svg?react";

type Props = ComponentPropsWithoutRef<typeof Tag> & {
	iconClassname?: string;
	pipelineId: string;
	pipelineName: string;
};
export function PipelineLink({ pipelineId, pipelineName, iconClassname, ...props }: Props) {
	return (
		<Link to={routes.projects.pipelines.detail.runs(pipelineId)}>
			<Tag
				color="purple"
				className="inline-flex items-center gap-0.5 text-primary-400"
				rounded={false}
				emphasis="subtle"
				{...props}
			>
				<PipelineIcon className={cn("mr-1 h-4 w-4 fill-primary-400", iconClassname)} />
				{pipelineName}
			</Tag>
		</Link>
	);
}
