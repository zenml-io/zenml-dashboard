import Check from "@/assets/icons/check.svg?react";
import { serviceConnectorQueries } from "@/data/service-connectors";
import { ServiceConnector } from "@/types/service-connectors";
import { useInfiniteQuery } from "@tanstack/react-query";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandSeparator
} from "@zenml-io/react-component-library";
import { Skeleton } from "@zenml-io/react-component-library/components/server";
import { cn } from "@zenml-io/react-component-library/utilities";
import clsx from "clsx";
import { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { CreateServiceConnectorFallback } from "../../service-connectors/create-fallback";

type Props = {
	connectorResourceType: string;
};

export function ConnectorSelect({ connectorResourceType }: Props) {
	const form = useFormContext();
	const [open, setOpen] = useState(false);
	const [createFallbackOpen, setCreateFallbackOpen] = useState(false);

	const connectorList = useInfiniteQuery(
		serviceConnectorQueries.serviceConnectorListInfinite({
			resource_type: connectorResourceType,
			sort_by: "desc:created"
		})
	);

	if (connectorList.isPending) return <Skeleton className="h-[60px] w-full" />;
	if (connectorList.isError) return <div>Error</div>;

	const connectors = connectorList.data?.pages.flatMap((page) => page.items);

	return (
		<>
			<Controller
				control={form.control}
				name="connector"
				render={({ field }) => (
					<Popover modal={true} open={open} onOpenChange={setOpen}>
						<PopoverTrigger asChild>
							<button
								className={clsx(
									"w-full flex-1 truncate rounded-md border border-primary-400 bg-theme-surface-secondary px-2",
									{
										"h-7": !field.value,
										"py-2 pl-2 pr-3 text-left": field.value
									}
								)}
							>
								{field.value
									? (() => {
											const connector = connectors.find((c) => c.id === field.value);
											return connector ? (
												<ConnectorItem connector={connector} />
											) : (
												"Select Connector"
											);
										})()
									: "Select Connector"}
							</button>
						</PopoverTrigger>
						<PopoverContent style={{ width: "var(--radix-popover-trigger-width)" }} align="start">
							<Command
								filter={(value, search) => {
									if (
										value.toLowerCase().includes(search.toLowerCase()) ||
										value.includes("doNotFilter-")
									)
										return 1;
									return 0;
								}}
								className="space-y-1"
							>
								<CommandInput placeholder="Search connectors..." />
								<CommandList className="space-y-1">
									<CommandEmpty>No results</CommandEmpty>
									<CommandGroup className="max-h-[300px] overflow-y-auto">
										{connectors.map((connector) => (
											<CommandItem
												key={connector.id}
												value={`${connector.id}:${connector.name}`}
												onSelect={(value) => {
													const [id] = value.split(":");
													form.setValue("connector", field.value === id ? "" : id);
													setOpen(false);
												}}
											>
												<ConnectorItem connector={connector} />
												<Check
													className={cn(
														"fill-brand-500 ml-auto size-4 shrink-0",
														field.value === connector.id ? "opacity-100" : "opacity-0"
													)}
												/>
											</CommandItem>
										))}
									</CommandGroup>
									<CommandSeparator className="-mx-1" />
									<CommandGroup>
										{connectorList.hasNextPage && (
											<CommandItem
												value="doNotFilter-fetch-more"
												className="flex items-center font-semibold"
												onSelect={() => {
													connectorList.fetchNextPage();
												}}
											>
												Load more
											</CommandItem>
										)}
										<CommandItem
											value="doNotFilter-create-new"
											className="flex items-center font-semibold"
											onSelect={() => {
												// Handle create new action
												setOpen(false);
												setCreateFallbackOpen(true);
											}}
										>
											Create new Service Connector
										</CommandItem>
									</CommandGroup>
								</CommandList>
							</Command>
						</PopoverContent>
					</Popover>
				)}
			/>
			<CreateServiceConnectorFallback open={createFallbackOpen} setOpen={setCreateFallbackOpen} />
		</>
	);
}

function ConnectorItem({ connector }: { connector: ServiceConnector }) {
	return (
		<div className="flex items-center gap-2">
			{typeof connector.body?.connector_type === "object" &&
				connector.body?.connector_type.logo_url && (
					<img
						src={connector.body.connector_type.logo_url}
						alt={connector.name}
						className="size-5 shrink-0"
					/>
				)}
			<div>
				<div className="font-semibold">{connector.name}</div>
				<div className="text-theme-text-secondary">{connector.id.split("-")[0]}</div>
			</div>
		</div>
	);
}
