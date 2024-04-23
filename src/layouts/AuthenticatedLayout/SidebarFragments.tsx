import {
	Avatar,
	AvatarFallback,
	AvatarImage,
	SidebarHeaderImage,
	SidebarHeaderTitle,
	Skeleton
} from "@zenml-io/react-component-library";
import { useServerSettings } from "@/data/server/get-server-settings";
import { getGradientImage } from "@/lib/images";

export function SidebarTitle() {
	const { data, isPending, isError } = useServerSettings({ throwOnError: true });

	if (isError) return null;
	if (isPending) return <Skeleton className="h-3 w-full" />;

	return <SidebarHeaderTitle>{data.body?.name}</SidebarHeaderTitle>;
}

export function SidebarImage() {
	const { data, isPending, isError } = useServerSettings({ throwOnError: true });

	if (isError) return null;
	if (isPending) return <Skeleton className="h-3 w-full" />;

	return (
		<SidebarHeaderImage>
			<Avatar size="md" type="square">
				<AvatarImage src={getGradientImage(data.body?.name || "default")} />
				<AvatarFallback size="md">{data.body?.name[0] || "D"}</AvatarFallback>
			</Avatar>
		</SidebarHeaderImage>
	);
}
