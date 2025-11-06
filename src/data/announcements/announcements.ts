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
	if (!parsedData.success) {
		console.error(parsedData.error);
		throw new Error("Failed to parse Changelogs");
	}
	const sortedData = parsedData.data
		.filter((item) => item.audience !== "pro")
		.filter((item) => item.published === true)
		.sort((a, b) => {
			return new Date(b.published_at).getTime() - new Date(a.published_at).getTime();
		});
	return sortedData;
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
