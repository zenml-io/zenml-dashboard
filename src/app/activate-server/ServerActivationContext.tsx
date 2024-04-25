import { ServerActivationPayload } from "@/types/server";
import { Dispatch, SetStateAction, createContext, useContext, useState } from "react";

type ServerActivationContextType = {
	serverSettings: ServerActivationPayload;
	setServerSettings: Dispatch<SetStateAction<ServerActivationPayload>>;
};

export const ServerActivationContext = createContext<ServerActivationContextType | null>(null);

export function ServerActivationProvider({
	children,
	initialSettings
}: {
	children: React.ReactNode;
	initialSettings?: ServerActivationPayload;
}) {
	const [serverSettings, setServerSettings] = useState<ServerActivationPayload>(
		initialSettings || {}
	);
	return (
		<ServerActivationContext.Provider value={{ serverSettings, setServerSettings }}>
			{children}
		</ServerActivationContext.Provider>
	);
}

export function useServerActivationContext() {
	const context = useContext(ServerActivationContext);
	if (context === null) {
		throw new Error("useServerActivationContext must be used within an ServerActivationProvider");
	}
	return context;
}
