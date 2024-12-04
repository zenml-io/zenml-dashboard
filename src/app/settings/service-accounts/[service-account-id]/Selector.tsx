import { Checkbox } from "@zenml-io/react-component-library";
import { useApiKeySelectorContext } from "./SelectorContext";

type Props = {
	id: string;
};

export const ApiKeySelector = ({ id }: Props) => {
	const { selectedApiKeys, setSelectedApiKeys } = useApiKeySelectorContext();

	const handleCheck = (isChecked: boolean, id: string) => {
		setSelectedApiKeys((prevSelectedItems: any) => {
			return isChecked
				? [...prevSelectedItems, id]
				: prevSelectedItems.filter((selectedItem: any) => selectedItem !== id);
		});
	};

	return (
		<Checkbox
			id={id}
			onCheckedChange={(e: boolean) => handleCheck(e, id)}
			checked={selectedApiKeys.includes(id)}
			className="h-3 w-3"
		/>
	);
};
