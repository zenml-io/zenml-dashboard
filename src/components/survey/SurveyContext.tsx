import { Dispatch, SetStateAction, createContext, useContext, useState } from "react";

type SuveyContextType = {
	surveyStep: number;
	setSurveyStep: Dispatch<SetStateAction<number>>;
};

export const SurveyContext = createContext<SuveyContextType | null>(null);

export function SurveyProvider({
	children,
	initialStep = 1
}: {
	children: React.ReactNode;
	initialStep?: number;
}) {
	const [surveyStep, setSurveyStep] = useState(initialStep);

	return (
		<SurveyContext.Provider value={{ surveyStep, setSurveyStep }}>
			{children}
		</SurveyContext.Provider>
	);
}

export function useSurvayContext() {
	const context = useContext(SurveyContext);
	if (context === null) {
		throw new Error("useSurvayContext must be used within an SurveyProvider");
	}
	return context;
}
