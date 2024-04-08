import { useArtifactVersion } from "@/data/artifact-versions/artifact-version-detail-query";
import { Codesnippet } from "../../CodeSnippet";
import { CollapsibleCard } from "../../CollapsibleCard";
import { ErrorFallback } from "@/components/Error";
import { Key, KeyValue, Value } from "@/components/KeyValue";
import {
	Skeleton,
	Tag,
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger
} from "@zenml-io/react-component-library";
import { useComponentDetail } from "@/data/components/component-detail-query";

type Props = {
	artifactVersionId: string;
};

export function DataCard({ artifactVersionId }: Props) {
	const {
		data: artifactVersionData,
		isPending: isArtifactVersionPending,
		isError: isArtifactVersionError,
		error: artifactVersionError
	} = useArtifactVersion({ versionId: artifactVersionId });

	const artifactStoreId = artifactVersionData?.metadata?.artifact_store_id;
	const { data: storeData, isSuccess: isStoreSuccess } = useComponentDetail(
		{
			componentId: artifactStoreId!
		},
		{ enabled: !!artifactStoreId }
	);

	if (isArtifactVersionError) {
		return <ErrorFallback err={artifactVersionError} />;
	}

	if (isArtifactVersionPending) return <Skeleton className="h-[500px] w-full" />;

	return (
		<CollapsibleCard initialOpen title="Data">
			<dl className="grid w-full grid-cols-1 gap-x-[10px] gap-y-2 md:grid-cols-3 md:gap-y-4">
				<Key className="col-span-3">URI</Key>
				<Value className="col-span-3 h-auto">
					<Codesnippet
						fullWidth
						codeClasses="truncate"
						code={artifactVersionData.body?.uri || ""}
					/>
				</Value>

				{artifactVersionData.metadata?.artifact_store_id && (
					<KeyValue
						label="Artifact Store"
						value={
							<>
								{isStoreSuccess ? (
									<Tag
										emphasis="subtle"
										rounded={false}
										color="grey"
										className="text-theme-text-primary"
									>
										{storeData?.name}
									</Tag>
								) : (
									<Skeleton className="h-6 w-12" />
								)}
							</>
						}
					/>
				)}
				<KeyValue
					label="Data Type"
					value={
						<Tag
							className="flex w-fit items-center pr-2 text-theme-text-primary"
							color="grey"
							emphasis="subtle"
							rounded={false}
						>
							<TooltipProvider>
								<Tooltip>
									<TooltipTrigger>{artifactVersionData.body?.data_type.attribute}</TooltipTrigger>
									<TooltipContent>
										{artifactVersionData.body?.data_type.module}.
										{artifactVersionData.body?.data_type.attribute}{" "}
									</TooltipContent>
								</Tooltip>
							</TooltipProvider>
						</Tag>
					}
				/>
			</dl>
		</CollapsibleCard>
	);
}

export function CodeCard({ artifactVersionId }: Props) {
	function returnConfigSchema(id: string) {
		return `from zenml.client import Client

artifact = Client().get_artifact_version('${id}')
loaded_artifact = artifact.load()`;
	}

	return (
		<CollapsibleCard initialOpen title="Code">
			<Codesnippet fullWidth highlightCode wrap code={returnConfigSchema(artifactVersionId)} />
		</CollapsibleCard>
	);
}
