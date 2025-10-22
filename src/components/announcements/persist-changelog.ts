import { z } from "zod";

const CHANGELOG_KEY = "zenml.changelog.last-seen";

export const changelogTimestampSchema = z.number();

export function getChangelogLastSeen() {
	try {
		const timestamp = localStorage.getItem(CHANGELOG_KEY);
		if (timestamp === null) {
			return null;
		}
		const parsed = changelogTimestampSchema.safeParse(JSON.parse(timestamp));
		if (!parsed.success) return null;

		const date = new Date(parsed.data);
		return date;
	} catch (_) {
		setChangelogLastSeen();
		return null;
	}
}

export function setChangelogLastSeen(): void {
	const timestamp = Date.now();
	localStorage.setItem(CHANGELOG_KEY, JSON.stringify(timestamp));
}

export function removeChangelogLastSeen(): void {
	localStorage.removeItem(CHANGELOG_KEY);
}
