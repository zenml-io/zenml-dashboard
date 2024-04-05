/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode } from "react";
import { KeyValue } from "./KeyValue";
import { CollapsibleHeaderProps } from "@zenml-io/react-component-library";
import { CollapsibleCard } from "./CollapsibleCard";
import { Codesnippet } from "./CodeSnippet";

type Props = {
	intent?: CollapsibleHeaderProps["intent"];
	data?: { [key: string]: any };
	title: ReactNode;
	isInitialOpen?: boolean;
};

export function NestedCollapsible({
	title,
	data,
	intent = "primary",
	isInitialOpen = false
}: Props) {
	const objects: { [key: string]: any } = {};
	const nonObjects: { [key: string]: any } = {};
	const arrays: { [key: string]: any } = {};
	const regex = /^<class\s+'.*'>$/;

	for (const [key, value] of Object.entries(data || {})) {
		if (typeof value === "object" && !Array.isArray(value)) {
			objects[key] = value;
		} else if (Array.isArray(value)) {
			arrays[key] = value;
		} else {
			nonObjects[key] = value;
		}
	}

	if (Object.keys(data || {}).length === 0) return null;

	return (
		<CollapsibleCard initialOpen={isInitialOpen} intent={intent} title={title}>
			<div className="flex flex-col gap-3">
				<dl className="grid grid-cols-1 gap-x-[10px] gap-y-2 md:grid-cols-3 md:gap-y-4">
					{Object.entries(nonObjects).map(([key, value]) => (
						<KeyValue
							key={key}
							label={key}
							value={
								<>
									{typeof value === "boolean" ? (
										<div className="py-1">{JSON.stringify(value)}</div>
									) : regex.test(value) ? (
										<Codesnippet className="py-1" highlightCode code={value} />
									) : (
										<div className="py-1">{value}</div>
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
		</CollapsibleCard>
	);
}

function RenderArray({ title, value }: { title: string; value: any }) {
	const simpleValues: any[] = value.filter(
		(val: any) => (!Array.isArray(val) && typeof val !== "object") || val === null
	);
	const nestedValues: any[] = value.filter(
		(val: any) => Array.isArray(val) || typeof val === "object"
	);

	return (
		<>
			<CollapsibleCard intent="secondary" key={title} title={title}>
				{simpleValues.length > 0 && (
					<dl className="grid grid-cols-1 gap-x-[10px] gap-y-2 truncate md:grid-cols-3 md:gap-y-4">
						{Object.entries(simpleValues).map(([key, value]) => (
							<KeyValue
								key={key}
								label={key}
								value={
									<div className="py-1">
										{typeof value === "boolean" || typeof value === "object"
											? JSON.stringify(value)
											: value}
									</div>
								}
							/>
						))}
					</dl>
				)}
				{nestedValues.length > 0 && (
					<ul className="space-y-4">
						{nestedValues.map((val: any, index: number) => (
							<li key={index}>
								<NestedCollapsible intent="secondary" key={index} title={index} data={val} />
							</li>
						))}
					</ul>
				)}
			</CollapsibleCard>
		</>
	);
}
