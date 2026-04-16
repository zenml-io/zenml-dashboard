import { UpdateButtonContent } from "@/components/buttons/update-button-content";
import { stackQueries } from "@/data/stacks";
import { routes } from "@/router/routes";
import { useQuery } from "@tanstack/react-query";
import { Avatar, AvatarFallback, Button, Skeleton } from "@zenml-io/react-component-library";
import { Link } from "react-router-dom";
import { CopyButton } from "../../CopyButton";

type Props = {
	stackId: string;
};

export function StackHeadline({ stackId }: Props) {
	const stack = useQuery({ ...stackQueries.stackDetail(stackId) });

	if (stack.isError) return null;
	if (stack.isPending)
		return (
			<div className="p-5">
				<Skeleton className="h-6 w-full" />
			</div>
		);

	return (
		<div className="flex min-w-[10rem] items-center justify-between border-b border-theme-border-moderate bg-theme-surface-primary p-5">
			<div className="flex items-center space-x-2">
				<Avatar type="square" size="lg" className="shrink-0">
					<AvatarFallback size="lg">{stack.data.name[0]}</AvatarFallback>
				</Avatar>
				<div>
					<div className="group/copybutton grid grid-cols-1 items-center gap-0.5">
						<p className="mb-0.5 truncate text-text-sm text-theme-text-secondary">
							{stack.data.id}
						</p>
						<CopyButton copyText={stack.data.id} />
					</div>

					<div className="flex items-center gap-1">
						<h2 className="text-display-xs font-semibold">{stack.data.name}</h2>
					</div>
				</div>
			</div>
			<div className="flex items-center gap-2">
				<Button asChild type="button" size="sm" intent="primary" emphasis="subtle">
					<Link to={routes.stacks.edit(stackId)}>
						<UpdateButtonContent />
					</Link>
				</Button>
			</div>
		</div>
	);
}
