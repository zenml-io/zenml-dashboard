import Alerter from "@/assets/icons/annotation-alert.svg?react";
import Barchart from "@/assets/icons/bar-chart-square-check.svg?react";
import Clipboard from "@/assets/icons/clipboard.svg?react";
import Container from "@/assets/icons/container.svg?react";
import Database from "@/assets/icons/database.svg?react";
import Folder from "@/assets/icons/folder.svg?react";
import Layout from "@/assets/icons/layout.svg?react";
import MLModel from "@/assets/icons/ml_model.svg?react";
import Package from "@/assets/icons/package-plus.svg?react";
import Rocket from "@/assets/icons/rocket.svg?react";
import Transform from "@/assets/icons/transform.svg?react";
import { StackComponentType } from "@/types/components";
import { HTMLAttributes } from "react";

type Props = HTMLAttributes<HTMLOrSVGElement> & {
	type: StackComponentType;
};

export function ComponentIcon({ type, ...rest }: Props) {
	switch (type) {
		case "orchestrator":
			return <MLModel {...rest} />;
		case "artifact_store":
			return <Folder {...rest} />;
		case "container_registry":
			return <Container {...rest} />;
		case "step_operator":
			return <Container {...rest} />;
		case "model_deployer":
			return <Rocket {...rest} />;
		case "feature_store":
			return <Database {...rest} />;
		case "experiment_tracker":
			return <Clipboard {...rest} />;
		case "alerter":
			return <Alerter {...rest} />;
		case "annotator":
			return <Transform {...rest} />;
		case "data_validator":
			return <Barchart {...rest} />;
		case "image_builder":
			return <Package {...rest} />;
		case "model_registry":
			return <Layout {...rest} />;
	}
}
