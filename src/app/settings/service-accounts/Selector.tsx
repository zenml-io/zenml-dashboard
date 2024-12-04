import { Checkbox } from "@zenml-io/react-component-library";
import { useServiceAccountSelectorContext } from "./SelectorContext";

type Props = {
	id: string;
};

export const ServiceAccountsSelector = ({ id }: Props) => {
	const { selectedServiceAccounts, setSelectedServiceAccounts } =
		useServiceAccountSelectorContext();

	const handleCheck = (isChecked: boolean, id: string) => {
		setSelectedServiceAccounts((prevSelectedItems: any) => {
			return isChecked
				? [...prevSelectedItems, id]
				: prevSelectedItems.filter((selectedItem: any) => selectedItem !== id);
		});
	};

	return (
		<Checkbox
			id={id}
			onCheckedChange={(e: boolean) => handleCheck(e, id)}
			checked={selectedServiceAccounts.includes(id)}
			className="h-3 w-3"
		/>
	);
};
