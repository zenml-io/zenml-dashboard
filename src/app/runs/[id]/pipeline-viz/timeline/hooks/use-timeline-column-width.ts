import { VirtualizedItem } from "@/lib/timeline/types";
import { useEffect, useRef, useState } from "react";
import { measureColumnWidth } from "../services/measure-column-width";

function getItemsFingerprint(items: VirtualizedItem[]): string {
	if (items.length === 0) return "";
	const first = items[0];
	const last = items[items.length - 1];
	const getName = (item: VirtualizedItem) =>
		item.type === "timeline"
			? item.item.step.name
			: item.type === "placeholder"
				? item.item.name
				: "";
	return `${items.length}:${getName(first)}:${getName(last)}`;
}

export function useTimelineColumnWidth(timelineItems: VirtualizedItem[]): number | undefined {
	const [colWidth, setColWidth] = useState<number | undefined>(undefined);
	const canvasRef = useRef<CanvasRenderingContext2D | null>(null);
	const lastFingerprintRef = useRef<string>("");

	useEffect(() => {
		if (timelineItems.length === 0) return;

		const fingerprint = getItemsFingerprint(timelineItems);
		if (fingerprint === lastFingerprintRef.current) return;
		lastFingerprintRef.current = fingerprint;

		if (!canvasRef.current) {
			const canvas = document.createElement("canvas");
			canvasRef.current = canvas.getContext("2d");
		}
		const ctx = canvasRef.current;
		if (!ctx) return;

		const itemsToMeasure = timelineItems.slice(0, Math.min(500, timelineItems.length));
		const width = measureColumnWidth(itemsToMeasure, ctx);

		setColWidth(width);
	}, [timelineItems]);

	return colWidth;
}
