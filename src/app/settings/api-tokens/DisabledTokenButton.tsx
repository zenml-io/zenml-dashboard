import {
	cn,
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger
} from "@zenml-io/react-component-library";
import { ButtonProps, buttonVariants } from "@zenml-io/react-component-library/components/server";

type Props = {
	size: ButtonProps["size"];
};

export function DisabledTokenButton({ size }: Props) {
	return (
		<div className="flex flex-wrap items-center justify-end gap-2">
			<TooltipProvider>
				<Tooltip>
					<TooltipTrigger className="z-10">
						<div className={cn(buttonVariants({ size }), "pointer-events-none bg-primary-50")}>
							Create new token
						</div>
					</TooltipTrigger>
					<TooltipContent>API-Tokens are not available for local deployments</TooltipContent>
				</Tooltip>
			</TooltipProvider>
		</div>
	);
}
