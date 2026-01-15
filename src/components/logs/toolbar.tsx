import ArrowLeft from "@/assets/icons/arrow-left.svg?react";
import Copy from "@/assets/icons/copy.svg?react";
import Download from "@/assets/icons/download-01.svg?react";
import Refresh from "@/assets/icons/refresh.svg?react";
import { LoggingLevel } from "@/types/logs";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger
} from "@zenml-io/react-component-library";
import { Button } from "@zenml-io/react-component-library/components/server";
import { Dispatch, ReactNode, SetStateAction } from "react";
import { SearchField } from "../SearchField";
import { LogLevelSelect } from "./log-level-select";

interface LogToolbarProps {
	hasLogs: boolean;
	sourceSwitcher?: ReactNode;
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
	hasLogs,
	sourceSwitcher,
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
			<div className="flex items-end gap-2 bg-theme-surface-secondary">
				{sourceSwitcher && <div>{sourceSwitcher}</div>}
				{hasLogs && (
					<div className="flex w-full flex-wrap items-center justify-between gap-2">
						{/* Left side - Search and Filter controls */}
						<div className="flex items-center gap-2">
							<form
								onSubmit={(e) => {
									e.preventDefault();
									if (totalMatches > 0) onNextMatch?.();
								}}
							>
								<SearchField
									className="border-neutral-300"
									searchParams={{}}
									inMemoryHandler={onSearchChange}
									placeholder="Search logs..."
								/>
							</form>

							{/* Search controls */}
							{searchQuery && (
								<div className="flex items-center gap-0.5">
									<span className="text-sm whitespace-nowrap text-theme-text-secondary">
										{totalMatches > 0
											? `${currentMatchIndex + 1} of ${totalMatches}`
											: "No matches"}
									</span>
									<Button
										className="aspect-square items-center justify-center"
										size="sm"
										emphasis="minimal"
										onClick={onPreviousMatch}
										disabled={totalMatches === 0}
										title="Previous match"
									>
										<ArrowLeft className="h-4 w-4 shrink-0 rotate-90 fill-theme-text-tertiary" />
									</Button>
									<Button
										className="flex aspect-square items-center justify-center"
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
				)}
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
