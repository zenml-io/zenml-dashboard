import { type SVGProps } from "react";
// Configure this path in your tsconfig.json
import { type IconName } from "~/icon-name";
import href from "../assets/icons/sprite.svg";
import { cn } from "@zenml-io/react-component-library";

export { href };

export { IconName };

export function Icon({
	name,
	className,
	children,
	...props
}: SVGProps<SVGSVGElement> & {
	name: IconName;
}) {
	if (children) {
		return (
			<span className={`inline-flex items-center`}>
				<Icon name={name} className={className} {...props} />
				{children}
			</span>
		);
	}
	return (
		<svg {...props} className={cn("inline self-center", className)}>
			<use href={`${href}#${name}`} />
		</svg>
	);
}
