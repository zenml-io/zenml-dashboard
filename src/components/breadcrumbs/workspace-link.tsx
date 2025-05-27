import { useServerInfo } from "@/data/server/info-query";
import { routes } from "@/router/routes";
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger
} from "@zenml-io/react-component-library/components/client";

import { Button, Skeleton } from "@zenml-io/react-component-library/components/server";
import { Link } from "react-router-dom";

export function WorkspaceLink() {
	const server = useServerInfo();

	if (server.isPending) return <Skeleton className="h-6 w-[100px] shrink-0" />;
	if (server.isError) throw server.error;

	const serverName = server.data.name || server.data.id;

	return (
		<div className="flex items-center gap-0.5">
			<TooltipProvider>
				<Tooltip>
					<TooltipTrigger asChild>
						<Button intent="secondary" className="p-0.5" emphasis="minimal" asChild>
							<Link to={routes.projects.overview}>
								<div className="flex max-w-[150px] items-center gap-1 md:max-w-[200px]">
									<Avatar type="square" size="sm">
										<AvatarImage
											src={`https://avatar.vercel.sh/${encodeURIComponent(serverName ?? "")}?size=24`}
										/>
										<AvatarFallback size="sm">{serverName?.[0]}</AvatarFallback>
									</Avatar>
									<p className="truncate text-text-md font-medium">{serverName}</p>
								</div>
							</Link>
						</Button>
					</TooltipTrigger>
					<TooltipContent sideOffset={4}>Workspace</TooltipContent>
				</Tooltip>
			</TooltipProvider>
		</div>
	);
}
