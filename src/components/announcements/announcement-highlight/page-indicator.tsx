type Props = {
	currentPage: number;
	totalPages: number;
};

export function AnnouncementHighlightPageIndicator({ currentPage, totalPages }: Props) {
	if (totalPages <= 1) return null;

	return (
		<div className="flex w-full items-center justify-center gap-1">
			{Array.from({ length: totalPages }, (_, index) => (
				<div
					key={index}
					className={`h-2 w-2 rounded-rounded ${currentPage === index ? "bg-primary-500" : "bg-neutral-300"}`}
				/>
			))}
		</div>
	);
}
