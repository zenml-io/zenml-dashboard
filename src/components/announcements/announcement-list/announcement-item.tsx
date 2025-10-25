import ExternalLink from "@/assets/icons/link-external.svg?react";
import { DisplayDate } from "@/components/DisplayDate";
import { Announcement } from "@/data/announcements/announcement-schema";
import { Button, Tag } from "@zenml-io/react-component-library";
import Markdown from "react-markdown";
import { AnnouncementImagePlaceholder } from "../placeholder";
import { useAnnouncementLastSeen } from "../use-last-seen";

export function AnnouncementItem({ item }: { item: Announcement }) {
	const lastSeenTimestamp = useAnnouncementLastSeen("lastSeen");

	const isNew =
		lastSeenTimestamp !== null && new Date(item.published_at).getTime() > lastSeenTimestamp;

	return (
		<div className="space-y-3">
			<AnnouncementImagePlaceholder>
				{isNew && (
					<Tag
						className="absolute right-2 top-2"
						color="red"
						size="xs"
						rounded={false}
						emphasis="bold"
					>
						New
					</Tag>
				)}
			</AnnouncementImagePlaceholder>
			<div className="text-text-sm font-semibold text-theme-text-brand">
				<DisplayDate short justDate dateString={item.published_at} />
			</div>
			<div className="space-y-1">
				<h3 className="text-text-xl font-semibold">{item.title}</h3>
				<ul className="flex flex-wrap items-center gap-0.5">
					{item.labels.map((label) => (
						<li className="inline-flex" key={label.id}>
							<Tag color="green" size="xs" rounded={false} emphasis="subtle">
								{label.name}
							</Tag>
						</li>
					))}
				</ul>
			</div>
			{item.description_md && <Markdown className="prose">{item.description_md}</Markdown>}
			{item.learn_more_url && (
				<Button size="sm" emphasis="subtle" className="inline-flex" intent="secondary" asChild>
					<a href={item.learn_more_url} target="_blank" rel="noopener noreferrer">
						<ExternalLink className="size-3 shrink-0 fill-inherit" />
						<span>Learn more</span>
					</a>
				</Button>
			)}
		</div>
	);
}
