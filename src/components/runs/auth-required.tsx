import Triange from "@/assets/icons/alert-triangle.svg?react";
import {
	Tag,
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger
} from "@zenml-io/react-component-library";

export function AuthRequired() {
	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger>
					<Tag
						color="yellow"
						className="flex items-center gap-0.5"
						rounded={false}
						emphasis="subtle"
					>
						<Triange className="h-4 w-4 shrink-0 fill-current" />
						Login Required
					</Tag>
				</TooltipTrigger>
				<TooltipContent>
					<p>
						You must be logged in for this link to work.
						<br />
						Please ensure you're signed in before accessing.
					</p>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
}
