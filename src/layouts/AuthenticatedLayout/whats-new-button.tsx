import Speaker from "@/assets/icons/announcement.svg?react";
import { AnnouncementIndicator } from "@/components/announcements/announcement-indicator";
import { DropdownMenuItem } from "@zenml-io/react-component-library/components/client";
import { useWhatsNewAnalytics } from "./use-whats-new-analytics";

type Props = {
	openDialog: () => void;
};

export default function WhatsNewButton({ openDialog }: Props) {
	const { trackChangelogOpened } = useWhatsNewAnalytics();

	const handleClick = () => {
		openDialog();
		trackChangelogOpened();
	};

	return (
		<DropdownMenuItem
			onSelect={handleClick}
			className="flex items-start gap-0.5 hover:cursor-pointer data-[highlighted]:bg-theme-surface-tertiary"
			icon={<Speaker />}
		>
			What's new
			<AnnouncementIndicator />
		</DropdownMenuItem>
	);
}
