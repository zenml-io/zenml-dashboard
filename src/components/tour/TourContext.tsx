import { Dispatch, SetStateAction, createContext, useContext, useMemo, useState } from "react";

type TourState = {
	run: boolean;
	stepIndex: number;
	tourActive: boolean;
};

const initialTourState: TourState = {
	run: false,
	stepIndex: 0,
	tourActive: false
};

type TourContextType = {
	tourState: TourState;
	setTourState: Dispatch<SetStateAction<TourState>>;
};

export const TourContext = createContext<TourContextType | null>(null);

export function TourProvider({ children }: { children: React.ReactNode }) {
	const [tourState, setTourState] = useState<TourState>(initialTourState);

	const value = useMemo(() => ({ tourState, setTourState }), [tourState, setTourState]);

	return <TourContext.Provider value={value}>{children}</TourContext.Provider>;
}

export function useTourContext() {
	const context = useContext(TourContext);
	if (context === null) {
		throw new Error("useTourContext must be used within an TourProvider");
	}
	return context;
}
