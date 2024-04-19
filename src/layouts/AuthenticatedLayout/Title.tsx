import { SidebarHeaderTitle, Skeleton } from "@zenml-io/react-component-library";
import { useServerSettings } from "@/data/server/get-server-settings";

export function SidebarTitle() {
	const { data, isPending, isError } = useServerSettings({ throwOnError: true });

	if (isError) return null;
	if (isPending) return <Skeleton className="h-3 w-full" />;

	return <SidebarHeaderTitle>{data.body?.name}</SidebarHeaderTitle>;
}
