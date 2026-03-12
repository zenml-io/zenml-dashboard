import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger
} from "@zenml-io/react-component-library";
import { Button } from "@zenml-io/react-component-library/components/server";
import { cn } from "@zenml-io/react-component-library/utilities";
import { ComponentProps, FormHTMLAttributes, HTMLAttributes, ReactNode } from "react";

type DivProps = HTMLAttributes<HTMLDivElement>;
type FormProps = FormHTMLAttributes<HTMLFormElement>;

function Root({ className, children, ...props }: DivProps) {
	return (
		<div className={cn("flex items-end gap-2 bg-theme-surface-secondary", className)} {...props}>
			{children}
		</div>
	);
}

function SourceSwitcher({ className, children, ...props }: DivProps) {
	return (
		<div className={cn("shrink-0", className)} {...props}>
			{children}
		</div>
	);
}

function Content({ className, children, ...props }: DivProps) {
	return (
		<div
			className={cn("flex w-full flex-wrap items-center justify-between gap-2", className)}
			{...props}
		>
			{children}
		</div>
	);
}

function Left({ className, children, ...props }: DivProps) {
	return (
		<div className={cn("flex items-center gap-2", className)} {...props}>
			{children}
		</div>
	);
}

function Right({ className, children, ...props }: DivProps) {
	return (
		<div className={cn("flex items-center gap-2", className)} {...props}>
			{children}
		</div>
	);
}

function Search({ className, children, ...props }: FormProps) {
	return (
		<form className={cn("contents", className)} {...props}>
			{children}
		</form>
	);
}

function MatchControls({ className, children, ...props }: DivProps) {
	return (
		<div className={cn("flex items-center gap-0.5", className)} {...props}>
			{children}
		</div>
	);
}

function Filters({ className, children, ...props }: DivProps) {
	return (
		<div className={cn("flex items-center gap-2", className)} {...props}>
			{children}
		</div>
	);
}

function Actions({ className, children, ...props }: DivProps) {
	return (
		<TooltipProvider>
			<div className={cn("flex items-center gap-2", className)} {...props}>
				{children}
			</div>
		</TooltipProvider>
	);
}

type IconButtonProps = ComponentProps<typeof Button> & {
	tooltip: ReactNode;
};

function IconButton({ className, children, tooltip, ...props }: IconButtonProps) {
	return (
		<Tooltip delayDuration={200}>
			<TooltipTrigger asChild>
				<Button
					size="md"
					emphasis="subtle"
					intent="secondary"
					className={cn(
						"flex aspect-square items-center justify-center bg-theme-surface-primary p-0",
						className
					)}
					{...props}
				>
					{children}
				</Button>
			</TooltipTrigger>
			<TooltipContent>{tooltip}</TooltipContent>
		</Tooltip>
	);
}

export const LogViewerToolbar = {
	Root,
	SourceSwitcher,
	Content,
	Left,
	Right,
	Search,
	MatchControls,
	Filters,
	Actions,
	IconButton
};
