import { StackDeploymentProvider } from "@/types/stack";
import { Dispatch, SetStateAction, createContext, useContext, useRef, useState } from "react";
import { parseWizardData } from "./persist";

type Data = {
	provider?: StackDeploymentProvider;
	location?: string;
	stackName?: string;
};

type NewInfraFormType = {
	isNextButtonDisabled: boolean;
	setIsNextButtonDisabled: Dispatch<SetStateAction<boolean>>;
	data: Data;
	setData: Dispatch<SetStateAction<Data>>;
	formRef: React.RefObject<HTMLFormElement>;
	setTimestamp: Dispatch<SetStateAction<string>>;
	timestamp: string;
	isLoading: boolean;
	setIsLoading: Dispatch<SetStateAction<boolean>>;
};

export const NewInfraFormContext = createContext<NewInfraFormType | null>(null);

export function NewInfraFormProvider({ children }: { children: React.ReactNode }) {
	const { success, data: parsedData } = parseWizardData();

	const [isNextButtonDisabled, setIsNextButtonDisabled] = useState(false);
	const [isLoading, setIsLoading] = useState(success ? true : false);
	const [data, setData] = useState<Data>(
		success
			? {
					location: parsedData.location,
					provider: parsedData.provider,
					stackName: parsedData.stackName
				}
			: {}
	);
	const [timestamp, setTimestamp] = useState<string>(success ? parsedData.timestamp : "");
	const formRef = useRef<HTMLFormElement>(null);

	return (
		<NewInfraFormContext.Provider
			value={{
				isNextButtonDisabled,
				setIsNextButtonDisabled,
				data,
				setData,
				isLoading,
				setIsLoading,
				formRef,
				timestamp,
				setTimestamp
			}}
		>
			{children}
		</NewInfraFormContext.Provider>
	);
}

export function useNewInfraFormContext() {
	const context = useContext(NewInfraFormContext);
	if (context === null) {
		throw new Error("useNewInfraFormContext must be used within an AuthProvider");
	}
	return context;
}
