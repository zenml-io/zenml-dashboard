import { useWizardContext } from "@/context/WizardContext";
import { StackDeploymentProvider } from "@/types/stack";
import { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from "react";
import { parseWizardData } from "./persist";

type Data = {
	provider?: StackDeploymentProvider;
	location?: string;
	stackName?: string;
};

type createTerraformFormType = {
	data: Data;
	setData: Dispatch<SetStateAction<Data>>;
	setTimestamp: Dispatch<SetStateAction<string>>;
	timestamp: string;
};

export const CreateTerraformContext = createContext<createTerraformFormType | null>(null);

export function CreateTerraformProvider({ children }: { children: React.ReactNode }) {
	const { setCurrentStep } = useWizardContext();
	const [data, setData] = useState<Data>({});
	const [timestamp, setTimestamp] = useState<string>("");

	useEffect(() => {
		const { success, data: parsedData } = parseWizardData();
		if (success) {
			setCurrentStep(3);
			setData({
				location: parsedData.location,
				provider: parsedData.provider,
				stackName: parsedData.stackName
			});
			setTimestamp(parsedData.timestamp);

			return;
		}
		setCurrentStep(1);
	}, [parseWizardData]);

	return (
		<CreateTerraformContext.Provider
			value={{
				data,
				setData,
				timestamp,
				setTimestamp
			}}
		>
			{children}
		</CreateTerraformContext.Provider>
	);
}

export function useCreateTerraformContext() {
	const context = useContext(CreateTerraformContext);
	if (context === null) {
		throw new Error("useCreateTerraformContext must be used within an CreateTerraformContext");
	}
	return context;
}
