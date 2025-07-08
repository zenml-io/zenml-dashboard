import Copy from "@/assets/icons/copy.svg?react";
import Download from "@/assets/icons/download-01.svg?react";
import ArrowLeft from "@/assets/icons/arrow-left.svg?react";
import { Button } from "@zenml-io/react-component-library/components/server";
import { SearchField } from "../SearchField";

interface LogToolbarProps {
	onSearchChange: (searchTerm: string) => void;

	onCopyAll: () => void;
	onDownload: () => void;
	// Search-related props from useLogSearch hook
	searchQuery?: string;
	currentMatchIndex?: number;
	totalMatches?: number;
	onPreviousMatch?: () => void;
	onNextMatch?: () => void;
}

export function LogToolbar({
	onSearchChange,
	onCopyAll,
	onDownload,
	searchQuery = "",
	currentMatchIndex = 0,
	totalMatches = 0,
	onPreviousMatch,
	onNextMatch
}: LogToolbarProps) {
	return (
		<>
			{/* Main Toolbar */}
			<div className="bg-theme-surface-secondary">
				<div className="flex flex-wrap items-center justify-between gap-2">
					{/* Left side - Search and Filter controls */}
					<div className="flex items-center gap-2">
						<SearchField
							searchParams={{}}
							inMemoryHandler={onSearchChange}
							placeholder="Search logs..."
						/>

						{/* Search controls */}
						{searchQuery && (
							<div className="flex items-center gap-1">
								<span className="text-sm text-theme-text-secondary">
									{totalMatches > 0 ? `${currentMatchIndex + 1} of ${totalMatches}` : "No matches"}
								</span>
								<Button
									size="sm"
									emphasis="minimal"
									onClick={onPreviousMatch}
									disabled={totalMatches === 0}
									title="Previous match"
								>
									<ArrowLeft className="h-4 w-4 shrink-0 rotate-90 fill-theme-text-tertiary" />
								</Button>
								<Button
									size="sm"
									emphasis="minimal"
									onClick={onNextMatch}
									disabled={totalMatches === 0}
									title="Next match"
								>
									<ArrowLeft className="h-4 w-4 shrink-0 -rotate-90 fill-theme-text-tertiary" />
								</Button>
							</div>
						)}
					</div>

					{/* Right side - Action Buttons */}
					<div className="flex items-center gap-2">
						<Button
							size="md"
							emphasis="subtle"
							intent="secondary"
							onClick={onCopyAll}
							title="Copy all displayed logs"
							className="bg-theme-surface-primary"
						>
							<Copy className="mr-1 h-4 w-4 fill-theme-text-secondary" />
							Copy All
						</Button>

						<Button
							size="md"
							emphasis="subtle"
							intent="secondary"
							onClick={onDownload}
							title="Download logs as file"
							className="bg-theme-surface-primary"
						>
							<Download className="mr-1 h-5 w-5 fill-theme-text-tertiary" />
							Download
						</Button>
					</div>
				</div>
			</div>
		</>
	);
}
