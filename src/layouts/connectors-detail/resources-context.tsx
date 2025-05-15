import { ResourcesModel } from "@/types/service-connectors";
import { createContext, Dispatch, SetStateAction, useContext, useState } from "react";

type ResourcesContextType = {
	resources: ResourcesModel | null;
	setResources: Dispatch<SetStateAction<ResourcesModel | null>>;
};

export const ResourcesContext = createContext<ResourcesContextType | null>(null);

export function ResourcesContextProvider({ children }: { children: React.ReactNode }) {
	const [resources, setResources] = useState<ResourcesModel | null>(null);

	return (
		<ResourcesContext.Provider value={{ resources, setResources }}>
			{children}
		</ResourcesContext.Provider>
	);
}

export function useResourcesContext() {
	const context = useContext(ResourcesContext);
	if (context === null) {
		throw new Error("useResourcesContext must be used within a ResourcesContextProvider");
	}
	return context;
}
