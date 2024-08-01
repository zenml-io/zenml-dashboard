import { createContext, Dispatch, SetStateAction, useContext, useState } from "react";

type IntegrationsContextType = {
	integrations: string[];
	setIntegrations: Dispatch<SetStateAction<string[]>>;
};

export const IntegrationsContext = createContext<IntegrationsContextType | null>(null);

export function IntegrationsContextProvider({ children }: { children: React.ReactNode }) {
	const [integrations, setIntegrations] = useState<string[]>([]);
	return (
		<IntegrationsContext.Provider
			value={{
				integrations,
				setIntegrations
			}}
		>
			{children}
		</IntegrationsContext.Provider>
	);
}

export function useIntegrationsContext() {
	const context = useContext(IntegrationsContext);
	if (context === null) {
		throw new Error("useIntegrationsContext must be used within an AuthProvider");
	}
	return context;
}
