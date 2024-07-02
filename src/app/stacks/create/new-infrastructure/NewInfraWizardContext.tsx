import { Dispatch, SetStateAction, createContext, useContext, useState } from "react";

type NewInfraWizardType = {
	currentStep: number;
	setCurrentStep: Dispatch<SetStateAction<number>>;
};

export const NewInfraWizardContext = createContext<NewInfraWizardType | null>(null);

export function NewInfraWizardProvider({ children }: { children: React.ReactNode }) {
	const [currentStep, setCurrentStep] = useState(1);

	return (
		<NewInfraWizardContext.Provider value={{ currentStep, setCurrentStep }}>
			{children}
		</NewInfraWizardContext.Provider>
	);
}

export function useNewInfraWizardContext() {
	const context = useContext(NewInfraWizardContext);
	if (context === null) {
		throw new Error("useNewInfraContext must be used within an AuthProvider");
	}
	return context;
}
