import { DisplayDate } from "@/components/DisplayDate";
import { Announcement } from "@/types/announcements";
import Markdown from "react-markdown";
import { AnnouncementImage } from "../announcement-image";
import { AnnouncementLabel } from "../announcement-label";
import { AnnouncementLinks } from "../announcement-links";
import { AnnouncementVideo } from "../announcement-video";

export function AnnouncementItem({ item }: { item: Announcement }) {
	return (
		<div className="space-y-3">
			{item.video_url ? (
				<AnnouncementVideo className="rounded-md" videoUrl={item.video_url} />
			) : (
				<AnnouncementImage
					className="rounded-md"
					title={item.title}
					imageUrl={item.feature_image_url}
				/>
			)}
			<div className="text-text-sm font-semibold text-theme-text-brand">
				<DisplayDate short justDate dateString={item.published_at} />
			</div>
			<div className="space-y-1">
				<h3 className="text-text-xl font-semibold">{item.title}</h3>
				<ul className="flex flex-wrap items-center gap-0.5">
					{item.labels.map((label) => (
						<li className="inline-flex" key={label}>
							<AnnouncementLabel label={label} />
						</li>
					))}
				</ul>
			</div>
			{item.description && <Markdown className="prose">{item.description}</Markdown>}
			{(item.learn_more_url || item.docs_url) && (
				<AnnouncementLinks
					docs_url={item.docs_url}
					learn_more_url={item.learn_more_url}
					slug={item.slug}
					size="sm"
				/>
			)}
		</div>
	);
}
