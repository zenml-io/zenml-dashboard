import ZenML from "@/assets/icons/zenml-icon.svg?react";
import { getGradientImage } from "@/lib/images";
import { Avatar, AvatarFallback, AvatarImage, Skeleton } from "@zenml-io/react-component-library";
import { useServerSettings } from "../data/server/get-server-settings";
import { useServerInfo } from "../data/server/info-query";

export function OverviewHeader() {
	const { data: serverSettings } = useServerSettings({ throwOnError: true });
	return (
		<div className="w-full items-center border-b border-theme-border-moderate bg-white py-5">
			<div className="layout-container flex flex-col flex-wrap items-center justify-between md:flex-row">
				<div className="flex flex-col items-center gap-5 md:flex-row">
					{serverSettings ? (
						<Avatar size="xxl" type="square">
							<AvatarImage
								alt="Logo displayed for the tenant"
								src={getGradientImage(serverSettings.body?.server_name || "default", 64)}
							/>
							<AvatarFallback size="xxl">
								{serverSettings.body?.server_name[0] || "D"}
							</AvatarFallback>
						</Avatar>
					) : (
						<Skeleton className="h-[96px] w-[96px]" />
					)}
					<div>
						<div className="flex flex-col gap-2 md:flex-row">
							{serverSettings ? (
								<h1 className="mb-1 text-display-xs font-semibold">
									{serverSettings.body?.server_name || "default"}
								</h1>
							) : (
								<Skeleton className="h-full w-8" />
							)}
							<div className="flex flex-row flex-wrap gap-0.5">
								<ZenMLVersionTag />
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

function ZenMLVersionTag() {
	const { data, isError, isPending } = useServerInfo({ throwOnError: true });
	if (isError) return null;
	if (isPending) return <Skeleton className="w-6" />;
	return (
		<div className="flex h-6 items-center gap-0.5 rounded-md border border-theme-border-moderate px-1 py-0.5 text-text-sm text-theme-text-secondary">
			<ZenML className="h-4 w-4 fill-theme-text-brand" />
			{data.version}
		</div>
	);
}
