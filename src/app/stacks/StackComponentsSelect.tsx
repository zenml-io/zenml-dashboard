import { StackComponentType } from "@/types/components";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from "@zenml-io/react-component-library";
import { Dispatch, SetStateAction } from "react";

type Props = {
	onTypeChange: Dispatch<SetStateAction<StackComponentType>>;
	selectedType: StackComponentType;
	id: string;
};

export function StackComponentsSelect({ id, selectedType, onTypeChange }: Props) {
	return (
		<Select value={selectedType} onValueChange={(val) => onTypeChange(val as StackComponentType)}>
			<SelectTrigger
				id={id}
				className="w-[200px] border border-neutral-300 px-2 text-left text-text-md"
			>
				<SelectValue placeholder="Select ComponentType" />
			</SelectTrigger>
			<SelectContent className="">
				{/* TODO Add icons */}
				<SelectItem value="orchestrator">Orchestrator</SelectItem>
				<SelectItem value="artifact_store">Artifact Store</SelectItem>
				<SelectItem value="container_registry">Container Registry</SelectItem>
				<SelectItem value="step_operator">Step Operator</SelectItem>
				<SelectItem value="model_deployer">Model Deployer</SelectItem>
				<SelectItem value="feature_store">Feature Store</SelectItem>
				<SelectItem value="experiment_tracker">Experiment Tracker</SelectItem>
				<SelectItem value="alerter">Alerter</SelectItem>
				<SelectItem value="annotator">Annotator</SelectItem>
				<SelectItem value="data_validator">Data Validator</SelectItem>
				<SelectItem value="image_builder">Image Builder</SelectItem>
				<SelectItem value="model_registry">Model Registry</SelectItem>

				{/* <SelectItem value="azure">
				<div className="flex items-center gap-1">
					<Azure className="h-5 w-5" />
					Azure
				</div>
			</SelectItem>  */}
			</SelectContent>
		</Select>
	);
}
