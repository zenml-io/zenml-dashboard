import Speaker from "@/assets/icons/announcement.svg?react";
import { PropsWithChildren } from "react";

export function AnnouncementImagePlaceholder({ children }: PropsWithChildren) {
	return (
		<div className="relative flex aspect-video w-full items-center justify-center rounded-md bg-neutral-100">
			<Speaker className="size-[100px] shrink-0 fill-neutral-300" />
			{children}
		</div>
	);
}
