import { pluralize } from "@/lib/strings";
import { PropsWithChildren } from "react";
import {
	DeleteSelectedItemsAlert,
	DeleteSelectedItemsAlertProps
} from "../alerts/delete-selected-item-alert";

export type MultiSelectBasicInfoGroupProps = DeleteSelectedItemsAlertProps;

export function ButtonGroupBasic({
	itemName,
	selectedItemCount,
	onDeleteSelected,
	children
}: PropsWithChildren<MultiSelectBasicInfoGroupProps>) {
	const plural = pluralize(selectedItemCount, itemName);
	const info = `${selectedItemCount} ${plural} selected`;

	return (
		<div className="flex items-center divide-x divide-theme-border-moderate overflow-hidden rounded-md border border-theme-border-moderate">
			<div className="bg-primary-25 px-2 py-1 font-semibold text-theme-text-brand">{info}</div>
			<DeleteSelectedItemsAlert
				itemName={itemName}
				selectedItemCount={selectedItemCount}
				onDeleteSelected={onDeleteSelected}
			></DeleteSelectedItemsAlert>
			{children}
		</div>
	);
}
