import HorizontalDots from "@/assets/icons/dots-horizontal.svg?react";
import Settings from "@/assets/icons/settings.svg?react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger
} from "@zenml-io/react-component-library";
import { routes } from "@/router/routes";
import { Button } from "@zenml-io/react-component-library/components/server";
import { Link } from "react-router-dom";
import { DefaultProjectHandler } from "./set-default-project";

type Props = {
	projectId: string;
};
export function ProjectMenu({ projectId }: Props) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					className="z-20 flex aspect-square size-6 shrink-0 items-center justify-center bg-white p-0"
					intent="secondary"
					emphasis="bold"
					size="sm"
				>
					<HorizontalDots className="h-5 w-5 fill-theme-text-secondary" />
				</Button>
			</DropdownMenuTrigger>

			<DropdownMenuContent className="z-10" align="end" sideOffset={1}>
				<DropdownMenuItem asChild icon={<Settings />}>
					<Link
						className="hover:cursor-pointer"
						to={routes.projects.settings.repositories.overview}
					>
						Project Settings
					</Link>
				</DropdownMenuItem>
				<div aria-hidden="true" className="my-1 h-[1px] bg-theme-border-moderate"></div>
				<DefaultProjectHandler projectId={projectId} />
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
