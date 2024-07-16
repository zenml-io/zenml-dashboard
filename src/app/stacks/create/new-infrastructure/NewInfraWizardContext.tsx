import { Dispatch, SetStateAction, createContext, useContext, useState } from "react";

type NewInfraWizardType = {
	currentStep: number;
	setCurrentStep: Dispatch<SetStateAction<number>>;
};

export const NewInfraWizardContext = createContext<NewInfraWizardType | null>(null);

export function NewInfraWizardProvider({
	children,
	initialStep = 1
}: {
	children: React.ReactNode;
	initialStep?: number;
}) {
	const [currentStep, setCurrentStep] = useState(initialStep);

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
