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
