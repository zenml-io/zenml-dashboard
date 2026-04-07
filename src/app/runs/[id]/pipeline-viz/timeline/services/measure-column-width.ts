import { secondsToTimeString } from "@/lib/dates";
import { VirtualizedItem } from "@/lib/timeline/types";

const NAME_FONT = "600 14px Inter, system-ui, sans-serif";
const DURATION_FONT = "400 12px Inter, system-ui, sans-serif";
const FIXED_MARGIN_PX = 80;
const MIN_WIDTH_PX = 160;

export function measureColumnWidth(
	visibleItems: VirtualizedItem[],
	ctx: CanvasRenderingContext2D
): number {
	let maxNameWidth = 0;
	let maxDurationWidth = 0;

	ctx.font = NAME_FONT;
	for (const item of visibleItems) {
		const name =
			item.type === "timeline"
				? item.item.step.name
				: item.type === "placeholder"
					? item.item.name
					: null;
		if (name) {
			const w = ctx.measureText(name).width;
			if (w > maxNameWidth) maxNameWidth = w;
		}
	}

	ctx.font = DURATION_FONT;
	for (const item of visibleItems) {
		if (item.type === "timeline") {
			const dur = item.item.step.metadata.duration;
			if (dur !== undefined) {
				const w = ctx.measureText(secondsToTimeString(dur)).width;
				if (w > maxDurationWidth) maxDurationWidth = w;
			}
		}
	}

	const idealWidth = Math.ceil(maxNameWidth + maxDurationWidth + FIXED_MARGIN_PX);

	return Math.max(MIN_WIDTH_PX, idealWidth);
}
