import Divider from "@/assets/icons/slash-divider.svg?react";
import { generateProjectImageUrl } from "@/lib/images";
import { routes } from "@/router/routes";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger
} from "@zenml-io/react-component-library/components/client";
import { Button } from "@zenml-io/react-component-library/components/server";
import { Link, useLocation } from "react-router-dom";

export function ProjectLink() {
	const pathname = useLocation().pathname;

	const segments = pathname.split("/").filter(Boolean);

	if (segments[0] !== "projects" || segments.length <= 1) {
		return null;
	}

	return (
		<>
			<Divider className="h-4 w-4 flex-shrink-0 fill-neutral-200" />
			<div className="flex items-center gap-0.5">
				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger asChild>
							<Button intent="secondary" className="p-0.5" emphasis="minimal" asChild>
								<Link to={routes.projects.pipelines.overview}>
									<div className="flex max-w-[150px] items-center gap-1 md:max-w-[200px]">
										<img
											className="size-5 shrink-0 rounded-md object-cover"
											alt="default"
											src={generateProjectImageUrl("default")}
										/>
										<p className="truncate text-text-md font-medium">default</p>
									</div>
								</Link>
							</Button>
						</TooltipTrigger>
						<TooltipContent sideOffset={4}>Project</TooltipContent>
					</Tooltip>
				</TooltipProvider>
			</div>
		</>
	);
}
