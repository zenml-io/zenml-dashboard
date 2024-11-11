import { isObject, isString } from "@/lib/type-guards";
import { MetadataMap } from "@/types/common";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger
} from "@zenml-io/react-component-library/components/client";
import { Codesnippet } from "./CodeSnippet";
import { CollapsibleCard } from "./CollapsibleCard";
import { KeyValue } from "./KeyValue";
import { NestedCollapsible } from "./NestedCollapsible";

type Props = { metadata: MetadataMap };

export function MetadataCards({ metadata }: Props) {
	const dictMetadata = Object.values(metadata || {}).filter((val) => isObject(val));
	return (
		<>
			{dictMetadata.map((metadataObj, idx) => (
				<NestedCollapsible key={idx} data={metadataObj} title={Object.keys({ metadataObj })[0]} />
			))}
		</>
	);
}

export function UncategorizedCard({ metadata, title }: Props & { title?: string }) {
	const regex = /^<class\s+'.*'>$/;

	const nonDicts = Object.entries(metadata).filter(([_, value]) => !isObject(value));

	if (nonDicts.length === 0) return null;

	// sort nonDicts alphabetically by index 0
	nonDicts.sort((a, b) => a[0].localeCompare(b[0]));

	return (
		<div>
			<CollapsibleCard initialOpen title={title || "Uncategorized"}>
				<dl className="grid grid-cols-1 gap-x-[10px] gap-y-2 md:grid-cols-3 md:gap-y-4">
					{nonDicts.map(([name, value], idx) => {
						return (
							<KeyValue
								key={idx}
								label={
									<TooltipProvider>
										<Tooltip>
											<TooltipTrigger className="cursor-default truncate">{name}</TooltipTrigger>
											<TooltipContent className="max-w-[480px]">{name}</TooltipContent>
										</Tooltip>
									</TooltipProvider>
								}
								value={
									<>
										{(() => {
											if (isString(value) && regex.test(value)) {
												return <Codesnippet className="py-1" highlightCode code={value} />;
											} else {
												return (
													<div className="py-1">
														{isString(value) ? value : JSON.stringify(value)}
													</div>
												);
											}
										})()}
									</>
								}
							/>
						);
					})}
				</dl>
			</CollapsibleCard>
		</div>
	);
}
