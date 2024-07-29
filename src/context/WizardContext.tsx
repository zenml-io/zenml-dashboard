import { Dispatch, SetStateAction, createContext, useContext, useState } from "react";

type WizardContextType = {
	currentStep: number;
	setCurrentStep: Dispatch<SetStateAction<number>>;
	maxSteps: number;
};

export const WizardContext = createContext<WizardContextType | null>(null);

export function WizardProvider({
	children,
	initialStep = 0,
	maxSteps
}: {
	children: React.ReactNode;
	initialStep?: number;
	maxSteps: number;
}) {
	const [currentStep, setCurrentStep] = useState(initialStep);
	return (
		<WizardContext.Provider value={{ currentStep, setCurrentStep, maxSteps }}>
			{children}
		</WizardContext.Provider>
	);
}

export function useWizardContext() {
	const context = useContext(WizardContext);
	if (context === null) {
		throw new Error("useWizardContext must be used within an AuthProvider");
	}
	return context;
}
