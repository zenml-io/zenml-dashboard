import { Dispatch, SetStateAction, createContext, useContext, useState } from "react";

type TourContextType = {
	isActive: boolean;
	setIsActive: Dispatch<SetStateAction<boolean>>;
};

export const AuthContext = createContext<TourContextType | null>(null);

export function TourProvider({
	children,
	initialValue = false
}: {
	children: React.ReactNode;
	initialValue?: boolean;
}) {
	const [isActive, setIsActive] = useState(initialValue);
	return <AuthContext.Provider value={{ isActive, setIsActive }}>{children}</AuthContext.Provider>;
}

export function useTourContext() {
	const context = useContext(AuthContext);
	if (context === null) {
		throw new Error("useTourContext must be used within an TourProvider");
	}
	return context;
}
