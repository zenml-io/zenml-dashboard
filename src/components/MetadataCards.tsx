import { MetadataMap } from "@/types/common";
import { KeyValue } from "./KeyValue";
import { NestedCollapsible } from "./NestedCollapsible";
import { CollapsibleCard } from "./CollapsibleCard";
import { Codesnippet } from "./CodeSnippet";

type Props = { metadata: MetadataMap };

export function MetadataCards({ metadata }: Props) {
	const dictMetadata = Object.values(metadata || {}).filter((val) => val.body.type === "dict");
	return (
		<>
			{dictMetadata.map((metadataObj) => (
				<NestedCollapsible
					key={metadataObj.id}
					data={metadataObj.body.value}
					title={metadataObj.body.key}
				/>
			))}
		</>
	);
}

export function UncategorizedCard({ metadata }: Props) {
	const metaData = Object.entries(metadata || {});
	const regex = /^<class\s+'.*'>$/;

	const nonDicts = metaData.filter(([_, value]) => {
		return value.body.type !== "dict";
	});

	if (nonDicts.length === 0) return null;

	const convertToMBorGB = (number: number) => {
		if (number < 1024) {
			return number + " bytes";
		} else if (number < Math.pow(1024, 2)) {
			return (number / 1024).toFixed(2) + " KB";
		} else if (number < Math.pow(1024, 3)) {
			return (number / Math.pow(1024, 2)).toFixed(2) + " MB";
		} else {
			return (number / Math.pow(1024, 3)).toFixed(2) + " GB";
		}
	};

	return (
		<div>
			<CollapsibleCard initialOpen title="Uncategorized">
				<dl className="grid grid-cols-1 gap-x-[10px] gap-y-2 md:grid-cols-3 md:gap-y-4">
					{nonDicts.map(([_, value]) => (
						<KeyValue
							key={value.id}
							label={value.body.key}
							value={
								<>
									{(() => {
										if (regex.test(value.body.value)) {
											return <Codesnippet className="py-1" highlightCode code={value.body.value} />;
										} else if (value.body.type === "StorageSize") {
											return <div className="py-1">{convertToMBorGB(value.body.value)}</div>;
										} else if (value.body.type === "Uri") {
											return (
												<a
													className="py-1 underline transition-all duration-200 hover:decoration-transparent"
													rel="noopener noreferrer"
													target="_blank"
													href={value.body.value}
												>
													{value.body.value}
												</a>
											);
										} else {
											return <div className="py-1">{value.body.value}</div>;
										}
									})()}
								</>
							}
						/>
					))}
				</dl>
			</CollapsibleCard>
		</div>
	);
}
