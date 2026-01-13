export function calculateTimeDifference(start_time?: string, end_time?: string) {
	if (!start_time || !end_time) {
		return "Not available";
	}
	const startTime = new Date(start_time);
	const endTime = new Date(end_time);

	if (isNaN(startTime.getTime()) || isNaN(endTime.getTime())) {
		return "";
	}

	const diffInSeconds = Math.abs(endTime.getTime() - startTime.getTime()) / 1000;
	return secondsToTimeString(diffInSeconds);
}

export function is6monthsOld(date: Date) {
	const now = new Date();
	const sixMonthsAgo = new Date();
	sixMonthsAgo.setMonth(now.getMonth() - 6);

	return date < sixMonthsAgo;
}

export function is1yearOld(date: Date) {
	const now = new Date();
	const oneYearAgo = new Date();
	oneYearAgo.setFullYear(now.getFullYear() - 1);

	return date < oneYearAgo;
}

export function secondsToTimeString(seconds: number) {
	const hours = Math.floor(seconds / 3600);
	const minutes = Math.floor((seconds % 3600) / 60);
	const remainingSeconds = Math.floor(seconds % 60);

	const parts: string[] = [];

	if (hours > 0) {
		parts.push(`${hours}h`);
	}

	if (minutes > 0) {
		parts.push(`${minutes}min`);
	}

	if (parts.length === 0 || remainingSeconds > 0) {
		parts.push(`${remainingSeconds}s`);
	}

	return parts.join(" ");
}

export function prepareBackendTimestamp(dateString: string | number) {
	if (typeof dateString === "number") {
		return new Date(dateString);
	}
	if (!dateString.endsWith("Z")) {
		return new Date(dateString + "Z");
	}
	return new Date(dateString);
}
