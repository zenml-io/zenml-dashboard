import { isString } from "@/lib/type-guards";
import { useState } from "react";
import { sortJsonKeys } from "../services/sort-json-keys";
import { shouldCollapseString } from "../services/string-threshhold";
import { ArrayValue } from "./array-value";
import { PlaygroundValueCollapsible } from "./playground-value-collapsible";
import { RenderSimpleValue } from "./simple-value";

export function ObjectValue({ value, title }: { value: Record<string, unknown>; title: string }) {
	const [open, setOpen] = useState(false);
	return (
		<PlaygroundValueCollapsible title={title} open={open} onOpenChange={setOpen}>
			<ObjectValueBody value={value} />
		</PlaygroundValueCollapsible>
	);
}

export function ObjectValueBody({ value }: { value: Record<string, unknown> }) {
	const { objects, nonObjects, arrays } = sortJsonKeys(value);

	return (
		<ul className="space-y-3">
			{nonObjects.map(([key, value]) => {
				const isCollapsingString = isString(value) && shouldCollapseString(value);
				return (
					<li
						key={key}
						className={
							isCollapsingString
								? "grid grid-cols-1 gap-y-2"
								: "grid grid-cols-1 gap-x-[10px] gap-y-2 md:grid-cols-3 md:gap-y-4"
						}
					>
						<p className={`text-theme-text-secondary ${isCollapsingString ? "" : "md:col-span-1"}`}>
							{key}
						</p>
						<div className={isCollapsingString ? "" : "md:col-span-2"}>
							<RenderSimpleValue value={value} />
						</div>
					</li>
				);
			})}
			{Object.entries(objects).map(([title, value]) => {
				return <ObjectValue key={title} title={title} value={value} />;
			})}
			{Object.entries(arrays).map(([title, value]) => {
				return <ArrayValue key={title} value={value} title={title} />;
			})}
		</ul>
	);
}
