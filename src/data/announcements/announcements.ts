import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { Announcements, announcementsSchema } from "./announcement-schema";

async function fetchAnnouncements() {
	const url = "/announcements.json";
	const response = await fetch(url);
	if (!response.ok) {
		throw new Error("Failed to fetch announcements");
	}
	const data = await response.json();
	const parsedData = announcementsSchema.safeParse(data);
	if (!parsedData.success) throw new Error("Failed to parse Changelogs");
	return parsedData.data;
}

export function useAnnouncements(
	options?: Omit<UseQueryOptions<Announcements>, "queryKey" | "queryFn">
) {
	return useQuery<Announcements>({
		queryKey: ["announcements"],
		queryFn: async () => fetchAnnouncements(),
		...options
	});
}
