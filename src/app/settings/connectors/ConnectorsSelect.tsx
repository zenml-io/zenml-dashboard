import { ConnectorSelectOptions, ConnectorType } from "@/contents/connectors";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from "@zenml-io/react-component-library";
import { Dispatch, SetStateAction } from "react";

type Props = {
	onTypeChange: Dispatch<SetStateAction<ConnectorType>>;
	selectedType: ConnectorType;
	id: string;
};

export function ConnectorsSelect({ id, selectedType, onTypeChange }: Props) {
	return (
		<Select value={selectedType} onValueChange={(val) => onTypeChange(val as ConnectorType)}>
			<SelectTrigger
				id={id}
				className="w-[250px] border border-neutral-300 px-2 text-left text-text-md"
			>
				<SelectValue placeholder="Select Connector Type" />
			</SelectTrigger>
			<SelectContent className="">
				{ConnectorSelectOptions.map((item) => (
					<SelectItem key={item.value} value={item.value}>
						<div className="flex items-center gap-1">
							{item.icon}
							{item.label}
						</div>
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	);
}
