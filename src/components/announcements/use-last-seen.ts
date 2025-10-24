import { useSyncExternalStore } from "react";
import { announcementStore } from "./persist-announcement";

export function useAnnouncementLastSeen() {
	return useSyncExternalStore(announcementStore.subscribe, announcementStore.getSnapshot);
}
