import { StackDeploymentProvider } from "@/types/stack";
import { Dispatch, SetStateAction, createContext, useContext, useRef, useState } from "react";

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
};

export const NewInfraFormContext = createContext<NewInfraFormType | null>(null);

export function NewInfraFormProvider({ children }: { children: React.ReactNode }) {
	const [isNextButtonDisabled, setIsNextButtonDisabled] = useState(false);
	const [data, setData] = useState<Data>({});
	const [timestamp, setTimestamp] = useState<string>("");
	const formRef = useRef<HTMLFormElement>(null);

	return (
		<NewInfraFormContext.Provider
			value={{
				isNextButtonDisabled,
				setIsNextButtonDisabled,
				data,
				setData,
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
