import { Button } from "@zenml-io/react-component-library";
import ExternalLink from "@/assets/icons/link-external.svg?react";
import { useAnnouncementItemClickedAnalytics } from "./use-announcement-item-analytics";

type Props = {
	docs_url?: string;
	learn_more_url?: string;
	slug: string;
	size?: "sm" | "md";
};

export function AnnouncementLinks({ docs_url, learn_more_url, slug, size = "sm" }: Props) {
	const { trackAnnouncementItemClicked } = useAnnouncementItemClickedAnalytics();

	const iconSize = size === "sm" ? "size-3" : "size-4";

	return (
		<div className="flex gap-2">
			{learn_more_url && (
				<Button size={size} emphasis="subtle" className="inline-flex" intent="secondary" asChild>
					<a
						onClick={() => trackAnnouncementItemClicked(slug)}
						href={learn_more_url}
						target="_blank"
						rel="noopener noreferrer"
					>
						<ExternalLink className="size-3 shrink-0 fill-inherit" />
						<span>Learn more</span>
					</a>
				</Button>
			)}
			{docs_url && (
				<Button size={size} emphasis="subtle" className="inline-flex" intent="secondary" asChild>
					<a
						onClick={() => trackAnnouncementItemClicked(slug)}
						href={docs_url}
						target="_blank"
						rel="noopener noreferrer"
					>
						<ExternalLink className={`${iconSize} shrink-0 fill-inherit`} />
						<span>Read docs</span>
					</a>
				</Button>
			)}
		</div>
	);
}
