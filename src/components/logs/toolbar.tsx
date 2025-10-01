import Copy from "@/assets/icons/copy.svg?react";
import Download from "@/assets/icons/download-01.svg?react";
import ArrowLeft from "@/assets/icons/arrow-left.svg?react";
import Refresh from "@/assets/icons/refresh.svg?react";
import { Button } from "@zenml-io/react-component-library/components/server";
import { SearchField } from "../SearchField";
import { LogLevelSelect } from "./log-level-select";
import { LoggingLevel } from "@/types/logs";
import { Dispatch, SetStateAction } from "react";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger
} from "@zenml-io/react-component-library";

interface LogToolbarProps {
	onSearchChange: (searchTerm: string) => void;

	onReload: () => void;
	onCopyAll: () => void;
	onDownload: () => void;
	// Search-related props from useLogSearch hook
	searchQuery?: string;
	currentMatchIndex?: number;
	totalMatches?: number;
	onPreviousMatch?: () => void;
	onNextMatch?: () => void;
	// log level related props
	logLevel: LoggingLevel;
	setLogLevel: Dispatch<SetStateAction<LoggingLevel>>;
}

export function LogToolbar({
	onSearchChange,
	onReload,
	onCopyAll,
	onDownload,
	searchQuery = "",
	currentMatchIndex = 0,
	totalMatches = 0,
	onPreviousMatch,
	onNextMatch,
	logLevel,
	setLogLevel
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
							<div className="flex items-center gap-0.5">
								<span className="text-sm whitespace-nowrap text-theme-text-secondary">
									{totalMatches > 0 ? `${currentMatchIndex + 1} of ${totalMatches}` : "No matches"}
								</span>
								<Button
									className="aspect-square"
									size="sm"
									emphasis="minimal"
									onClick={onPreviousMatch}
									disabled={totalMatches === 0}
									title="Previous match"
								>
									<ArrowLeft className="h-4 w-4 shrink-0 rotate-90 fill-theme-text-tertiary" />
								</Button>
								<Button
									className="aspect-square"
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
						<LogLevelSelect
							value={logLevel.toString()}
							onValueChange={(value) => setLogLevel(Number(value) as LoggingLevel)}
						/>
					</div>

					{/* Right side - Action Buttons */}
					<TooltipProvider>
						<div className="flex items-center gap-2">
							<LogIconButton
								icon={<Refresh className="h-4 w-4 fill-theme-text-primary" />}
								tooltip="Reload logs"
								onClick={onReload}
							/>

							<LogIconButton
								icon={<Copy className="h-4 w-4 fill-theme-text-primary" />}
								tooltip="Copy all displayed logs"
								onClick={onCopyAll}
							/>

							<LogIconButton
								icon={<Download className="h-4 w-4 fill-theme-text-primary" />}
								tooltip="Download logs as file"
								onClick={onDownload}
							/>
						</div>
					</TooltipProvider>
				</div>
			</div>
		</>
	);
}

function LogIconButton({
	icon,
	tooltip,
	onClick
}: {
	icon: React.ReactNode;
	tooltip: string;
	onClick: () => void;
}) {
	return (
		<Tooltip delayDuration={200}>
			<TooltipTrigger>
				<Button
					size="md"
					emphasis="subtle"
					intent="secondary"
					onClick={onClick}
					className="flex aspect-square items-center justify-center bg-theme-surface-primary p-0"
				>
					{icon}
				</Button>
			</TooltipTrigger>
			<TooltipContent>{tooltip}</TooltipContent>
		</Tooltip>
	);
}
