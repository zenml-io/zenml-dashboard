// Simplified analytics hook for preview app - no actual tracking
export function useAnnouncementItemClickedAnalytics() {
	const trackAnnouncementItemClicked = (_slug: string) => {
		// No-op in preview app
	};

	return { trackAnnouncementItemClicked };
}
