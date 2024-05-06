import { authStateWriteSchema, getAuthState, removeAuthState, setAuthState } from "@/lib/sessions";
import { createContext, useContext } from "react";
import { z } from "zod";

type AuthContextType = {
	getAuthState: () => boolean;
	removeAuthState: () => void;
	setAuthState: (value: z.infer<typeof authStateWriteSchema>) => void;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
	return (
		<AuthContext.Provider
			value={{
				getAuthState,
				removeAuthState,
				setAuthState
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}

export function useAuthContext() {
	const context = useContext(AuthContext);
	if (context === null) {
		throw new Error("useAuthContext must be used within an AuthProvider");
	}
	return context;
}
