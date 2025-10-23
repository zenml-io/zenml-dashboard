import Speaker from "@/assets/icons/announcement.svg?react";

export function AnnouncementEmptyState() {
	return (
		<div className="p-5">
			<div className="flex flex-col items-center justify-center space-y-5 rounded-md border border-dashed border-theme-border-moderate p-5">
				<Speaker className="size-10 shrink-0 fill-neutral-300" />
				<div className="space-y-0.5 text-center">
					<p className="text-text-lg font-semibold text-theme-text-primary">No Announcements</p>
					<p className="text-theme-text-secondary">There are no announcements to display.</p>
				</div>
			</div>
		</div>
	);
}
