import { NestedCollapsible } from "@/components/NestedCollapsible";
import { stackQueries } from "@/data/stacks";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@zenml-io/react-component-library";

type Props = {
	stackId: string;
};

export function StackLabels({ stackId }: Props) {
	const stack = useQuery({ ...stackQueries.stackDetail(stackId) });

	if (stack.isError) return null;
	if (stack.isPending)
		return (
			<section className="px-5">
				<Skeleton className="h-[150px] w-full" />
			</section>
		);

	const labels = stack.data.metadata?.labels;

	if (!labels || Object.keys(labels).length === 0) return null;

	return (
		<section className="px-5">
			<NestedCollapsible intent="primary" isInitialOpen title="Labels" data={labels} />
		</section>
	);
}
