import { Dispatch, SetStateAction, createContext, useContext, useState } from "react";

type LogViewerContextType = {
	searchQuery: string;
	setSearchQuery: Dispatch<SetStateAction<string>>;
	logLevel: number;
	setLogLevel: Dispatch<SetStateAction<number>>;
};

export const LogViewerContext = createContext<LogViewerContextType | null>(null);

export function LogViewerProvider({ children }: { children: React.ReactNode }) {
	const [searchQuery, setSearchQuery] = useState("");
	const [logLevel, setLogLevel] = useState(20);
	return (
		<LogViewerContext.Provider value={{ searchQuery, setSearchQuery, logLevel, setLogLevel }}>
			{children}
		</LogViewerContext.Provider>
	);
}

export function useLogViewerContext() {
	const context = useContext(LogViewerContext);
	if (context === null) {
		throw new Error("useLogViewerContext must be used within a LogViewerProvider");
	}
	return context;
}
