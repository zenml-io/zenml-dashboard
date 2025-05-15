import Plus from "@/assets/icons/plus.svg?react";
import { Button, buttonVariants } from "@zenml-io/react-component-library/components/server";
import {
	cn,
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger
} from "@zenml-io/react-component-library";

export function ProjectsSearchBar() {
	return (
		<div className="flex flex-wrap items-center justify-end gap-2">
			<TooltipProvider>
				<Tooltip>
					<TooltipTrigger className="z-10">
						<div
							className={cn(buttonVariants({ size: "md" }), "pointer-events-none bg-primary-50")}
						>
							<Plus width={24} height={24} className="shrink-0 fill-white" />
							New Project
						</div>
					</TooltipTrigger>
					<TooltipContent
						side="bottom"
						align="end"
						className="max-w-[320px] space-y-4 border border-theme-border-moderate bg-theme-surface-primary p-5 text-text-md text-theme-text-primary"
					>
						<div className="space-y-0.5">
							<p>Upgrade to create Projects</p>
							<p className="text-text-sm text-theme-text-secondary">
								Get access to additional projects and workspaces, manage users and permissions, and
								get advanced features with ZenML Pro
							</p>
						</div>
						<Button asChild>
							<a
								target="_blank"
								className="block w-fit"
								rel="noopener noreferrer"
								href="https://cloud.zenml.io/signup"
							>
								Try ZenML Pro
							</a>
						</Button>
					</TooltipContent>
				</Tooltip>
			</TooltipProvider>
		</div>
	);
}
