import { createContext, Dispatch, SetStateAction, useContext, useState } from "react";

type UpgradeContextType = {
	submitSuccess: boolean;
	setSubmitSuccess: Dispatch<SetStateAction<boolean>>;
};

export const UpgradeContext = createContext<UpgradeContextType | null>(null);

export function UpgradeProvider({ children }: { children: React.ReactNode }) {
	const [success, setSuccess] = useState(false);
	return (
		<UpgradeContext.Provider
			value={{
				setSubmitSuccess: setSuccess,
				submitSuccess: success
			}}
		>
			{children}
		</UpgradeContext.Provider>
	);
}

export function useUpgradeContext() {
	const context = useContext(UpgradeContext);
	if (context === null) {
		throw new Error("useUpgradeContext must be used within an UpgradeProvider");
	}
	return context;
}
