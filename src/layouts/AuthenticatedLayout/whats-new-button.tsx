import Speaker from "@/assets/icons/announcement.svg?react";
import { DropdownMenuItem } from "@zenml-io/react-component-library/components/client";

type Props = {
	openDialog: () => void;
};

export default function WhatsNewButton({ openDialog }: Props) {
	return (
		<DropdownMenuItem
			onSelect={() => openDialog()}
			className="flex items-center hover:cursor-pointer data-[highlighted]:bg-theme-surface-tertiary"
			icon={<Speaker />}
		>
			What's new
		</DropdownMenuItem>
	);
}
