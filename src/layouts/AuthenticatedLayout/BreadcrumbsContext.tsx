import { PropsWithChildren, createContext, useContext, useState } from "react";

type BreadcrumbsContextProps = {
	currentBreadcrumbData: any;
	setCurrentBreadcrumbData: any;
};

const BreadcrumbsContext = createContext<BreadcrumbsContextProps | null>(null);

export function BreadcrumbsContextProvider({
	children
}: PropsWithChildren<BreadcrumbsContextProps>) {
	const [currentBreadcrumbData, setCurrentBreadcrumbData] = useState<any>(null);

	return (
		<BreadcrumbsContext.Provider
			value={{
				currentBreadcrumbData,
				setCurrentBreadcrumbData
			}}
		>
			{children}
		</BreadcrumbsContext.Provider>
	);
}

export function useBreadcrumbsContext() {
	const context = useContext(BreadcrumbsContext);
	if (!context)
		throw new Error("useBreadcrumbsContext must be used within a BreadcrumbsContextProvider");
	return context;
}
