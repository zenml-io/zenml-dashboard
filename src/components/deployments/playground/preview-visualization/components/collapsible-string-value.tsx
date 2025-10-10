import { useState } from "react";
import { ExpandCollapseLineIcon } from "./expand-collapse-icon";
import { shouldCollapseString } from "../services/string-threshhold";

export function Collapsiblevalue({ value }: { value: string }) {
	const [isExpanded, setIsExpanded] = useState(false);

	const isLongContent = shouldCollapseString(value);
	const shouldCollapse = isLongContent && !isExpanded;

	return (
		<div className="space-y-1">
			<div className="relative">
				<div
					className={`whitespace-pre-wrap ${shouldCollapse ? "max-h-[200px] overflow-hidden" : ""}`}
				>
					{value}
				</div>

				{/* Fade-out gradient overlay */}
				{shouldCollapse && (
					<div className="from-bg-theme-surface-primary pointer-events-none absolute bottom-0 left-0 right-0 h-[100px] bg-gradient-to-t from-theme-surface-primary to-transparent" />
				)}
			</div>

			{isLongContent && (
				<button
					onClick={() => setIsExpanded(!isExpanded)}
					className="flex items-center gap-1 text-primary-400"
				>
					<ExpandCollapseLineIcon expanded={isExpanded} />
					{isExpanded ? "Show less" : "Show more"}
				</button>
			)}
		</div>
	);
}
