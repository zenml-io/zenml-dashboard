import { prepareBackendTimestamp, secondsToTimeString } from "@/lib/dates";
import { useEffect, useState } from "react";

type Props = {
	startTime: string;
};

function calculateElapsedSeconds(startTime: string): number {
	const start = prepareBackendTimestamp(startTime);
	const now = new Date();
	return Math.max(0, Math.floor((now.getTime() - start.getTime()) / 1000));
}

export function ElapsedTime({ startTime }: Props) {
	const [elapsed, setElapsed] = useState(() => calculateElapsedSeconds(startTime));

	useEffect(() => {
		const interval = setInterval(() => {
			setElapsed(calculateElapsedSeconds(startTime));
		}, 1000);

		return () => clearInterval(interval);
	}, [startTime]);

	return <>{secondsToTimeString(elapsed)}</>;
}
