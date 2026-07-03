import Speaker from "@/assets/icons/announcement.svg?react";
import { AnnouncementIndicator } from "@/components/announcements/announcement-indicator";
import { DropdownMenuItem } from "@zenml-io/react-component-library/components/client";

type Props = {
	openDialog: () => void;
};

export default function WhatsNewButton({ openDialog }: Props) {
	return (
		<DropdownMenuItem onSelect={() => openDialog()} className="cursor-pointer" icon={<Speaker />}>
			What's new
			<AnnouncementIndicator className="ml-0.5 self-start" />
		</DropdownMenuItem>
	);
}
