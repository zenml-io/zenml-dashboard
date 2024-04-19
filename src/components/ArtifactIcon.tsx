import { ArtifactVersionBody } from "@/types/artifact-versions";
import { Icon } from "./Icon";

type Props = {
	className?: string;
	artifactType: ArtifactVersionBody["type"];
};

export function ArtifactIcon({ artifactType, className }: Props) {
	switch (artifactType) {
		case "DataAnalysisArtifact":
			return <Icon name="analysis" className={className} />;
		case "DataArtifact":
			return <Icon name="database" className={className} />;
		case "ModelArtifact":
			return <Icon name="dataflow-2" className={className} />;
		case "SchemaArtifact":
			return <Icon name="route" className={className} />;
		case "ServiceArtifact":
			return <Icon name="storefront" className={className} />;
		case "StatisticsArtifact":
			return <Icon name="storefront" className={className} />;
		default:
			return <Icon name="file" className={className} />;
	}
}
