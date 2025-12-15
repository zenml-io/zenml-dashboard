import { cn } from "@zenml-io/react-component-library";

type Props = {
	videoUrl: string;
	className?: string;
};

export function AnnouncementVideo({ videoUrl, className }: Props) {
	return (
		<div className={cn("overflow-hidden", className)}>
			<iframe
				className="aspect-video w-full shrink-0 overflow-hidden"
				src={videoUrl}
				title="YouTube video player"
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
				referrerPolicy="strict-origin-when-cross-origin"
				allowFullScreen
			></iframe>
		</div>
	);
}
