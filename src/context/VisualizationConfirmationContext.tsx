import {
	Dispatch,
	PropsWithChildren,
	SetStateAction,
	createContext,
	useContext,
	useState
} from "react";

type VisualizationConfirmContextProps = {
	isVisualizationConfirmed: boolean;
	setVisualizationConfirmed: Dispatch<SetStateAction<boolean>>;
};

const VisualizationConfirmContext = createContext<VisualizationConfirmContextProps | null>(null);

export function VisualizationConfirmProvider({ children }: PropsWithChildren) {
	const [isConfirmed, setIsConfirmed] = useState(false);
	return (
		<VisualizationConfirmContext.Provider
			value={{ isVisualizationConfirmed: isConfirmed, setVisualizationConfirmed: setIsConfirmed }}
		>
			{children}
		</VisualizationConfirmContext.Provider>
	);
}

export function useArtifactLoadConfirmationContext() {
	const context = useContext(VisualizationConfirmContext);
	if (!context)
		throw new Error(
			"useArtifactLoadConfirmationContext must be used within a VisualizationConfirmProvider"
		);
	return context;
}
