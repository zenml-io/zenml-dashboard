import { useAnalyticsEvent } from "@/data/analytics/event";
import { useServerInfo } from "@/data/server/info-query";
import { useCurrentUser } from "@/data/users/current-user-query";
import { TrackEvent } from "@/types/analytics";

export function useWhatsNewAnalytics() {
	const { data: serverInfo } = useServerInfo();
	const { data: userData } = useCurrentUser();
	const analyticsEvent = useAnalyticsEvent();

	const trackChangelogOpened = () => {
		if (serverInfo?.analytics_enabled && userData?.id) {
			const trackEvent: TrackEvent = {
				type: "track",
				user_id: userData.id,
				debug: serverInfo.debug || false,
				event: "Changelog opened",
				properties: {}
			};

			// analyticsEvent.mutate(trackEvent);
			console.log(trackEvent);
		}
	};

	return { trackChangelogOpened };
}
