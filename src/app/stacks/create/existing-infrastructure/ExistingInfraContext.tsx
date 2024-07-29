import {
	ComponentInfo,
	ServiceConnectorInfo,
	ServiceConnectorResourceInfo
} from "@/types/service-connectors";
import { createContext, Dispatch, SetStateAction, useContext, useState } from "react";

type Data = {
	stackName: string | null;
	createdStackId: string | null;
	connectorConfig: ServiceConnectorInfo | null;
	artifactStoreConfig: ComponentInfo | null;
	orchestratorConfig: ComponentInfo | null;
	registryConfig: ComponentInfo | null;
	fullstackResources: ServiceConnectorResourceInfo | null;
};

type ExistingInfraContextType = {
	data: Data;
	setData: Dispatch<SetStateAction<Data>>;
};

export const ExistingInfraContext = createContext<ExistingInfraContextType | null>(null);

export function ExistingInfraProvider({ children }: { children: React.ReactNode }) {
	const [data, setData] = useState<Data>({
		stackName: null,
		createdStackId: null,
		connectorConfig: null,
		fullstackResources: null,
		artifactStoreConfig: null,
		registryConfig: null,
		orchestratorConfig: null
	});

	return (
		<ExistingInfraContext.Provider value={{ data, setData }}>
			{children}
		</ExistingInfraContext.Provider>
	);
}

export function useExistingInfraContext() {
	const context = useContext(ExistingInfraContext);
	if (context === null) {
		throw new Error("useExistingInfraContext must be used within an ExistingInfraProvider");
	}
	return context;
}
