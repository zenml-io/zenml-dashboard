export function calculateTimeDifference(start_time?: string, end_time?: string) {
	if (!start_time || !end_time) {
		return "Not available";
	}
	const startTime = new Date(start_time);
	const endTime = new Date(end_time);

	if (isNaN(startTime.getTime()) || isNaN(endTime.getTime())) {
		return "";
	}

	// Calculate the difference in milliseconds
	const diffInMilliseconds = Math.abs(endTime.getTime() - startTime.getTime());

	// Convert milliseconds to minutes and seconds
	const minutes = Math.floor(diffInMilliseconds / (1000 * 60));
	const seconds = Math.floor((diffInMilliseconds % (1000 * 60)) / 1000);

	// Format the result
	return `${minutes}min ${seconds}s`;
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
