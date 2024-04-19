import { EmptyState } from "../../EmptyState";
import { MetadataMap } from "@/types/common";
import { ErrorFallback } from "../../Error";
import { useStepDetail } from "@/data/steps/step-detail-query";
import { Skeleton } from "@zenml-io/react-component-library";
import { MetadataCards, UncategorizedCard } from "@/components/MetadataCards";
import { Icon } from "@/components/Icon";

type Props = {
	stepId: string;
};

export function StepMetadataTab({ stepId }: Props) {
	const { data, isPending, isError, error } = useStepDetail({
		stepId: stepId
	});

	if (isPending) {
		return (
			<div className="flex flex-col gap-5">
				<Skeleton className="h-9 w-full" />
				<Skeleton className="h-9 w-full" />
			</div>
		);
	}

	if (isError) return <ErrorFallback err={error} />;

	if (!data.metadata?.run_metadata || Object.keys(data.metadata.run_metadata).length === 0) {
		return (
			<EmptyState icon={<Icon name="file" className="h-[120px] w-[120px] fill-neutral-300" />}>
				<div className="text-center">
					<p className="mb-2 text-display-xs font-semibold">No metadata found</p>
					<p className="text-text-lg text-theme-text-secondary">
						There are no metadata available for this step.
					</p>
				</div>
			</EmptyState>
		);
	}

	return (
		<div className="flex flex-col gap-5">
			<UncategorizedCard metadata={data.metadata.run_metadata as MetadataMap} />
			<MetadataCards metadata={data.metadata.run_metadata as MetadataMap} />
		</div>
	);
}
