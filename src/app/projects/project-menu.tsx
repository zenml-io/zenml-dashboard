import Settings from "@/assets/icons/settings.svg?react";
import { DropdownTriggerButton } from "@/components/dropdown-trigger-button";
import { routes } from "@/router/routes";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger
} from "@zenml-io/react-component-library";
import { Link } from "react-router-dom";
import { DefaultProjectHandler } from "./set-default-project";

type Props = {
	projectId: string;
};
export function ProjectMenu({ projectId }: Props) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<DropdownTriggerButton className="z-20 bg-white">
					<span className="sr-only">Open project actions</span>
				</DropdownTriggerButton>
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
