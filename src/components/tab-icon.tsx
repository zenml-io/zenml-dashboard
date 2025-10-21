import { cn } from "@zenml-io/react-component-library/utilities";
import { ComponentProps, ComponentType } from "react";

type TabIconProps = {
	icon: ComponentType<ComponentProps<"svg">>;
	className?: string;
};

export function TabIcon({ icon: Icon, className = "" }: TabIconProps) {
	return (
		<Icon
			className={cn(
				`size-5 shrink-0 fill-theme-text-tertiary group-data-[state=active]/trigger:fill-theme-surface-strong ${className}`
			)}
		/>
	);
}
