import { flavorQueries } from "@/data/flavors";
import { sanitizeUrl } from "@/lib/url";
import { StackComponentType } from "@/types/components";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@zenml-io/react-component-library/components/server";
import { HTMLProps } from "react";

type FlavorIconProps = {
	flavor: string;
	type: StackComponentType;
};

export function FlavorIcon({
	flavor,
	type,
	width = 32,
	height = 32,
	...rest
}: FlavorIconProps & Omit<HTMLProps<HTMLImageElement>, "alt" | "src">) {
	const flavorQuery = useQuery({ ...flavorQueries.flavorList({ name: flavor, type }) });

	if (flavorQuery.isError) return null;
	if (flavorQuery.isPending)
		// using style prop here, so we can set the size dynamically and avoid layout shift for the image
		return <Skeleton style={{ height: `${height}px`, width: `${width}px` }} />;

	return (
		<img
			width={width}
			height={height}
			alt={`${flavor} logo`}
			{...rest}
			src={sanitizeUrl(flavorQuery.data.items[0].body?.logo_url ?? "")}
		/>
	);
}
