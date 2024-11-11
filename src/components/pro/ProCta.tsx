import { Badge, Button } from "@zenml-io/react-component-library/components/server";
import { cn } from "@zenml-io/react-component-library/utilities";
import Check from "@/assets/icons/check.svg?react";
import { HTMLAttributes, ImgHTMLAttributes } from "react";
import { Link } from "react-router-dom";
import { routes } from "@/router/routes";

export function ProWrapper({ className, ...rest }: HTMLAttributes<HTMLDivElement>) {
	return (
		<div
			className={cn(
				"flex items-center overflow-hidden rounded-md border border-warning-100 bg-theme-surface-primary px-7 py-5",
				className
			)}
			{...rest}
		></div>
	);
}

export function ProHeadline({ className, ...rest }: HTMLAttributes<HTMLDivElement>) {
	return <h2 className={cn("text-display-xs font-semibold", className)} {...rest}></h2>;
}

export function ProInfoBadge() {
	return (
		<div className="flex w-fit gap-2 rounded-md bg-[#FFF6EA] px-3 py-1">
			<p>Instantly access Pro features while keeping your existing setup</p>
			<Badge color="yellow" rounded size="sm" className="font-semibold uppercase">
				New
			</Badge>
		</div>
	);
}

export type FeatureListitem = {
	title: string;
	subtitle: string;
};
export function ProFeatureList({
	className,
	features,
	...rest
}: HTMLAttributes<HTMLUListElement> & { features: FeatureListitem[] }) {
	return (
		<ul {...rest} className={cn("grid grid-cols-1 gap-x-7 gap-y-5 md:grid-cols-2")}>
			{features.map((feat, idx) => (
				<li className="flex items-start gap-2" key={idx}>
					<Tick />
					<div>
						<p className="font-semibold">{feat.title}</p>
						<p className="text-text-sm text-theme-text-secondary">{feat.subtitle}</p>
					</div>
				</li>
			))}
		</ul>
	);
}

export function ProButtons() {
	return (
		<div className="flex w-fit flex-wrap gap-2">
			<Button
				asChild
				className="truncate bg-warning-600 hover:bg-warning-400 active:bg-warning-500 active:ring-warning-50"
				size="md"
			>
				<Link to={routes.upgrade}>Try Pro Features</Link>
			</Button>
			<Button asChild intent="secondary" className="w-fit truncate" emphasis="minimal" size="md">
				<a href="https://www.zenml.io/pro" target="_blank" rel="noopener noreferrer">
					Learn More
				</a>
			</Button>
		</div>
	);
}

export function ProImage({ className, ...rest }: ImgHTMLAttributes<HTMLImageElement>) {
	return (
		<img
			className={cn("w-full shrink-0 rounded-md border border-theme-border-moderate", className)}
			{...rest}
		/>
	);
}

export function Tick() {
	return (
		<div className="flex aspect-square h-5 w-5 shrink-0 items-center justify-center rounded-rounded bg-warning-400">
			<Check className="h-3 w-3 shrink-0 fill-white" />
		</div>
	);
}
