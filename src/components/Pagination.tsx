import { objectToSearchParams } from "@/lib/url";
import { forwardRef } from "react";
import { cn } from "@zenml-io/react-component-library";
import { useNavigate } from "react-router-dom";
import { ResponsePage } from "@/types/common";
import { Icon } from "./Icon";

type Props = {
	// Maybe handle this with a generic?
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	searchParams: Record<string, any>;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	paginate: Omit<ResponsePage<any>, "items">;
};

export default function Pagination({ paginate, searchParams }: Props) {
	const navigate = useNavigate();

	const { index, total_pages } = paginate;

	function goToPage(page: number) {
		const queryParams = new URLSearchParams(objectToSearchParams(searchParams));
		queryParams.set("page", page.toString());

		navigate(`?${queryParams.toString()}`, { preventScrollReset: false });
	}

	const renderPageNumbers = () => {
		const pageNumbers = [];

		// Define the maximum number of pages to show between ellipses
		const maxPagesToShowBetweenEllipses = 1;

		let leftEllipsisAdded = false;
		let rightEllipsisAdded = false;

		for (let i = 1; i <= total_pages; i++) {
			const isEllipsis =
				i > 1 && i < total_pages && Math.abs(i - index) > maxPagesToShowBetweenEllipses;

			if (
				i === 1 ||
				i === total_pages ||
				isEllipsis ||
				Math.abs(i - index) <= maxPagesToShowBetweenEllipses
			) {
				if (isEllipsis) {
					if (i < index && !leftEllipsisAdded) {
						pageNumbers.push(<Ellipsis key={`ellipsis-left`} />);
						leftEllipsisAdded = true;
					} else if (i > index && !rightEllipsisAdded) {
						pageNumbers.push(<Ellipsis key={`ellipsis-right`} />);
						rightEllipsisAdded = true;
					}
				} else {
					pageNumbers.push(
						<PaginationButton
							aria-label={`Go to page ${i}`}
							aria-current={i === index}
							className={`${i === index ? "!bg-primary-500 text-theme-text-negative" : ""}`}
							key={i}
							onClick={() => goToPage(i)}
							disabled={i === index}
						>
							{i}
						</PaginationButton>
					);
				}
			}
		}

		return pageNumbers;
	};

	return (
		<nav role="navigation" aria-label="Pagination Navigation">
			<ul className="flex gap-1">
				<li>
					<PaginationButton
						disabled={index === 1}
						onClick={() => goToPage(1)}
						aria-label="Go to first page"
					>
						<Icon
							name="chevron-left-double"
							className="h-4 w-4 group-disabled/button:fill-neutral-300"
						/>
					</PaginationButton>
				</li>
				<li>
					<PaginationButton
						disabled={index === 1}
						onClick={() => goToPage(index - 1)}
						aria-label="Go to previous page"
					>
						<Icon name="chevron-left" className="h-4 w-4 group-disabled/button:fill-neutral-300" />
					</PaginationButton>
				</li>
				{renderPageNumbers().map((pageNumber, i) => (
					<li key={i}>{pageNumber}</li>
				))}
				<li>
					<PaginationButton
						disabled={index === total_pages}
						onClick={() => goToPage(index + 1)}
						aria-label="Go to next page"
					>
						<Icon name="chevron-right" className="h-4 w-4 group-disabled/button:fill-neutral-300" />
					</PaginationButton>
				</li>
				<li>
					<PaginationButton
						disabled={index === total_pages}
						onClick={() => goToPage(total_pages)}
						aria-label="Go to last page"
					>
						<Icon
							name="chevron-right-double"
							className="h-4 w-4 group-disabled/button:fill-neutral-300"
						/>
					</PaginationButton>
				</li>
			</ul>
		</nav>
	);
}

function Ellipsis() {
	return (
		<div className="flex h-[36px] w-[36px] items-center justify-center rounded-sm border border-theme-border-moderate">
			<Icon name="dots-horizontal" className="h-4 w-4" />
		</div>
	);
}

const PaginationButton = forwardRef<
	HTMLButtonElement,
	React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...rest }, ref) => {
	return (
		<button
			{...rest}
			ref={ref}
			className={cn(
				"group/button flex h-[36px] w-[36px] items-center justify-center rounded-sm border border-neutral-300 hover:bg-neutral-200 active:border-neutral-400 active:bg-neutral-300 disabled:pointer-events-none disabled:bg-theme-surface-primary ",
				className
			)}
		></button>
	);
});

PaginationButton.displayName = "PaginationButton";
