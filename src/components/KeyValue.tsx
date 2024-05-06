// import { ReactNode } from "react";

import { cn } from "@zenml-io/react-component-library";
import { HTMLAttributes, ReactNode } from "react";

type Props = HTMLAttributes<HTMLDivElement>;
export function Key({ children, className, ...rest }: Props) {
	return (
		<dt
			{...rest}
			className={cn(
				"col-span-1 flex min-w-0 items-center truncate text-theme-text-secondary",
				className
			)}
		>
			{children}
		</dt>
	);
}

export function Value({ children, className, ...rest }: Props) {
	return (
		<dd
			{...rest}
			className={cn(
				"col-span-2 flex h-6 w-full min-w-0 items-center truncate text-neutral-700",
				className
			)}
		>
			{children}
		</dd>
	);
}

type KeyValueProps = {
	label: ReactNode;
	value: ReactNode;
};
export function KeyValue({ label, value }: KeyValueProps) {
	return (
		<>
			<Key>{label}</Key>
			<Value>{value}</Value>
		</>
	);
}
