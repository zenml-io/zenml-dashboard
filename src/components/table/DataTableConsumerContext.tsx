import React, { useState, createContext, ReactNode, SetStateAction, Dispatch } from "react";
import { RowSelectionState } from "@tanstack/react-table";

export function createDataTableConsumerContext<CtxProviderProps extends { children: ReactNode }>() {
	type CtxValue = {
		rowSelection: RowSelectionState;
		setRowSelection: Dispatch<SetStateAction<RowSelectionState>>;

		selectedRowIDs: string[];
		selectedRowCount: number;
	};

	const Context = createContext<CtxValue | null>(null);

	function useContext() {
		const ctx = React.useContext(Context);
		if (!ctx) throw new Error("DataTableConsumerContext must be used within its Provider");
		return ctx;
	}

	function ContextProvider({ children }: CtxProviderProps) {
		const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

		const selectedRowIDs = getSelectedRowIDs(rowSelection);
		const selectedRowCount = selectedRowIDs.length;

		return (
			<Context.Provider value={{ rowSelection, setRowSelection, selectedRowIDs, selectedRowCount }}>
				{children}
			</Context.Provider>
		);
	}

	return {
		Context,
		ContextProvider,
		useContext
	};
}

export function countSelectedRows(rowSelection: RowSelectionState): number {
	return Object.values(rowSelection).reduce((acc, curr) => acc + Number(curr), 0);
}

export function getSelectedRowIDs(rowSelection: RowSelectionState): string[] {
	return Object.entries(rowSelection)
		.filter(([_, selected]) => selected)
		.map(([id]) => id);
}
