import ZenMLIcon from "@/assets/icons/zenml-icon.svg?react";
import { useServerInfo } from "@/data/server/info-query";
import { Skeleton } from "@zenml-io/react-component-library";

export function VersionDisplay() {
	const { data, isPending, isError } = useServerInfo();
	if (isPending) return <Skeleton className="h-[70px] w-full" />;
	if (isError) return null;

	return (
		<div className="rounded-md border border-theme-border-moderate bg-theme-surface-primary p-3">
			<div className="mb-2 flex items-center">
				<ZenMLIcon className="h-4 w-4 fill-theme-text-brand" />
				<p className="ml-2 text-text-sm  font-semibold">Open source</p>
			</div>
			<p className="mb-1 text-text-sm text-theme-text-tertiary">ZenML v{data.version}</p>
			<p className="text-text-sm text-theme-text-tertiary">
				UI Version {import.meta.env.VITE_FRONTEND_VERSION}
			</p>
		</div>
	);
}
