import { useEffect, useState } from "react";
import { getChangelogLastSeen } from "./persist-changelog";

export function useLastSeen() {
	const [lastSeenDate, setLastSeenDate] = useState<Date | null>(null);

	useEffect(() => {
		const lastSeen = getChangelogLastSeen();
		setLastSeenDate(lastSeen);
	}, []);

	return { lastSeenDate };
}
