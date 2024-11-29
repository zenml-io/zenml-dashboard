import { isArray, isObject, isString } from "@/lib/type-guards";
import { isUrl } from "@/lib/url";
import { CollapsibleHeaderProps } from "@zenml-io/react-component-library";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger
} from "@zenml-io/react-component-library/components/client";
import { PropsWithChildren, ReactNode } from "react";
import { Codesnippet } from "./CodeSnippet";
import { CollapsibleCard } from "./CollapsibleCard";
import { KeyValue } from "./KeyValue";

type Props = {
	intent?: CollapsibleHeaderProps["intent"];
	data?: { [key: string]: unknown };
	title: ReactNode;
	contentClassName?: string;
	className?: string;
	isInitialOpen?: boolean;
};

export function NestedCollapsible({
	title,
	data,
	intent = "primary",
	isInitialOpen = false,
	contentClassName,
	children,
	className
}: PropsWithChildren<Props>) {
	const objects: { [key: string]: Record<string, unknown> } = {};
	const nonObjects: { [key: string]: unknown } = {};
	const arrays: { [key: string]: unknown[] } = {};
	const regex = /^<class\s+'.*'>$/;

	for (const [key, value] of Object.entries(data || {})) {
		if (isObject(value)) {
			objects[key] = value as Record<string, unknown>;
		} else if (isArray(value)) {
			arrays[key] = value;
		} else {
			nonObjects[key] = value;
		}
	}

	const values = Object.entries(nonObjects);
	values.sort((a, b) => a[0].localeCompare(b[0]));

	return (
		<CollapsibleCard
			contentClassName={contentClassName}
			className={className}
			initialOpen={isInitialOpen}
			intent={intent}
			title={title}
		>
			{Object.keys(data || {}).length === 0 ? (
				<p>Not available</p>
			) : (
				<div className="flex flex-col gap-3">
					<dl className="grid grid-cols-1 gap-x-[10px] gap-y-2 md:grid-cols-3 md:gap-y-4">
						{values.map(([key, value]) => (
							<KeyValue
								key={key}
								label={
									<TooltipProvider>
										<Tooltip>
											<TooltipTrigger className="cursor-default truncate">{key}</TooltipTrigger>
											<TooltipContent className="max-w-[480px]">{key}</TooltipContent>
										</Tooltip>
									</TooltipProvider>
								}
								value={
									<>
										{isString(value) && regex.test(value) ? (
											<Codesnippet className="py-1" highlightCode code={value} />
										) : value === null ? (
											<div>null</div>
										) : isString(value) && isUrl(value) ? (
											<a
												className="underline transition-all duration-200 hover:decoration-transparent"
												href={value}
												target="_blank"
												rel="noopener noreferrer"
											>
												{value}
											</a>
										) : (
											<div className="whitespace-normal">
												{isString(value) ? value : JSON.stringify(value)}
											</div>
										)}
									</>
								}
							/>
						))}
					</dl>
					{Object.entries(arrays).map(([key, value]) => (
						<RenderArray key={key} title={key} value={value} />
					))}
					{Object.entries(objects).map(([key, value]) => (
						<NestedCollapsible intent="secondary" title={key} data={value} key={key} />
					))}
				</div>
			)}
			{children}
		</CollapsibleCard>
	);
}

function RenderArray({ title, value }: { title: string; value: unknown[] }) {
	const simpleValues: unknown[] = value.filter(
		(val) => (!isArray(val) && !isObject(val)) || val === null
	);
	const nestedValues: unknown[] = value.filter((val) => isArray(val) || isObject(val));

	return (
		<>
			<CollapsibleCard intent="secondary" key={title} title={title}>
				{simpleValues.length > 0 && (
					<dl className="grid grid-cols-1 gap-x-[10px] gap-y-2 truncate md:grid-cols-3 md:gap-y-4">
						{Object.entries(simpleValues).map(([key, value]) => (
							<KeyValue
								key={key}
								label={
									<TooltipProvider>
										<Tooltip>
											<TooltipTrigger className="cursor-default truncate">{key}</TooltipTrigger>
											<TooltipContent className="max-w-[480px]">{key}</TooltipContent>
										</Tooltip>
									</TooltipProvider>
								}
								value={
									<div className="py-1">
										{value === null ? (
											<div>null</div>
										) : isString(value) && isUrl(value) ? (
											<a
												className="underline transition-all duration-200 hover:decoration-transparent"
												href={value}
												target="_blank"
												rel="noopener noreferrer"
											>
												{value}
											</a>
										) : (
											<div className="whitespace-normal">
												{isString(value) ? value : JSON.stringify(value)}
											</div>
										)}
									</div>
								}
							/>
						))}
					</dl>
				)}
				{nestedValues.length > 0 && (
					<ul className="space-y-4">
						{nestedValues.map((val, index: number) => (
							<li key={index}>
								<NestedCollapsible
									intent="secondary"
									key={index}
									title={index}
									data={val as Record<string, Record<string, unknown> | unknown[]>}
								/>
							</li>
						))}
					</ul>
				)}
			</CollapsibleCard>
		</>
	);
}
