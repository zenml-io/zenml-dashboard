import { Announcement } from "@/lib/schema";
import { AnnouncementItem } from "./announcements/announcement-item";

type Props = {
	announcements: Announcement[];
};

export function PreviewPanel({ announcements }: Props) {
	if (announcements.length === 0) {
		return (
			<div className="flex h-full items-center justify-center">
				<div className="text-center">
					<p className="text-text-lg font-semibold text-theme-text-secondary">
						No announcements to preview
					</p>
					<p className="mt-2 text-text-sm text-theme-text-tertiary">
						Upload or edit JSON to see preview
					</p>
				</div>
			</div>
		);
	}

	return (
		<div className="h-full w-full overflow-y-auto">
			<div className="layout-container space-y-8 py-8">
				{announcements.map((item) => (
					<div key={item.id}>
						<AnnouncementItem item={item} />
					</div>
				))}
			</div>
		</div>
	);
}
