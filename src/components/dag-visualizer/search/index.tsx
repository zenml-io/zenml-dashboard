import ArrowLeft from "@/assets/icons/arrow-left.svg?react";
import Search from "@/assets/icons/search.svg?react";
import X from "@/assets/icons/close.svg?react";
import { Box, Button } from "@zenml-io/react-component-library/components/server";
import { useNodeSearch } from "./use-node-search";
import { FormEvent, useEffect, useRef, useState } from "react";
import { DebouncedInput } from "@/components/debounced-input";

export function NodeSearch() {
	const [isWidgetOpen, setIsWidgetOpen] = useState(false);
	const inputRef = useRef<HTMLInputElement>(null);

	const { search, setSearch, currentIndex, filteredNodes, zoomNext, zoomPrevious } =
		useNodeSearch();

	useEffect(() => {
		if (isWidgetOpen && inputRef.current) {
			inputRef.current.focus();
		}
	}, [isWidgetOpen]);

	function handleFormSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		zoomNext();
	}

	return (
		<Box
			data-state={isWidgetOpen ? "open" : "closed"}
			className="flex h-7 w-7 items-center gap-1 overflow-hidden rounded-md border-neutral-300 transition-all duration-200 data-[state=open]:w-[350px]"
		>
			<Button
				intent="secondary"
				emphasis="subtle"
				onClick={() => setIsWidgetOpen(!isWidgetOpen)}
				className="flex aspect-square h-full items-center justify-center border-none border-transparent bg-theme-surface-primary"
			>
				<Search className="size-4 shrink-0 fill-theme-text-primary" />
			</Button>
			{isWidgetOpen && (
				<>
					<form onSubmit={handleFormSubmit} className="relative">
						<DebouncedInput
							className="h-5 w-[150px] rounded-sm p-1 pr-5 text-text-xs"
							placeholder="Search"
							value={search}
							onChange={(value) => setSearch(value)}
						/>
						<Button
							type="button"
							onClick={() => setSearch("")}
							intent="secondary"
							emphasis="subtle"
							className="absolute right-0.5 top-1/2 flex aspect-square size-3 -translate-y-1/2 items-center justify-center rounded-sm border-none p-0"
						>
							<span className="sr-only">Clear search</span>
							<X className="size-3 shrink-0 fill-theme-text-tertiary group-disabled:fill-theme-text-tertiary/40" />
						</Button>
					</form>
					<p className="whitespace-nowrap text-text-xs text-theme-text-secondary">
						{filteredNodes.length > 0
							? currentIndex === null
								? `${filteredNodes.length} ${filteredNodes.length === 1 ? "match" : "matches"}`
								: `${currentIndex + 1} of ${filteredNodes.length}`
							: "No matches"}
					</p>
					<div className="ml-auto flex items-center gap-1 pr-1">
						<Button
							disabled={filteredNodes.length === 0}
							intent="secondary"
							size="sm"
							className="group flex aspect-square size-3 items-center justify-center rounded-sm bg-theme-surface-primary"
							onClick={zoomPrevious}
						>
							<ArrowLeft className="size-3 shrink-0 rotate-90 fill-theme-text-tertiary group-disabled:fill-theme-text-tertiary/40" />
						</Button>
						<Button
							disabled={filteredNodes.length === 0}
							intent="secondary"
							size="sm"
							className="group flex aspect-square size-3 items-center justify-center rounded-sm bg-theme-surface-primary"
							onClick={zoomNext}
						>
							<ArrowLeft className="size-3 shrink-0 -rotate-90 fill-theme-text-tertiary group-disabled:fill-theme-text-tertiary/40" />
						</Button>
					</div>
				</>
			)}
		</Box>
	);
}
