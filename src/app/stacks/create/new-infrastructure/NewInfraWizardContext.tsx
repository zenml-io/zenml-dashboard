import { Dispatch, SetStateAction, createContext, useContext, useState } from "react";

type NewInfraWizardType = {
	currentStep: number;
	setCurrentStep: Dispatch<SetStateAction<number>>;
	isLoading: boolean;
	setIsLoading: Dispatch<SetStateAction<boolean>>;
};

export const NewInfraWizardContext = createContext<NewInfraWizardType | null>(null);

export function NewInfraWizardProvider({ children }: { children: React.ReactNode }) {
	const [currentStep, setCurrentStep] = useState(1);
	const [isLoading, setIsLoading] = useState(false);

	return (
		<NewInfraWizardContext.Provider
			value={{ currentStep, setCurrentStep, isLoading, setIsLoading }}
		>
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
