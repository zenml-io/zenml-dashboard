import { stackQueries } from "@/data/stacks";
import { stackComponentTypes } from "@/lib/constants";
import { useQuery } from "@tanstack/react-query";
import { Spinner } from "@zenml-io/react-component-library";
import { useParams } from "react-router-dom";
import { transformStackToFormData } from "./transform-component-data";
import { UpdateForm } from "./update-form";

export default function StackEditPage() {
	const { stackId } = useParams() as { stackId: string };
	const stack = useQuery({
		...stackQueries.stackDetail(stackId)
	});

	if (stack.isPending) {
		return (
			<div className="flex h-full items-center justify-center p-5">
				<Spinner />
			</div>
		);
	}

	if (stack.isError) {
		return (
			<div className="flex h-full items-center justify-center p-5">
				<p className="text-theme-text-error">Failed to load stack data</p>
			</div>
		);
	}

	const formData = transformStackToFormData(stack.data, stackComponentTypes);
	if (!formData) {
		return (
			<div className="flex h-full items-center justify-center p-5">
				<p className="text-theme-text-error">Stack is missing required components</p>
			</div>
		);
	}

	return <UpdateForm stackId={stackId} stack={stack.data} initialFormData={formData} />;
}
