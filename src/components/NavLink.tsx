import { NavLink as NavLinkPrimitive, NavLinkProps, useLocation } from "react-router-dom";

interface CustomNavLinkProps extends NavLinkProps {
	isActiveOverride?: (pathname: string) => boolean;
}

export default function NavLink({ children, isActiveOverride, ...rest }: CustomNavLinkProps) {
	const location = useLocation();
	const isActive = isActiveOverride ? isActiveOverride(location.pathname) : false;

	return (
		<NavLinkPrimitive
			{...rest}
			className={({ isActive: defaultIsActive }) =>
				` ${
					isActive || defaultIsActive
						? "bg-primary-50 text-theme-text-brand"
						: "hover:bg-neutral-200"
				} block rounded-md px-4 py-1 text-text-sm font-semibold `
			}
		>
			{children}
		</NavLinkPrimitive>
	);
}
