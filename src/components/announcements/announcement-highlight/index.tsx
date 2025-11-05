import ExternalLink from "@/assets/icons/link-external.svg?react";
import { Markdown } from "@/components/Markdown";
import { useAnnouncements } from "@/data/announcements/announcements";
import {
	Button,
	Dialog,
	DialogContent,
	DialogDescription,
	DialogTitle
} from "@zenml-io/react-component-library";
import { useEffect, useState } from "react";
import { AnnouncementLabel } from "../announcement-label";
import { announcementStore } from "../persist-announcement";
import { AnnouncementImage } from "../announcement-image";
import { AnnouncementHighlightPageIndicator } from "./page-indicator";
import { useNewAnnouncementHighlights } from "./use-new-highlights";

export function AnnouncementHighlight() {
	const announcementsQuery = useAnnouncements();
	const newFeatureHighlights = useNewAnnouncementHighlights(announcementsQuery.data);
	const [open, setOpen] = useState(false);
	const [currentPage, setCurrentPage] = useState(0);

	useEffect(() => {
		if (newFeatureHighlights.length >= 1) {
			setOpen(true);
		}
	}, [newFeatureHighlights]);

	function handleChange(open: boolean) {
		setOpen(open);
		setCurrentPage(0);
		if (!open) {
			announcementStore.setAnnouncementLastSeen("lastSeenHighlights");
		}
	}

	function handleNext() {
		const isLast = currentPage === newFeatureHighlights.length - 1;
		if (isLast) {
			handleChange(false);
		} else {
			setCurrentPage((prev) => prev + 1);
		}
	}

	const highlightedFeatureCount = newFeatureHighlights.length;
	if (highlightedFeatureCount === 0) return null;

	const isLastPage = currentPage === highlightedFeatureCount - 1;
	const currentItem = newFeatureHighlights[currentPage];

	return (
		<Dialog open={open} onOpenChange={handleChange}>
			<DialogContent className="flex max-w-[600px] flex-col overflow-hidden">
				<AnnouncementImage title={currentItem.title} imageUrl={currentItem.feature_image_url} />
				<div className="space-y-5 p-5">
					<AnnouncementHighlightPageIndicator
						currentPage={currentPage}
						totalPages={highlightedFeatureCount}
					/>
					<div className="space-y-3">
						<div className="space-y-1">
							<DialogTitle className="text-display-xs font-semibold">
								{currentItem.title}
							</DialogTitle>
							<DialogDescription className="sr-only">
								Announcement Highlight: {currentItem.title}
							</DialogDescription>
							<ul className="flex flex-wrap items-center gap-0.5">
								{currentItem.labels.map((label, idx) => (
									<li className="inline-flex" key={idx}>
										<AnnouncementLabel label={label} />
									</li>
								))}
							</ul>
						</div>
						<Markdown
							className="prose text-theme-text-secondary"
							markdown={currentItem.description_md}
						/>
					</div>
				</div>
				<div className="flex items-center justify-end gap-2 p-5">
					{currentItem.learn_more_url && (
						<Button size="md" emphasis="subtle" className="inline-flex" intent="secondary" asChild>
							<a href={currentItem.learn_more_url} target="_blank" rel="noopener noreferrer">
								<ExternalLink className="size-4 shrink-0 fill-inherit" />
								<span>Learn more</span>
							</a>
						</Button>
					)}
					<Button size="md" onClick={handleNext}>
						{isLastPage ? "Got it" : "Next"}
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	);
}
