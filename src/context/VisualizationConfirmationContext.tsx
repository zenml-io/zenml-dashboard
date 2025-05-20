import { PropsWithChildren, createContext, useContext, useState } from "react";

export type VisualizationConfirmContextProps = {
	confirmedVisualizations: Set<number>;
	isVisualizationConfirmed: (index: number) => boolean;
	confirmVisualization: (index: number) => void;
	// resetVisualization: (index: number) => void;
	// resetAllVisualizations: () => void;
};

export const VisualizationConfirmContext = createContext<VisualizationConfirmContextProps | null>(
	null
);

export function VisualizationConfirmProvider({ children }: PropsWithChildren) {
	const [confirmedVisualizations, setConfirmedVisualizations] = useState<Set<number>>(new Set());

	const isVisualizationConfirmed = (index: number): boolean => {
		return confirmedVisualizations.has(index);
	};

	const confirmVisualization = (index: number): void => {
		setConfirmedVisualizations((prev) => {
			const next = new Set(prev);
			next.add(index);
			return next;
		});
	};

	// const resetVisualization = (index: number): void => {
	// 	setConfirmedVisualizations((prev) => {
	// 		const newMap = new Map(prev);
	// 		newMap.delete(index);
	// 		return newMap;
	// 	});
	// };

	// const resetAllVisualizations = (): void => {
	// 	setConfirmedVisualizations(new Map());
	// };

	return (
		<VisualizationConfirmContext.Provider
			value={{
				confirmedVisualizations,
				isVisualizationConfirmed,
				confirmVisualization
			}}
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
