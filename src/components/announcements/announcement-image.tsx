import { generateProjectImageUrl } from "@/lib/images";
import { cn } from "@zenml-io/react-component-library";

type Props = {
	imageUrl?: string;
	title: string;
	className?: string;
};

export function AnnouncementImage({ imageUrl, title, className }: Props) {
	const src = imageUrl ?? generateProjectImageUrl(title);

	return (
		<img
			loading="lazy"
			src={src}
			alt={`Announcement image for ${title}`}
			className={cn("aspect-video h-full w-full object-cover", className)}
		/>
	);
}
