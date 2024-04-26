import { fetcher } from "@/data/fetch";
import { useServerInfo } from "@/data/server/info-query";
import { useCurrentUser } from "@/data/users/current-user-query";

import { routes } from "@/router/routes";
import { PageEvent, PageEventContext, PageEventPage, PageEventProperties } from "@/types/analytics";
import { useEffect } from "react";
import { matchPath, useLocation } from "react-router-dom";

export function Analytics() {
	const { data } = useServerInfo();
	const { data: userData } = useCurrentUser();
	const location = useLocation();

	useEffect(() => {
		if (data && data.analytics_enabled && userData) {
			performPageEvent(
				"ZenML OS Dashboard",
				"",
				{ isDebug: data.debug || false, userId: userData.id },
				{
					server_id: data.id,
					...data.metadata
				}
			);
		}
	}, [location.pathname, location.search, data?.analytics_enabled, userData?.id]);

	return null;
}

function performPageEvent(
	category: string,
	name: string,
	metadata: { userId: string; isDebug: boolean },
	properties: Record<string, any>
) {
	const page: PageEventPage = {
		path: removeUUIDSegmentsFromPath(location.pathname),
		referrer: document.referrer,
		search: location.search,
		title: document.title
	};
	const context: PageEventContext = {
		locale: navigator.language,
		timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
		userAgent: navigator.userAgent,
		page
	};
	const props: PageEventProperties = { ...page, category, ...properties };

	const pageEvent: PageEvent = {
		type: "page",
		user_id: metadata.userId,
		debug: metadata.isDebug,
		name,
		category,
		context,
		properties: props
	};

	return fetcher("https://analytics.zenml.io/batch", {
		method: "POST",
		credentials: "omit",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify([pageEvent])
	});
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
