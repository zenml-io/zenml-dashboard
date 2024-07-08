import { StackComponentSelectItems } from "@/contents/components";
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
				className="w-[250px] border border-neutral-300 px-2 text-left text-text-md"
			>
				<SelectValue placeholder="Select ComponentType" />
			</SelectTrigger>
			<SelectContent className="">
				{StackComponentSelectItems.map((item) => (
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
