import { CATEGORY_CONFIG, ProgressCategory } from "./progress-config";

type SegmentedProgressBarProps = {
	counts: Record<ProgressCategory, number>;
};

export function SegmentedProgressBar({ counts }: SegmentedProgressBarProps) {
	const segments = CATEGORY_CONFIG.filter((cat) => counts[cat.key] > 0);

	if (segments.length === 0) {
		return <div className="h-2 w-full rounded-sm bg-neutral-200" />;
	}

	return (
		<div className="flex h-2 w-full overflow-hidden rounded-sm" aria-label="Step progress bar">
			{segments.map((seg) => (
				<div key={seg.key} className={seg.bgColor} style={{ flex: counts[seg.key] }} />
			))}
		</div>
	);
}
