import { isArray, isObject, isString } from "@/lib/type-guards";
import { useState } from "react";
import { shouldCollapseString } from "../services/string-threshhold";
import { ObjectValue } from "./object-value";
import { PlaygroundValueCollapsible } from "./playground-value-collapsible";
import { RenderSimpleValue } from "./simple-value";

export function ArrayValue({ value, title }: { value: unknown[]; title: string }) {
	const [open, setOpen] = useState(false);
	return (
		<PlaygroundValueCollapsible title={title} open={open} onOpenChange={setOpen}>
			<ArrayValueBody value={value} />
		</PlaygroundValueCollapsible>
	);
}

export function ArrayValueBody({ value }: { value: unknown[] }) {
	const simpleValues: unknown[] = value.filter(
		(val) => (!isArray(val) && !isObject(val)) || val === null
	);
	const nestedValues: unknown[] = value.filter((val) => isArray(val) || isObject(val));

	return (
		<ul className="space-y-3">
			{simpleValues.map((val, idx) => {
				const isCollapsingString = isString(value) && shouldCollapseString(value);
				return (
					<li
						key={idx}
						className={
							isCollapsingString
								? "grid grid-cols-1 gap-y-2"
								: "grid grid-cols-1 gap-x-[10px] gap-y-2 md:grid-cols-3 md:gap-y-4"
						}
					>
						<p className={`text-theme-text-secondary ${isCollapsingString ? "" : "md:col-span-1"}`}>
							{idx}
						</p>
						<div className={isCollapsingString ? "" : "md:col-span-2"}>
							<RenderSimpleValue value={val} />
						</div>
					</li>
				);
			})}

			{nestedValues.map((val, index) => (
				<li key={index}>
					<ObjectValue
						key={index}
						title={index.toString()}
						value={val as Record<string, unknown | unknown[]>}
					/>
				</li>
			))}
		</ul>
	);
}
