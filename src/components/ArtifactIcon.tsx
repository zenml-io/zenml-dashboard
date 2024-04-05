import AnalysisIcon from "@/assets/icons/analysis.svg?react";
import DataIcon from "@/assets/icons/database.svg?react";
import ModelIcon from "@/assets/icons/dataflow-2.svg?react";
import SchemaIcon from "@/assets/icons/route.svg?react";
import ServiceIcon from "@/assets/icons/storefront.svg?react";
import StatisticIcon from "@/assets/icons/storefront.svg?react";
import BaseIcon from "@/assets/icons/file.svg?react";
import { ArtifactVersionBody } from "@/types/artifact-versions";

type Props = {
	className?: string;
	artifactType: ArtifactVersionBody["type"];
};

export function ArtifactIcon({ artifactType, className }: Props) {
	switch (artifactType) {
		case "DataAnalysisArtifact":
			return <AnalysisIcon className={className} />;
		case "DataArtifact":
			return <DataIcon className={className} />;
		case "ModelArtifact":
			return <ModelIcon className={className} />;
		case "SchemaArtifact":
			return <SchemaIcon className={className} />;
		case "ServiceArtifact":
			return <ServiceIcon className={className} />;
		case "StatisticsArtifact":
			return <StatisticIcon className={className} />;
		default:
			return <BaseIcon className={className} />;
	}
}
