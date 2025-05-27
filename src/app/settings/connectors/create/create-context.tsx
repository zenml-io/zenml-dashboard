import { ServiceConnector } from "@/types/service-connectors";
import {
	Dispatch,
	PropsWithChildren,
	SetStateAction,
	createContext,
	useContext,
	useState
} from "react";

type RegisterConnectorContextType = {
	connectorType: string;
	setConnectorType: Dispatch<SetStateAction<string>>;
	createdConnector: ServiceConnector | null;
	setCreatedConnector: Dispatch<SetStateAction<ServiceConnector | null>>;
};

const RegisterConnectorContext = createContext<RegisterConnectorContextType | null>(null);

export function RegisterConnectorProvider({ children }: PropsWithChildren) {
	const [connectorType, setConnectorType] = useState<string>("");
	const [createdConnector, setCreatedConnector] = useState<ServiceConnector | null>(null);

	return (
		<RegisterConnectorContext.Provider
			value={{
				connectorType,
				setConnectorType,
				createdConnector,
				setCreatedConnector
			}}
		>
			{children}
		</RegisterConnectorContext.Provider>
	);
}

export function useRegisterConnectorContext() {
	const context = useContext(RegisterConnectorContext);
	if (!context)
		throw new Error("useRegisterConnectorContext must be used within a RegisterConnectorProvider");
	return context;
}
