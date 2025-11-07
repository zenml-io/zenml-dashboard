import ExternalLink from "@/assets/icons/link-external.svg?react";
import { DisplayDate } from "@/components/DisplayDate";
import { Announcement } from "@/lib/schema";
import { Button } from "@zenml-io/react-component-library";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { AnnouncementLabel } from "./announcement-label";
import { AnnouncementVideo } from "./announcement-video";
import { useAnnouncementItemClickedAnalytics } from "./use-announcement-item-analytics";
import { AnnouncementImage } from "./announcement-image";

export function AnnouncementItem({ item }: { item: Announcement }) {
	const { trackAnnouncementItemClicked } = useAnnouncementItemClickedAnalytics();
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
			{item.description && (
				<Markdown className="prose prose-sm max-w-none" remarkPlugins={[remarkGfm]}>
					{item.description}
				</Markdown>
			)}
			{item.learn_more_url && (
				<Button size="sm" emphasis="subtle" className="inline-flex" intent="secondary" asChild>
					<a
						onClick={() => trackAnnouncementItemClicked(item.slug)}
						href={item.learn_more_url}
						target="_blank"
						rel="noopener noreferrer"
					>
						<ExternalLink className="size-3 shrink-0 fill-inherit" />
						<span>Learn more</span>
					</a>
				</Button>
			)}
		</div>
	);
}
