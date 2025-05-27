import Box from "@/assets/icons/container.svg?react";

export function DisplayProject() {
	return (
		<div className="flex w-full items-center gap-2 rounded-md border border-theme-border-minimal bg-theme-surface-primary p-2">
			<div className="flex aspect-square h-5 w-5 shrink-0 items-center justify-center rounded-md bg-primary-25">
				<Box width={16} height={16} className="shrink-0 fill-primary-400" />
			</div>
			<p className="truncate text-text-sm font-semibold">default</p>
		</div>
	);
}
