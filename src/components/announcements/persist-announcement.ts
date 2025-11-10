import { z } from "zod";

const ANNOUNCEMENT_KEYS = {
	lastSeen: "zenml.announcement.last-seen",
	lastSeenHighlights: "zenml.announcement.last-seen-highlights"
} as const;

export type AnnouncementKey = keyof typeof ANNOUNCEMENT_KEYS;

const announcementTimestampSchema = z.number();

// Set to store all subscribers
const listeners = new Set<() => void>();

// Helper to notify all listeners
function emitChange() {
	listeners.forEach((listener) => listener());
}

function getAnnouncementLastSeen(key: AnnouncementKey): number | null {
	try {
		const timestamp = localStorage.getItem(ANNOUNCEMENT_KEYS[key]);
		if (timestamp === null) return null;

		const parsed = announcementTimestampSchema.safeParse(JSON.parse(timestamp));
		return parsed.success ? parsed.data : null;
	} catch (_) {
		setAnnouncementLastSeen(key);
		return null;
	}
}

function setAnnouncementLastSeen(key: AnnouncementKey): void {
	const timestamp = Date.now();
	localStorage.setItem(ANNOUNCEMENT_KEYS[key], JSON.stringify(timestamp));
}

function setAnnouncementLastSeenTimestamp(key: AnnouncementKey, timestamp: number): void {
	localStorage.setItem(ANNOUNCEMENT_KEYS[key], JSON.stringify(timestamp));
}

function removeAnnouncementLastSeen(key: AnnouncementKey): void {
	localStorage.removeItem(ANNOUNCEMENT_KEYS[key]);
}

export const announcementStore = {
	getSnapshot: (key: AnnouncementKey) => {
		return getAnnouncementLastSeen(key);
	},
	setAnnouncementLastSeen: (key: AnnouncementKey) => {
		setAnnouncementLastSeen(key);
		emitChange();
	},
	setAnnouncementLastSeenTimestamp: (key: AnnouncementKey, timestamp: number) => {
		setAnnouncementLastSeenTimestamp(key, timestamp);
		emitChange();
	},
	removeAnnouncementLastSeen: (key: AnnouncementKey) => {
		removeAnnouncementLastSeen(key);
		emitChange();
	},
	subscribe: (key: AnnouncementKey) => (listener: () => void) => {
		// Add listener to the set
		listeners.add(listener);

		// Listen for storage events (cross-tab synchronization)
		const handleStorageChange = (e: StorageEvent) => {
			if (e.key === ANNOUNCEMENT_KEYS[key]) {
				listener();
			}
		};

		window.addEventListener("storage", handleStorageChange);

		// Return unsubscribe function
		return () => {
			listeners.delete(listener);
			window.removeEventListener("storage", handleStorageChange);
		};
	}
};
