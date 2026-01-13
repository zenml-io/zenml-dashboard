import { CopyButton } from "@/components/CopyButton";
import { PageHeader } from "@/components/PageHeader";
import { stackQueries } from "@/data/stacks";
import { useQuery } from "@tanstack/react-query";
import { Avatar, AvatarFallback, Skeleton } from "@zenml-io/react-component-library";
import { useParams } from "react-router-dom";

export function StackHeader() {
	const { stackId } = useParams() as { stackId: string };

	const stack = useQuery({
		...stackQueries.stackDetail(stackId)
	});

	if (stack.isPending) {
		return (
			<PageHeader>
				<div className="flex items-center gap-3">
					<Skeleton className="size-7 shrink-0 rounded-md" />
					<div className="space-y-0.5">
						<Skeleton className="h-4 w-[100px]" />
						<Skeleton className="h-6 w-[150px]" />
					</div>
				</div>
			</PageHeader>
		);
	}

	if (stack.isError) {
		return null;
	}

	const { name, id } = stack.data;

	return (
		<PageHeader>
			<div className="group/copybutton flex items-center gap-3">
				<Avatar type="square" size="lg" className="shrink-0">
					<AvatarFallback size="lg">{name[0] ?? "S"}</AvatarFallback>
				</Avatar>
				<div className="space-y-0.5 overflow-hidden">
					<div className="flex items-center gap-1">
						<p className="truncate text-text-sm text-theme-text-secondary">{id}</p>
						<CopyButton copyText={id} />
					</div>
					<h1 className="truncate text-display-xs font-semibold">
						<span className="truncate">{name}</span>
					</h1>
				</div>
			</div>
		</PageHeader>
	);
}
