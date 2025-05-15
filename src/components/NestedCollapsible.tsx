import { isArray, isObject, isString } from "@/lib/type-guards";
import { isUrl } from "@/lib/url";
import { JSONSchemaDefinition } from "@/types/forms";
import {
	CollapsibleHeaderProps,
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger
} from "@zenml-io/react-component-library/components/client";
import { PropsWithChildren, ReactNode } from "react";
import { NotAvailable } from "./not-available";
import { SensitiveValue } from "./sensitive-value";
import { CollapsibleCardWithCopy } from "./CollapsibleCard";
import { Codesnippet } from "./CodeSnippet";

type Props = {
	intent?: CollapsibleHeaderProps["intent"];
	data?: Record<string, unknown>;
	title: ReactNode;
	isInitialOpen?: boolean;
	contentClassName?: string;
	className?: string;
	schema?: JSONSchemaDefinition;
};

const regex = /^<class\s+'.*'>$/;

export function NestedCollapsible({
	title,
	schema,
	data,
	intent = "primary",
	contentClassName,
	className,
	children,
	isInitialOpen = false
}: PropsWithChildren<Props>) {
	const objects: { [key: string]: Record<string, unknown> } = {};
	const nonObjects: { [key: string]: unknown } = {};
	const arrays: { [key: string]: unknown[] } = {};

	for (const [key, value] of Object.entries(data || {})) {
		if (isObject(value)) {
			objects[key] = value as Record<string, unknown>;
		} else if (isArray(value)) {
			arrays[key] = value;
		} else {
			nonObjects[key] = value;
		}
	}

	// sort keys of nonObjects alphabetically
	const values = Object.entries(nonObjects);
	values.sort((a, b) => a[0].localeCompare(b[0]));

	const hasNoData = Object.keys(data || {}).length === 0;

	return (
		<CollapsibleCardWithCopy
			contentClassName={contentClassName}
			initialOpen={isInitialOpen}
			intent={intent}
			title={title}
			className={className}
			copyText={JSON.stringify(data)}
			displayCopyButton={!hasNoData}
		>
			{hasNoData ? (
				<NotAvailable />
			) : (
				<div className="flex flex-col gap-3">
					<dl className="grid grid-cols-1 gap-x-[10px] gap-y-2 md:grid-cols-3 md:gap-y-4">
						{values.map(([key, value]) => {
							const prop = schema?.properties?.[key];
							const keyName = prop?.title || key;
							const isSecret = prop?.sensitive || prop?.format === "password" || false;
							return (
								<>
									<dt className="col-span-1 flex items-start text-theme-text-secondary">
										<TooltipProvider>
											<Tooltip>
												<TooltipTrigger className="cursor-default truncate">
													{keyName}
												</TooltipTrigger>
												<TooltipContent className="max-w-[480px]">{keyName}</TooltipContent>
											</Tooltip>
										</TooltipProvider>
									</dt>
									<dd className="col-span-2 w-full truncate text-neutral-700">
										{isSecret && isString(value) ? (
											<SensitiveValue value={value} />
										) : (
											<RenderSimpleValue value={value} />
										)}
									</dd>
								</>
							);
						})}
					</dl>
					{Object.entries(arrays).map(([key, value]) => (
						<RenderArray key={key} title={key} value={value as unknown[]} />
					))}
					{Object.entries(objects).map(([key, value]) => (
						<NestedCollapsible
							intent="secondary"
							title={key}
							data={value as Record<string, unknown>}
							key={key}
						/>
					))}
				</div>
			)}
			{children}
		</CollapsibleCardWithCopy>
	);
}

function RenderSimpleValue({ value }: { value: unknown }) {
	if (isString(value) && regex.test(value)) {
		return <Codesnippet highlightCode code={value} />;
	}

	if (value === null) {
		return <div>null</div>;
	}

	if (isString(value) && isUrl(value)) {
		return (
			<a
				className="underline transition-all duration-200 hover:decoration-transparent"
				href={value}
				target="_blank"
				rel="noopener noreferrer"
			>
				{value}
			</a>
		);
	}

	return <div className="whitespace-normal">{isString(value) ? value : JSON.stringify(value)}</div>;
}

function RenderArray({ title, value }: { title: string; value: unknown[] }) {
	const simpleValues: unknown[] = value.filter(
		(val) => (!isArray(val) && !isObject(val)) || val === null
	);
	const nestedValues: unknown[] = value.filter((val) => isArray(val) || isObject(val));

	return (
		<>
			<CollapsibleCardWithCopy
				copyText={JSON.stringify(value)}
				intent="secondary"
				key={title}
				title={title}
			>
				{simpleValues.length > 0 && (
					<ul className="space-y-2 md:space-y-4">
						{simpleValues.map((val, index) => (
							<li key={index}>
								<RenderSimpleValue value={val} />
							</li>
						))}
					</ul>
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
			</CollapsibleCardWithCopy>
		</>
	);
}
