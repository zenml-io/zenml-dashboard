import { useServerInfo } from "@/data/server/info-query";
import { analytics } from "@/lib/segment";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export function Analytics() {
	const { data } = useServerInfo({ throwOnError: true });
	const location = useLocation();
	useEffect(() => {
		if (data?.analytics_enabled) {
			analytics.load({
				writeKey: import.meta.env.VITE_SEGMENT_KEY
			});
		} else {
			analytics.reset();
		}
	}, [data?.analytics_enabled]);

	useEffect(() => {
		if (data?.analytics_enabled) {
			analytics.page("ZenML Dashboard");
		}
	}, [location.pathname]);

	return null;
}
