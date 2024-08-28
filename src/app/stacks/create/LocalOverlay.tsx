export function LocalOverlay() {
	return (
		<div className="group absolute z-20 flex h-full w-full items-center justify-center rounded-md border border-theme-border-moderate bg-white/70">
			<div className="hidden rounded-md bg-theme-text-primary px-3 py-2 text-text-xs text-theme-text-negative shadow-lg animate-in fade-in-0 fade-out-0 zoom-in-95 group-hover:block">
				This option is not available for local deployments
			</div>
		</div>
	);
}
