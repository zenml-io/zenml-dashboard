import { Dispatch, SetStateAction, createContext, useContext, useState } from "react";

type AuthContextType = {
	currentStep: number;
	setCurrentStep: Dispatch<SetStateAction<number>>;
	isNextButtonDisabled: boolean;
	setIsNextButtonDisabled: Dispatch<SetStateAction<boolean>>;
};

export const NewInfraContext = createContext<AuthContextType | null>(null);

export function NewInfraProvider({ children }: { children: React.ReactNode }) {
	const [currentStep, setCurrentStep] = useState(1);
	const [isNextButtonDisabled, setIsNextButtonDisabled] = useState(false);

	return (
		<NewInfraContext.Provider
			value={{ currentStep, setCurrentStep, isNextButtonDisabled, setIsNextButtonDisabled }}
		>
			{children}
		</NewInfraContext.Provider>
	);
}

export function useNewInfraContext() {
	const context = useContext(NewInfraContext);
	if (context === null) {
		throw new Error("useNewInfraContext must be used within an AuthProvider");
	}
	return context;
}
