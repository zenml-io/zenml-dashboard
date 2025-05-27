import { Breadcrumbs } from "@/components/breadcrumbs/types";
import { createContext, useContext, useState } from "react";

type BreadcrumbContextType = {
	breadcrumbs: Breadcrumbs;
	setBreadcrumbs: (breadcrumbs: Breadcrumbs) => void;
};

export const BreadcrumbContext = createContext<BreadcrumbContextType | null>(null);

export function BreadcrumbContextProvider({ children }: { children: React.ReactNode }) {
	const [breadcrumbs, setBreadcrumbs] = useState<Breadcrumbs>([]);

	return (
		<BreadcrumbContext.Provider value={{ breadcrumbs, setBreadcrumbs }}>
			{children}
		</BreadcrumbContext.Provider>
	);
}

export function useBreadcrumbsContext() {
	const context = useContext(BreadcrumbContext);
	if (context === null) {
		throw new Error("useBreadcrumbContext must be used within a BreadcrumbContextProvider");
	}
	return context;
}
