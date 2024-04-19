import { Icon } from "@/components/Icon";
import { useRouteError } from "react-router-dom";

export function RootBoundary() {
	const error = useRouteError() as Error | undefined;

	return (
		<div className="layout-container my-9 flex flex-col items-center gap-5 text-center">
			<Icon name="alert-circle" className="h-[120px] w-[120px] fill-neutral-300" />
			<h1 className="text-display-xs font-semibold">Something went wrong!</h1>
			<p className="text-theme-text-secondary">{error?.message}</p>
		</div>
	);
}
