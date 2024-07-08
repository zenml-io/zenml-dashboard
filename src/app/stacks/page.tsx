import { useTourContext } from "@/components/tour/TourContext";
import { useEffect } from "react";
import { StacksHeader } from "./Fallback/Fragments";
import { StackList } from "./StackList";
import { useBreadcrumbsContext } from "@/layouts/AuthenticatedLayout/BreadcrumbsContext";

export default function StacksPage() {
	const { setCurrentBreadcrumbData } = useBreadcrumbsContext();

	const {
		setTourState,
		tourState: { tourActive }
	} = useTourContext();

	useEffect(() => {
		if (tourActive) {
			setTourState((prev) => ({ ...prev, run: true, stepIndex: prev.stepIndex }));
		}
	}, [tourActive]);

	useEffect(() => {
		setCurrentBreadcrumbData({ segment: "stacks", data: null });
	}, []);

	return (
		<div>
			<StacksHeader />
			<StackList />
		</div>
	);
}
