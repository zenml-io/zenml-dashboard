import { prepareBackendTimestamp } from "@/lib/dates";

export function DisplayDate({
	dateString,
	short = false,
	justDate = false
}: {
	dateString: string;
	short?: boolean;
	justDate?: boolean;
}) {
	const date = prepareBackendTimestamp(dateString);

	return <>{short ? formatShortDate(date, justDate) : date.toLocaleString()}</>;
}

function formatShortDate(date: Date, justDate: boolean) {
	const dateOptions: Intl.DateTimeFormatOptions = {
		month: "short",
		day: "numeric",
		year: "numeric"
	};

	const formattedDate = date.toLocaleDateString("en-US", dateOptions);
	if (justDate) {
		return formattedDate;
	}

	const timeOptions: Intl.DateTimeFormatOptions = {
		hour: "numeric",
		minute: "numeric",
		hour12: false
	};

	const formattedTime = date.toLocaleTimeString("en-US", timeOptions);
	return `${formattedDate} ${formattedTime}`;
}
