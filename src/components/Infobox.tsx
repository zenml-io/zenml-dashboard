import Info from "@/assets/icons/info.svg?react";
import { cn } from "@zenml-io/react-component-library";
import { VariantProps, cva } from "class-variance-authority";
import { HTMLAttributes, PropsWithChildren } from "react";

const infoBoxVariants = cva("flex items-center text-text-sm rounded-md border px-4 py-3", {
	variants: {
		intent: {
			primary: "border-primary-400 bg-primary-25",
			neutral: "border-theme-border-moderate"
		}
	},
	defaultVariants: {
		intent: "primary"
	}
});
type Props = HTMLAttributes<HTMLDivElement> & VariantProps<typeof infoBoxVariants>;

export function InfoBox({ children, className, intent, ...rest }: PropsWithChildren<Props>) {
	return (
		<div {...rest} className={cn(infoBoxVariants({ intent }), className)}>
			<Info className="mr-4 h-5 w-5 shrink-0 fill-theme-text-brand" />
			<div className="w-full min-w-0">{children}</div>
		</div>
	);
}
