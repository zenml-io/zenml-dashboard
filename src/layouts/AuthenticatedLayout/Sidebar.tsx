import Chip from "@/assets/icons/chip.svg?react";
import Overview from "@/assets/icons/cloud-tenant.svg?react";
import File from "@/assets/icons/file.svg?react";
import Pipeline from "@/assets/icons/pipeline.svg?react";
import Settings from "@/assets/icons/settings.svg?react";
import SideCollapse from "@/assets/icons/side-collapse.svg?react";
import Stacks from "@/assets/icons/stack.svg?react";

import { checkIsLocalServer } from "@/lib/server";
import { routes } from "@/router/routes";
import {
	Button,
	SidebarBody,
	SidebarHeader,
	SidebarItem,
	SidebarItemContent,
	SidebarList,
	Sidebar as ZenMLSidebar,
	cn,
	useSidebarContext
} from "@zenml-io/react-component-library";
import { ReactNode } from "react";
import { Link, LinkProps, matchPath, useLocation } from "react-router-dom";
import { useServerInfo } from "../../data/server/info-query";
import { OnboardingItem } from "./OnboardingItem";
import { SidebarImage, SidebarTitle } from "./SidebarFragments";
import { WhatsNewButton } from "./WhatsNewButton";

export function Sidebar() {
	const { setIsOpen, isOpen } = useSidebarContext();
	const serverInfo = useServerInfo();
	const isLocal = checkIsLocalServer(serverInfo.data?.deployment_type || "other");
	return (
		<div>
			<ZenMLSidebar
				className={`sticky  ${isLocal ? "top-[128px] h-[calc(100vh_-_64px_-_64px)]" : "top-9 h-[calc(100vh_-_64px)]"} overflow-y-auto overflow-x-clip`}
			>
				<div className="flex w-full flex-1 flex-col gap-0.5 self-start">
					<SidebarHeader
						icon={
							<Button
								onClick={() => setIsOpen((prev) => !prev)}
								intent="secondary"
								className="flex h-6 w-6 items-center justify-center bg-transparent p-0"
							>
								<SideCollapse
									className={`h-5 w-5 fill-neutral-500 transition-transform duration-100 ${!isOpen && "rotate-180"}`}
								/>
							</Button>
						}
					>
						<SidebarImage />
						<SidebarTitle />
					</SidebarHeader>
					<SidebarBody>
						<SidebarList>
							<OnboardingItem />
							<li className="w-full">
								<SidebarLink
									routePatterns={[routes.home]}
									exact
									icon={<Overview />}
									label="Overview"
									to={"/"}
								/>
							</li>
							<li className="w-full">
								<SidebarLink
									id="pipelines-sidebar-link"
									routePatterns={[
										routes.pipelines.overview,
										routes.pipelines.namespace(":namespace"),
										routes.runs.detail(":runId")
									]}
									icon={<Pipeline />}
									label="Pipelines"
									to={"/pipelines"}
								/>
							</li>
							<li className="w-full">
								<SidebarLink
									id="models-sidebar-link"
									routePatterns={[routes.models.overview]}
									icon={<Chip />}
									label="Models"
									to={routes.models.overview}
								/>
							</li>
							<li className="w-full">
								<SidebarLink
									routePatterns={[routes.artifacts.overview]}
									icon={<File />}
									label="Artifacts"
									to={routes.artifacts.overview}
								/>
							</li>
							<li className="w-full">
								<SidebarLink
									id="stacks-sidebar-link"
									routePatterns={[
										routes.components.overview,
										routes.components.detail(":componentId"),
										routes.stacks.overview,
										routes.stacks.create.index,
										routes.stacks.create.newInfra,
										routes.stacks.create.existingInfra,
										routes.stacks.create.manual,
										routes.stacks.create.terraform
									]}
									icon={<Stacks />}
									label="Stacks"
									to={"/stacks"}
								/>
							</li>
						</SidebarList>
						<div className="mt-auto">
							<WhatsNewButton />
							<SidebarLink
								id="settings-sidebar-link"
								icon={<Settings />}
								label="Settings"
								routePatterns={[
									routes.settings.profile,
									routes.settings.members,
									routes.settings.connectors.overview,
									routes.settings.repositories.overview,
									routes.settings.secrets.overview,
									routes.settings.general
								]}
								to={routes.settings.general}
							/>
						</div>
					</SidebarBody>
				</div>
			</ZenMLSidebar>
		</div>
	);
}

type SidebarLinkProps = LinkProps & {
	label: string;
	icon: ReactNode;
	routePatterns: string[];
	exact?: boolean;
};

function SidebarLink({
	className,
	icon,
	label,
	routePatterns,
	exact = false,
	...rest
}: SidebarLinkProps) {
	const { pathname } = useLocation();

	const matches = routePatterns.map((pattern) => matchPath(pattern, pathname)).filter(Boolean);
	const isActive = exact ? location.pathname === rest.to : matches.length > 0;

	return (
		<SidebarItem isActive={isActive}>
			<Link {...rest} className={cn(className)}>
				<SidebarItemContent isActive={isActive} icon={icon} label={label} />
			</Link>
		</SidebarItem>
	);
}
