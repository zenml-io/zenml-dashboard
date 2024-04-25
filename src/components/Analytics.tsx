import { useServerInfo } from "@/data/server/info-query";
import { analytics } from "@/lib/segment";
import { routes } from "@/router/routes";
import { useEffect } from "react";
import { matchPath, useLocation } from "react-router-dom";

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
			analytics.page("ZenML OS Dashboard", "", {
				url: undefined,
				path: removeUUIDSegmentsFromPath(location.pathname),
				server_id: data.id,
				...data.metadata
			});
		}
	}, [location.pathname, location.search]);

	return null;
}

function removeUUIDSegmentsFromPath(path: string): string {
	const isPipelineNamespace = matchPath(routes.pipelines.namespace(":namespace"), path);

	// special behavior, as the pipeline namespace is not a uuid
	if (isPipelineNamespace) {
		const namespace = isPipelineNamespace.params.namespace;
		const cleanedPath = path.replace(namespace!, "<namespace>");
		return cleanedPath;
	}
	const uuidv4Pattern = /[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}/gi;
	const cleanedPath = path.replace(uuidv4Pattern, "<id>");
	return cleanedPath;
}
