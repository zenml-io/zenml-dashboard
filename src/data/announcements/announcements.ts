import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { AnnouncementList, announcementListSchema } from "../../types/announcements";

async function fetchAnnouncements() {
	const url = "https://raw.githubusercontent.com/zenml-io/zenml-changelog/HEAD/changelog.json";
	const response = await fetch(url);
	if (!response.ok) {
		throw new Error("Failed to fetch announcements");
	}
	const data = await response.json();
	const parsedData = announcementListSchema.safeParse(data);
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
	options?: Omit<UseQueryOptions<AnnouncementList>, "queryKey" | "queryFn">
) {
	return useQuery<AnnouncementList>({
		queryKey: ["announcements"],
		queryFn: async () => fetchAnnouncements(),
		...options
	});
}
