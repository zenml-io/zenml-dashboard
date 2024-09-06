import { Checkbox } from "@zenml-io/react-component-library";
import { useRunsSelectorContext } from "./RunsSelectorContext";

type Props = {
	id: string;
};

export const RunSelector = ({ id }: Props) => {
	const { selectedRuns, setSelectedRuns } = useRunsSelectorContext();

	const handleCheck = (isChecked: boolean, id: string) => {
		setSelectedRuns((prevSelectedItems: any) => {
			return isChecked
				? [...prevSelectedItems, id]
				: prevSelectedItems.filter((selectedItem: any) => selectedItem !== id);
		});
	};

	return (
		<Checkbox
			id={id}
			onCheckedChange={(e: boolean) => handleCheck(e, id)}
			checked={selectedRuns.includes(id)}
			className="h-3 w-3"
		/>
	);
};
