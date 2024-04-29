import { Box, Skeleton } from "@zenml-io/react-component-library";
import { NotificationsForm } from "./NotificationsForm";
import { useServerSettings } from "@/data/server/get-server-settings";

export default function NotificationsPage() {
	const { data } = useServerSettings({ throwOnError: true });

	return (
		<Box className="flex flex-col gap-5 p-5">
			<div className="space-y-3">
				<h1 className="text-text-xl font-semibold">Notifications</h1>
				<p className="text-text-sm text-theme-text-secondary">
					ZenML comes equipped with default widgets designed to enhance your experience by analyzing
					usage patterns, gathering your feedback, and ensuring you stay informed about our latest
					updates and features.
				</p>
			</div>
			<div className="">
				{data ? <NotificationsForm settings={data} /> : <Skeleton className="h-[250px] w-full" />}
			</div>
		</Box>
	);
}
