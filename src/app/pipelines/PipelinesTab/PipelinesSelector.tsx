import { Checkbox } from "@zenml-io/react-component-library";
import { usePipelinesSelectorContext } from "./PipelineSelectorContext";

type Props = {
	id: string;
};

export const PipelinesSelector = ({ id }: Props) => {
	const { selectedPipelines, setSelectedPipelines } = usePipelinesSelectorContext();

	const handleCheck = (isChecked: boolean, id: string) => {
		setSelectedPipelines((prevSelectedItems: any) => {
			return isChecked
				? [...prevSelectedItems, id]
				: prevSelectedItems.filter((selectedItem: any) => selectedItem !== id);
		});
	};

	return (
		<Checkbox
			id={id}
			onCheckedChange={(e: boolean) => handleCheck(e, id)}
			checked={selectedPipelines.includes(id)}
			className="h-3 w-3"
		/>
	);
};
