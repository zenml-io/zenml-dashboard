import AlertCircle from "@/assets/icons/alert-circle.svg?react";
import { prepareBackendTimestamp } from "@/lib/dates";
import { ReactNode, useEffect, useState } from "react";

function calculateTimeLeft(expires: string) {
	const expiryDate = prepareBackendTimestamp(expires);
	const now = new Date();

	if (expiryDate < now) {
		return "Expired";
	}

	const diffMs = expiryDate.getTime() - now.getTime();
	const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
	const diffHours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
	const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

	if (diffDays > 0) {
		return `in ${diffDays} ${diffDays === 1 ? "day" : "days"}`;
	} else if (diffHours > 0) {
		return `in ${diffHours} ${diffHours === 1 ? "hour" : "hours"}`;
	} else if (diffMinutes > 0) {
		return `in ${diffMinutes} ${diffMinutes === 1 ? "minute" : "minutes"}`;
	} else {
		return "in less than a minute";
	}
}

export function ExpiryDate({ expires }: { expires: string }): ReactNode {
	const [timeLeft, setTimeLeft] = useState<string>("");

	useEffect(() => {
		setTimeLeft(calculateTimeLeft(expires));
	}, [expires]);

	if (timeLeft === "Expired") {
		return (
			<div className="flex items-center space-x-0.5 text-theme-text-warning">
				<AlertCircle className="size-3 shrink-0 fill-theme-text-warning" />
				<span>Expired</span>
			</div>
		);
	}

	return <div>{timeLeft}</div>;
}
