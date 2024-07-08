import Info from "@/assets/icons/info.svg?react";
import AlertTriangle from "@/assets/icons/alert-triangle.svg?react";
import { cn } from "@zenml-io/react-component-library";
import { VariantProps, cva } from "class-variance-authority";
import { HTMLAttributes, PropsWithChildren } from "react";

const infoBoxVariants = cva("flex items-center text-text-sm rounded-md border px-4 py-3", {
	variants: {
		intent: {
			primary: "border-primary-400 bg-primary-25",
			warning: "bg-[#FFF6EA] border-theme-border-moderate",
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
			<PrimitiveIcon intent={intent} />
			<div className="w-full min-w-0">{children}</div>
		</div>
	);
}

function PrimitiveIcon({ intent }: Pick<Props, "intent">) {
	switch (intent) {
		case "warning":
			return <AlertTriangle className="mr-4 h-5 w-5 shrink-0 fill-warning-700" />;

		default:
			return <Info className="mr-4 h-5 w-5 shrink-0 fill-theme-text-brand" />;
	}
}
