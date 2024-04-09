import { LinkProps, useLocation } from "react-router-dom";
import { AnchorHTMLAttributes } from "react";
import { Link } from "react-router-dom";

type NavLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & LinkProps;

export default function NavLink({ children, ...rest }: NavLinkProps) {
	const { pathname } = useLocation();
	const isActive = pathname.includes(rest.to);
	return (
		<Link
			className={` ${isActive ? "bg-primary-50 text-theme-text-brand" : "hover:bg-neutral-200"} block rounded-md px-4 py-1 text-text-sm font-semibold `}
			{...rest}
		>
			{children}
		</Link>
	);
}
