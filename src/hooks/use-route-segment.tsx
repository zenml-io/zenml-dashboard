import { useLocation } from "react-router-dom";

export function useRouteSegment(index = 1) {
	const { pathname } = useLocation();
	const segments = pathname.split("/").filter(Boolean);
	return segments[index];
}
