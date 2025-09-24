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
export function PipelineLink({
	pipelineId,
	pipelineName,
	iconClassname,
	className,
	...props
}: Props) {
	return (
		<Link to={routes.projects.pipelines.detail.runs(pipelineId)}>
			<Tag
				color="purple"
				className={cn("inline-flex items-center gap-0.5 text-primary-400", className)}
				rounded={false}
				emphasis="subtle"
				{...props}
			>
				<PipelineIcon className={cn("size-4 shrink-0 fill-primary-400", iconClassname)} />
				<div className="truncate">{pipelineName}</div>
			</Tag>
		</Link>
	);
}
