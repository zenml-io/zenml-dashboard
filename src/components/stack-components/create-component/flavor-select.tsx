import { snakeCaseToTitleCase } from "@/lib/strings";
import { sanitizeUrl } from "@/lib/url";
import { Button, Skeleton } from "@zenml-io/react-component-library/components/server";
import { StackComponentType } from "@/types/components";
import { Flavor } from "@/types/flavors";
import { flavorQueries } from "../../../data/flavors";
import { useInfiniteQuery } from "@tanstack/react-query";
import { ComponentIcon } from "../../ComponentIcon";

type Props = {
	type: StackComponentType;
	setSelectedFlavor: (flavor: Flavor) => void;
};

export function SelectFlavorList({ type, setSelectedFlavor }: Props) {
	const flavorList = useInfiniteQuery(flavorQueries.flavorListInfinite({ type }));
	if (flavorList.isPending) return <ListSkeleton />;
	if (flavorList.isError) return <p>Failed to fetch Flavor List</p>;

	const { data } = flavorList;

	return (
		<ul className="grid grid-cols-1 gap-3 md:grid-cols-2 2xl:grid-cols-4">
			{data.pages.map((page) =>
				page.items.map((flavor) => (
					<li className="" key={flavor.id}>
						<FlavorListItem
							type={type}
							onClick={() => setSelectedFlavor(flavor)}
							id={flavor.id}
							name={flavor.name}
							logoUrl={flavor.body?.logo_url ?? undefined}
						/>
					</li>
				))
			)}
		</ul>
	);
}

type FlavorListItemItemProps = {
	id: string;
	name: string;
	logoUrl?: string;
	type: StackComponentType;
	onClick?: () => void;
};

function FlavorListItem({ name, logoUrl, onClick, type }: FlavorListItemItemProps) {
	return (
		<Button
			onClick={onClick}
			intent="secondary"
			emphasis="subtle"
			className="h-auto w-full gap-2 px-5 py-3"
		>
			{logoUrl ? (
				<img
					alt={`Logo of ${name}`}
					width={36}
					height={36}
					className="aspect-square object-contain"
					src={sanitizeUrl(logoUrl)}
				/>
			) : (
				<ComponentIcon
					className="aspect-square h-[36px] w-[36px] fill-primary-400 object-contain"
					type={type}
				/>
			)}
			<span className="min-w-0 truncate">{snakeCaseToTitleCase(name)}</span>
		</Button>
	);
}

function ListSkeleton() {
	return (
		<ul className="grid grid-cols-1 gap-3 md:grid-cols-2 2xl:grid-cols-4">
			{Array.from({ length: 4 }).map((_, i) => (
				<Skeleton key={i} className="h-[70px] w-full" />
			))}
		</ul>
	);
}
