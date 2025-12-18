import AlertCircle from "@/assets/icons/alert-circle.svg?react";
import AlertTriangle from "@/assets/icons/alert-triangle.svg?react";
import Info from "@/assets/icons/info.svg?react";
import { cn } from "@zenml-io/react-component-library";
import { VariantProps, cva } from "class-variance-authority";
import { HTMLAttributes, PropsWithChildren, ReactNode } from "react";

const infoBoxVariants = cva("flex items-center text-text-sm rounded-md border px-4 py-3", {
	variants: {
		intent: {
			primary: "border-primary-400 bg-primary-25",
			warning: "border-warning-300 text-warning-900 bg-warning-50",
			neutral: "border-theme-border-moderate",
			error: "bg-error-50 border-error-300"
		}
	},
	defaultVariants: {
		intent: "primary"
	}
});
type Props = HTMLAttributes<HTMLDivElement> &
	VariantProps<typeof infoBoxVariants> & {
		button?: ReactNode;
	};

export function InfoBox({
	children,
	className,
	intent,
	button,
	...rest
}: PropsWithChildren<Props>) {
	return (
		<div {...rest} className={cn(infoBoxVariants({ intent }), className)}>
			<PrimitiveIcon intent={intent} />
			<div className="w-full min-w-0">{children}</div>
			{button && <div className="ml-auto">{button}</div>}
		</div>
	);
}

function PrimitiveIcon({ intent }: Pick<Props, "intent">) {
	switch (intent) {
		case "warning":
			return <AlertTriangle className="mr-4 h-5 w-5 shrink-0 fill-warning-700" />;
		case "error":
			return <AlertCircle className="mr-4 h-5 w-5 shrink-0 fill-error-700" />;
		default:
			return <Info className="mr-4 h-5 w-5 shrink-0 fill-theme-text-brand" />;
	}
}
