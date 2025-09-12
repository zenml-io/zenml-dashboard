import { useCallback, useEffect, useRef, useState } from "react";

export function useRealtimeTimeline(isRunning: boolean) {
	const [currentTime, setCurrentTime] = useState(Date.now());
	const intervalRef = useRef<NodeJS.Timeout | null>(null);

	const updateCurrentTime = useCallback(() => {
		setCurrentTime(Date.now());
	}, []);

	useEffect(() => {
		if (isRunning) {
			intervalRef.current = setInterval(updateCurrentTime, 100);
		} else {
			if (intervalRef.current) {
				clearInterval(intervalRef.current);
				intervalRef.current = null;
			}
		}

		return () => {
			if (intervalRef.current) {
				clearInterval(intervalRef.current);
				intervalRef.current = null;
			}
		};
	}, [isRunning, updateCurrentTime]);

	return {
		currentTime
	};
}
