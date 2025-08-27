import { Dispatch, SetStateAction, createContext, useContext, useState } from "react";

type LogViewerContextType = {
	searchQuery: string;
	setSearchQuery: Dispatch<SetStateAction<string>>;
	logLevel: number;
	setLogLevel: Dispatch<SetStateAction<number>>;
	currentPage: number;
	setCurrentPage: Dispatch<SetStateAction<number>>;
};

export const LogViewerContext = createContext<LogViewerContextType | null>(null);

export const DEFAULT_LOG_LEVEL = 20;
export const DEFAULT_PAGE = 1;
export const DEFAULT_SEARCH_QUERY = "";

export function LogViewerProvider({ children }: { children: React.ReactNode }) {
	const [searchQuery, setSearchQuery] = useState(DEFAULT_SEARCH_QUERY);
	const [logLevel, setLogLevel] = useState(DEFAULT_LOG_LEVEL);
	const [currentPage, setCurrentPage] = useState(DEFAULT_PAGE);
	return (
		<LogViewerContext.Provider
			value={{ searchQuery, setSearchQuery, logLevel, setLogLevel, currentPage, setCurrentPage }}
		>
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
