import { useAnalyticsEvent } from "@/data/analytics/event";
import { useServerInfo } from "@/data/server/info-query";
import { useCurrentUser } from "@/data/users/current-user-query";
import { TrackEvent } from "@/types/analytics";

export function useAnnouncementItemClickedAnalytics() {
	const { data: serverInfo } = useServerInfo();
	const { data: userData } = useCurrentUser();
	const analyticsEvent = useAnalyticsEvent();

	const trackAnnouncementItemClicked = (slug: string) => {
		if (serverInfo?.analytics_enabled && userData?.id) {
			const trackEvent: TrackEvent = {
				type: "track",
				user_id: userData.id,
				debug: serverInfo.debug || false,
				event: "Announcement Item clicked",
				properties: {
					zenml_version: serverInfo.version,
					clicked_item_slug: slug
				}
			};

			analyticsEvent.mutate(trackEvent);
		}
	};

	return { trackAnnouncementItemClicked };
}
