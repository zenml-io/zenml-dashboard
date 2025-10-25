import { cn } from "@zenml-io/react-component-library";
import { useNewAnnouncements } from "./use-new-announcements";

type Props = {
	className?: string;
};

export function AnnouncementIndicator({ className }: Props) {
	const newPublishedItems = useNewAnnouncements("lastSeen");
	const hasNewAnnouncements = newPublishedItems.length > 0;

	if (!hasNewAnnouncements) return null;

	return (
		<div
			className={cn("z-10 size-1 shrink-0 rounded-rounded bg-theme-text-error", className)}
		></div>
	);
}
