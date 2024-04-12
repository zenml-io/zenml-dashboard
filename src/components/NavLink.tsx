import { NavLink as NavLinkPrimitive, NavLinkProps } from "react-router-dom";

export default function NavLink({ children, ...rest }: NavLinkProps) {
	return (
		<NavLinkPrimitive
			className={({ isActive }) =>
				` ${isActive ? "bg-primary-50 text-theme-text-brand" : "hover:bg-neutral-200"} block rounded-md px-4 py-1 text-text-sm font-semibold `
			}
			{...rest}
		>
			{children}
		</NavLinkPrimitive>
	);
}
