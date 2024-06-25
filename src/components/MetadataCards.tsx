import { MetadataMap } from "@/types/common";
import { KeyValue } from "./KeyValue";
import { NestedCollapsible } from "./NestedCollapsible";
import { CollapsibleCard } from "./CollapsibleCard";
import { Codesnippet } from "./CodeSnippet";
import { EmptyState } from "./EmptyState";
import File from "@/assets/icons/file.svg?react";

type Props = { metadata: MetadataMap };

export function EmptyCards() {
	return (
		<CollapsibleCard initialOpen title="Metadata">
			<EmptyState icon={<File className="h-[120px] w-[120px] fill-neutral-300" />}>
				<div className="text-center">
					<p className="mb-2 text-display-xs font-semibold">No metadata found</p>
					<p className="text-text-lg text-theme-text-secondary">There are no metadata available.</p>
				</div>
			</EmptyState>
		</CollapsibleCard>
	);
}

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

export function UncategorizedCard({ metadata, title }: Props & { title?: string }) {
	const metaData = Object.entries(metadata || {});
	const regex = /^<class\s+'.*'>$/;

	const nonDicts = metaData.filter(([_, value]) => {
		return value.body.type !== "dict";
	});

	if (nonDicts.length === 0) return null;

	// sort nonDicts alphabetically by index 0
	nonDicts.sort((a, b) => a[0].localeCompare(b[0]));

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
			<CollapsibleCard initialOpen title={title || "Uncategorized"}>
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
