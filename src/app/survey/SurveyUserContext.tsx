import { UpdateUser } from "@/types/user";
import { Dispatch, SetStateAction, createContext, useContext, useState } from "react";

type SurveyUserContextType = {
	user: UpdateUser;
	setUser: Dispatch<SetStateAction<UpdateUser>>;
};

export const SurveyUserContext = createContext<SurveyUserContextType | null>(null);

export function SurveyUserProvider({
	children,
	initialUser
}: {
	children: React.ReactNode;
	initialUser?: UpdateUser;
}) {
	const [user, setUser] = useState<UpdateUser>(initialUser || {});
	return (
		<SurveyUserContext.Provider value={{ user, setUser }}>{children}</SurveyUserContext.Provider>
	);
}

export function useSurveyUserContext() {
	const context = useContext(SurveyUserContext);
	if (context === null) {
		throw new Error("useSurveyUserContext must be used within an SurveyUserProvider");
	}
	return context;
}
