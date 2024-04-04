import {
	Avatar,
	AvatarFallback,
	SidebarBody,
	SidebarHeader,
	SidebarHeaderImage,
	SidebarHeaderTitle,
	SidebarItem,
	SidebarItemContent,
	SidebarList,
	Sidebar as ZenMLSidebar,
	cn
} from "@zenml-io/react-component-library";
import { ReactNode } from "react";
import { Link, LinkProps, matchPath, useLocation } from "react-router-dom";
import Home from "@/assets/icons/home.svg?react";
import Pipeline from "@/assets/icons/pipeline.svg?react";
import { routes } from "@/router/routes";

export function Sidebar() {
	return (
		<div>
			<ZenMLSidebar className="sticky top-9 h-[calc(100vh_-_64px)] overflow-y-auto overflow-x-clip">
				<div className="flex w-full flex-1 flex-col gap-0.5 self-start">
					<SidebarHeader>
						<SidebarHeaderImage>
							<Avatar size="md" type="square">
								<AvatarFallback size="md">B</AvatarFallback>
							</Avatar>
						</SidebarHeaderImage>
						<SidebarHeaderTitle>Tenant</SidebarHeaderTitle>
					</SidebarHeader>
					<SidebarBody>
						<SidebarList>
							<li className="w-full">
								<SidebarLink
									routePatterns={[routes.home]}
									exact
									icon={<Home />}
									label="Home"
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
									icon={<Pipeline />}
									label="Pipelines"
									to={"/pipelines"}
								/>
							</li>
						</SidebarList>
						{/* <div className="mt-auto">
							<div className="pt-0.5">
								<SidebarLink icon={<div></div>} label="Overview" to={"/"} />
							</div>
						</div> */}
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
