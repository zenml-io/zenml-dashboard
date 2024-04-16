import Overview from "@/assets/icons/cloud-tenant.svg?react";
import Pipeline from "@/assets/icons/pipeline.svg?react";
import Stacks from "@/assets/icons/stack.svg?react";
import Chip from "@/assets/icons/chip.svg?react";
import File from "@/assets/icons/file.svg?react";
import SideCollapse from "@/assets/icons/side-collapse.svg?react";
import { routes } from "@/router/routes";
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
	Button,
	SidebarBody,
	SidebarHeader,
	SidebarHeaderImage,
	SidebarHeaderTitle,
	SidebarItem,
	SidebarItemContent,
	SidebarList,
	Sidebar as ZenMLSidebar,
	cn,
	useSidebarContext
} from "@zenml-io/react-component-library";
import { ReactNode } from "react";
import { Link, LinkProps, matchPath, useLocation } from "react-router-dom";

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
								<SideCollapse
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
						<SidebarHeaderTitle>default</SidebarHeaderTitle>
					</SidebarHeader>
					<SidebarBody>
						<SidebarList>
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
									routePatterns={[routes.stacks.overview]}
									icon={<Stacks />}
									label="Stacks"
									to={"/stacks"}
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
