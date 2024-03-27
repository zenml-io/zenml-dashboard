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
import { Link, LinkProps } from "react-router-dom";
import Home from "@/assets/icons/home.svg?react";

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
								<SidebarLink icon={<Home />} label="Home" to={"/"} />
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
};

function SidebarLink({ className, icon, label, ...rest }: SidebarLinkProps) {
	const isActive = true;
	// TODO add check for active sidebar link
	return (
		<SidebarItem isActive={isActive}>
			<Link {...rest} className={cn(className)}>
				<SidebarItemContent isActive={isActive} icon={icon} label={label} />
			</Link>
		</SidebarItem>
	);
}
