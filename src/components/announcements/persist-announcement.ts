import { z } from "zod";

const ANNOUNCEMENT_KEY = "zenml.announcement.last-seen";

export const announcementTimestampSchema = z.number();

export function getAnnouncementLastSeen() {
	try {
		const timestamp = localStorage.getItem(ANNOUNCEMENT_KEY);
		if (timestamp === null) {
			return null;
		}
		const parsed = announcementTimestampSchema.safeParse(JSON.parse(timestamp));
		if (!parsed.success) return null;

		const date = new Date(parsed.data);
		return date;
	} catch (_) {
		setAnnouncementLastSeen();
		return null;
	}
}

export function setAnnouncementLastSeen(): void {
	const timestamp = Date.now();
	localStorage.setItem(ANNOUNCEMENT_KEY, JSON.stringify(timestamp));
}

export function removeAnnouncementLastSeen(): void {
	localStorage.removeItem(ANNOUNCEMENT_KEY);
}
