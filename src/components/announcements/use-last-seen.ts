import { useSyncExternalStore } from "react";
import { AnnouncementKey, announcementStore } from "./persist-announcement";

export function useAnnouncementLastSeen(key: AnnouncementKey) {
	return useSyncExternalStore(announcementStore.subscribe(key), () =>
		announcementStore.getSnapshot(key)
	);
}
