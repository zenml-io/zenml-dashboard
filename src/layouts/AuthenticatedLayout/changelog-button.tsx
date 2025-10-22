import Speaker from "@/assets/icons/announcement.svg?react";
import { DropdownMenuItem } from "@zenml-io/react-component-library/components/client";

type Props = {
	openChangelog: () => void;
};

export default function ChangeLogButton({ openChangelog }: Props) {
	return (
		<DropdownMenuItem
			onSelect={() => openChangelog()}
			className="flex items-center hover:cursor-pointer data-[highlighted]:bg-theme-surface-tertiary"
			icon={<Speaker />}
		>
			What's new
		</DropdownMenuItem>
	);
}
