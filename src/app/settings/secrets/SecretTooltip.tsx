import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger
} from "@zenml-io/react-component-library";
import { Codesnippet } from "@/components/CodeSnippet";
import Info from "@/assets/icons/info.svg?react";

export function SecretTooltip({ code }: { code: string }) {
	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger>
					<Info className="h-4 w-4 shrink-0 fill-theme-text-tertiary" />
				</TooltipTrigger>
				<TooltipContent className="z-50 flex max-w-[480px] flex-col gap-2 bg-theme-surface-primary p-5 text-text-sm text-theme-text-primary">
					<p className="text-md text-theme-text-primary">
						To use your secret in a step, you can use the following code:
					</p>
					<Codesnippet highlightCode wrap codeClasses="break-words" code={code} />
					<a
						className="link w-fit text-primary-400"
						target="_blank"
						href="https://docs.zenml.io/how-to/interact-with-secrets#accessing-registered-secrets"
					>
						Learn More
					</a>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
}
