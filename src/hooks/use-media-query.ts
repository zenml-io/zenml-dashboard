import { useEffect, useState } from "react";

const MOBILE_BREAKPOINT = 768;

export function useMediaQuery(minWidth: number = MOBILE_BREAKPOINT) {
	const [isMobile, setIsMobile] = useState<boolean | undefined>(undefined);

	useEffect(() => {
		const mql = window.matchMedia(`(min-width: ${minWidth}px)`);
		const onChange = () => {
			setIsMobile(window.innerWidth < minWidth);
		};
		mql.addEventListener("change", onChange);
		setIsMobile(window.innerWidth < minWidth);
		return () => mql.removeEventListener("change", onChange);
	}, [minWidth]);

	return !!isMobile;
}
