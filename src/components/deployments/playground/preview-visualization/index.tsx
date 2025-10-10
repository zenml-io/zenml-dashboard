import { CollapsibleCard } from "@/components/CollapsibleCard";
import { RenderSimpleValue } from "./components/simple-value";
import { sortJsonKeys } from "./services/sort-json-keys";
import { ObjectValueBody } from "./components/object-value";
import { ArrayValueBody } from "./components/array-value";

export function PlaygroundOutputsPreviewVisualization({ json }: { json: Record<string, unknown> }) {
	const { objects, nonObjects, arrays } = sortJsonKeys(json);

	return (
		<div className="space-y-3">
			{nonObjects.map(([title, value], idx) => {
				return (
					<CollapsibleCard headerClassName="p-3" initialOpen title={title} key={idx}>
						<RenderSimpleValue alwaysOpen value={value} />
					</CollapsibleCard>
				);
			})}
			{Object.entries(objects).map(([title, value], idx) => {
				return (
					<CollapsibleCard headerClassName="p-3" initialOpen title={title} key={idx}>
						<ObjectValueBody value={value} />
					</CollapsibleCard>
				);
			})}
			{Object.entries(arrays).map(([title, value], idx) => {
				return (
					<CollapsibleCard headerClassName="p-3" initialOpen title={title} key={idx}>
						<ArrayValueBody value={value} />
					</CollapsibleCard>
				);
			})}
		</div>
	);
}
