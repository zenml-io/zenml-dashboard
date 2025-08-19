"use client";

import { Button } from "@zenml-io/react-component-library";
import { useLogViewerContext } from "./logviewer-context";
import { LogPage } from "@/types/logs";

type Props = {
	logPage: LogPage;
};

export function LogviewerPagination({ logPage }: Props) {
	const totalPages = logPage.total_pages;
	const maxItems = logPage.total;
	const itemsPerPage = logPage.max_size;

	const { currentPage, setCurrentPage } = useLogViewerContext();
	const startIndex = (currentPage - 1) * itemsPerPage;

	const handlePreviousPage = () => {
		setCurrentPage((prev) => Math.max(prev - 1, 1));
	};

	const handleNextPage = () => {
		setCurrentPage((prev) => Math.min(prev + 1, totalPages));
	};

	const handleFirstPage = () => {
		setCurrentPage(1);
	};

	const handleLastPage = () => {
		setCurrentPage(totalPages);
	};

	return (
		<div className="border-t border-theme-border-minimal bg-theme-surface-secondary px-4 py-3">
			<div className="flex items-center justify-between">
				<div className="text-sm text-theme-text-secondary">
					Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, maxItems)} of {maxItems}{" "}
					logs
				</div>
				<div className="flex items-center space-x-2">
					<Button
						className="bg-theme-surface-primary"
						size="md"
						intent="secondary"
						emphasis="subtle"
						onClick={handleFirstPage}
						disabled={currentPage === 1}
					>
						First
					</Button>
					<Button
						className="bg-theme-surface-primary"
						size="md"
						intent="secondary"
						emphasis="subtle"
						onClick={handlePreviousPage}
						disabled={currentPage === 1}
					>
						Previous
					</Button>
					<span className="text-sm text-theme-text-secondary">
						Page {currentPage} of {totalPages}
					</span>
					<Button
						className="bg-theme-surface-primary"
						size="md"
						intent="secondary"
						emphasis="subtle"
						onClick={handleNextPage}
						disabled={currentPage === totalPages}
					>
						Next
					</Button>
					<Button
						className="bg-theme-surface-primary"
						size="md"
						intent="secondary"
						emphasis="subtle"
						onClick={handleLastPage}
						disabled={currentPage === totalPages}
					>
						Last
					</Button>
				</div>
			</div>
		</div>
	);
}
