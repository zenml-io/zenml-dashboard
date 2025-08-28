import Search from "@/assets/icons/search.svg?react";
import X from "@/assets/icons/close.svg?react";
import { DebouncedInput } from "@/components/debounced-input";
import { useState } from "react";

interface TimelineSearchProps {
	onSearchChange: (search: string) => void;
	matchCount: number;
}

export function TimelineSearch({ onSearchChange, matchCount }: TimelineSearchProps) {
	const [search, setSearch] = useState("");

	function handleSearchChange(value: string) {
		setSearch(value);
		onSearchChange(value);
	}

	function clearSearch() {
		setSearch("");
		onSearchChange("");
	}

	return (
		<div className="flex items-center gap-2 rounded-md border border-theme-border-moderate bg-theme-surface-primary p-2">
			<Search className="h-4 w-4 shrink-0 fill-theme-text-tertiary" />
			<div className="relative flex-1">
				<DebouncedInput
					className="w-full rounded-sm border-0 bg-transparent p-1 text-text-sm placeholder:text-theme-text-tertiary focus:outline-none"
					placeholder="Search steps..."
					value={search}
					onChange={handleSearchChange}
				/>
				{search && (
					<button
						type="button"
						onClick={clearSearch}
						className="absolute right-1 top-1/2 flex h-5 w-5 -translate-y-1/2 items-center justify-center rounded-sm hover:bg-theme-surface-secondary"
					>
						<span className="sr-only">Clear search</span>
						<X className="h-3 w-3 fill-theme-text-tertiary" />
					</button>
				)}
			</div>
			{search && (
				<div className="shrink-0 text-text-xs text-theme-text-secondary">
					{matchCount > 0
						? `${matchCount} ${matchCount === 1 ? "match" : "matches"}`
						: "No matches"}
				</div>
			)}
		</div>
	);
}
