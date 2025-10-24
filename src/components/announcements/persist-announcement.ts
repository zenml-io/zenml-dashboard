import { z } from "zod";

const ANNOUNCEMENT_KEY = "zenml.announcement.last-seen";

const announcementTimestampSchema = z.number();

// Set to store all subscribers
const listeners = new Set<() => void>();

// Helper to notify all listeners
function emitChange() {
	listeners.forEach((listener) => listener());
}

function getAnnouncementLastSeen(): number | null {
	try {
		const timestamp = localStorage.getItem(ANNOUNCEMENT_KEY);
		if (timestamp === null) return null;

		const parsed = announcementTimestampSchema.safeParse(JSON.parse(timestamp));
		return parsed.success ? parsed.data : null;
	} catch (_) {
		setAnnouncementLastSeen();
		return null;
	}
}

function setAnnouncementLastSeen(): void {
	const timestamp = Date.now();
	localStorage.setItem(ANNOUNCEMENT_KEY, JSON.stringify(timestamp));
}

function removeAnnouncementLastSeen(): void {
	localStorage.removeItem(ANNOUNCEMENT_KEY);
}

export const announcementStore = {
	getSnapshot: () => {
		return getAnnouncementLastSeen();
	},
	setAnnouncementLastSeen: () => {
		setAnnouncementLastSeen();
		emitChange();
	},
	removeAnnouncementLastSeen: () => {
		removeAnnouncementLastSeen();
		emitChange();
	},
	subscribe: (listener: () => void) => {
		// Add listener to the set
		listeners.add(listener);

		// Listen for storage events (cross-tab synchronization)
		const handleStorageChange = (e: StorageEvent) => {
			if (e.key === ANNOUNCEMENT_KEY) {
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
