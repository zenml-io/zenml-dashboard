import { cn } from "@zenml-io/react-component-library/utilities";
import { HTMLAttributes } from "react";

export function UpgradeSteps() {
	return (
		<div className="space-y-5">
			<div className="space-y-1">
				<h2 className="text-display-xs font-semibold">As easy as following the steps</h2>
				<p className="text-theme-text-secondary">From sign-up to deployment in minutes</p>
			</div>

			<List />
		</div>
	);
}

const content = [
	"Fill out your details",
	"Receive comprehensive ZenML Pro documentation",
	"Deploy ZenML Pro and upgrade your tenant",
	"Get a free 14-day trial license"
];

function List() {
	return (
		<ol className="space-y-3">
			{content.map((val, idx) => (
				<li className="flex items-center space-x-1" key={idx}>
					<Number>{idx + 1}</Number>
					<span>{val}</span>
				</li>
			))}
		</ol>
	);
}

function Number({ className, ...rest }: HTMLAttributes<HTMLDivElement>) {
	return (
		<div
			{...rest}
			className={cn(
				"flex h-4 w-4 shrink-0 items-center justify-center rounded-rounded bg-warning-400 text-text-xs text-theme-text-negative"
			)}
		></div>
	);
}
