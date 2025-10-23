import { useEffect, useState } from "react";
import { getAnnouncementLastSeen } from "./persist-announcement";

export function useAnnouncementLastSeen() {
	const [lastSeenDate, setLastSeenDate] = useState<Date | null>(null);

	useEffect(() => {
		const lastSeen = getAnnouncementLastSeen();
		setLastSeenDate(lastSeen);
	}, []);

	return { lastSeenDate };
}
