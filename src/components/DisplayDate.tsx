import { prepareBackendTimestamp } from "@/lib/dates";

export function DisplayDate({
	dateString,
	short = false
}: {
	dateString: string;
	short?: boolean;
}) {
	const date = prepareBackendTimestamp(dateString);

	return <>{short ? formatShortDate(date) : date.toLocaleString()}</>;
}

function formatShortDate(date: Date) {
	const dateOptions: Intl.DateTimeFormatOptions = {
		month: "short",
		day: "numeric",
		year: "numeric"
	};
	const timeOptions: Intl.DateTimeFormatOptions = {
		hour: "numeric",
		minute: "numeric",
		hour12: false
	};

	const formattedDate = date.toLocaleDateString("en-US", dateOptions);
	const formattedTime = date.toLocaleTimeString("en-US", timeOptions);
	return `${formattedDate} ${formattedTime}`;
}
