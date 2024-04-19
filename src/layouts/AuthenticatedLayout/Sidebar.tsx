import { Icon } from "@/components/Icon";
import { routes } from "@/router/routes";
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
	Button,
	SidebarBody,
	SidebarHeader,
	SidebarHeaderImage,
	SidebarItem,
	SidebarItemContent,
	SidebarList,
	Sidebar as ZenMLSidebar,
	cn,
	useSidebarContext
} from "@zenml-io/react-component-library";
import { ReactNode } from "react";
import { Link, LinkProps, matchPath, useLocation } from "react-router-dom";
import { SidebarTitle } from "./Title";

export function Sidebar() {
	const { setIsOpen, isOpen } = useSidebarContext();
	return (
		<div>
			<ZenMLSidebar className="sticky top-9 h-[calc(100vh_-_64px)] overflow-y-auto overflow-x-clip">
				<div className="flex w-full flex-1 flex-col gap-0.5 self-start">
					<SidebarHeader
						icon={
							<Button
								onClick={() => setIsOpen((prev) => !prev)}
								intent="secondary"
								className="flex h-6 w-6 items-center justify-center bg-transparent p-0"
							>
								<Icon
									name="side-collapse"
									className={`h-5 w-5 fill-neutral-500 transition-transform duration-100 ${!isOpen && "rotate-180"}`}
								/>
							</Button>
						}
					>
						<SidebarHeaderImage>
							<Avatar size="md" type="square">
								<AvatarImage src="https://avatar.vercel.sh/default?size=24" />
								<AvatarFallback size="md">D</AvatarFallback>
							</Avatar>
						</SidebarHeaderImage>
						<SidebarTitle />
					</SidebarHeader>
					<SidebarBody>
						<SidebarList>
							<li className="w-full">
								<SidebarLink
									routePatterns={[routes.home]}
									exact
									icon={<Icon name="cloud-tenant" />}
									label="Overview"
									to={"/"}
								/>
							</li>
							<li className="w-full">
								<SidebarLink
									routePatterns={[
										routes.pipelines.overview,
										routes.pipelines.namespace(":namespace"),
										routes.runs.detail(":runId")
									]}
									icon={<Icon name="pipeline" />}
									label="Pipelines"
									to={"/pipelines"}
								/>
							</li>
							<li className="w-full">
								<SidebarLink
									routePatterns={[routes.models.overview]}
									icon={<Icon name="chip" />}
									label="Models"
									to={routes.models.overview}
								/>
							</li>
							<li className="w-full">
								<SidebarLink
									routePatterns={[routes.artifacts.overview]}
									icon={<Icon name="file" />}
									label="Artifacts"
									to={routes.artifacts.overview}
								/>
							</li>
							<li className="w-full">
								<SidebarLink
									routePatterns={[routes.stacks.overview]}
									icon={<Icon name="stack" />}
									label="Stacks"
									to={"/stacks"}
								/>
							</li>
						</SidebarList>
						<div className="mt-auto">
							<SidebarLink
								icon={<Icon name="settings" />}
								label="Settings"
								routePatterns={[
									routes.settings.profile,
									routes.settings.members,
									routes.settings.connectors.overview,
									routes.settings.repositories.overview,
									routes.settings.secrets.overview
								]}
								to={routes.settings.members}
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
