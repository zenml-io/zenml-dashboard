import { Codesnippet } from "@/components/CodeSnippet";
import { CollapsibleCard } from "@/components/CollapsibleCard";
import { useStepDetail } from "@/data/steps/step-detail-query";
import { Skeleton } from "@zenml-io/react-component-library";

type Props = {
	stepId: string;
};

export function CodeTab({ stepId }: Props) {
	const { data, isPending, isError } = useStepDetail({ stepId });

	if (isError) return null;

	if (isPending) return <Skeleton className="h-[300px] w-full" />;

	return (
		<CollapsibleCard initialOpen title="Code">
			<Codesnippet fullWidth highlightCode wrap code={data?.metadata?.source_code || ""} />
		</CollapsibleCard>
	);
}
