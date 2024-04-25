import { UpdateUser } from "@/types/user";
import { Dispatch, SetStateAction, createContext, useContext, useState } from "react";

type ActivationContextType = {
	newUser: UpdateUser;
	setNewUser: Dispatch<SetStateAction<UpdateUser>>;
};

export const ActivationContext = createContext<ActivationContextType | null>(null);

export function ActivationProvider({
	children,
	initialUser
}: {
	children: React.ReactNode;
	initialUser?: UpdateUser;
}) {
	const [newUser, setNewUser] = useState<UpdateUser>(initialUser || {});
	return (
		<ActivationContext.Provider value={{ newUser, setNewUser }}>
			{children}
		</ActivationContext.Provider>
	);
}

export function useActivationContext() {
	const context = useContext(ActivationContext);
	if (context === null) {
		throw new Error("useActivationContext must be used within an ActivationProvider");
	}
	return context;
}
