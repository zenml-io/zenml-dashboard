import { InfoBox } from "@/components/Infobox";
import { stackQueries } from "@/data/stacks";
import { getCloudProviderName } from "@/lib/provider";
import { StackDeploymentProvider } from "@/types/stack";
import { useQuery } from "@tanstack/react-query";
import {
	HoverCard,
	HoverCardContent,
	HoverCardTrigger,
	ScrollArea,
	Skeleton
} from "@zenml-io/react-component-library";
type Props = { provider: StackDeploymentProvider };

export function PermissionsCard({ provider }: Props) {
	return (
		<HoverCard>
			<HoverCardTrigger className="block">
				<InfoBox intent="warning">
					This will give ZenML permissions and create secret keys for secure ZenML -{">"}{" "}
					{getCloudProviderName(provider)} communication. You can revoke these permissions at any
					time.
				</InfoBox>
			</HoverCardTrigger>
			<HoverCardContent sideOffset={0} className="w-auto p-5">
				<ScrollArea viewportClassName="max-h-[300px]">
					<CardContent provider={provider} />
				</ScrollArea>
			</HoverCardContent>
		</HoverCard>
	);
}

function CardContent({ provider }: Props) {
	const { isPending, isError, error, data } = useQuery(
		stackQueries.stackDeploymentInfo({ provider: provider })
	);

	if (isPending) return <Skeleton className="h-[100px] w-full" />;
	if (isError) return <p>{error.message}</p>;

	const permissions = Object.entries(data.permissions);

	return (
		<ul className="space-y-2 pr-3 text-text-sm">
			{permissions.map(([permission, description]) => (
				<li key={permission} className="flex flex-col gap-1">
					<p>{permission}</p>
					<ul className="list-inside list-[square] pl-4 text-neutral-400 marker:text-primary-200">
						{(description as string[]).map((desc, index) => (
							<li key={index}>{desc}</li>
						))}
					</ul>
				</li>
			))}
		</ul>
	);
}
