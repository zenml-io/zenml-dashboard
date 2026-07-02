import Check from "@/assets/icons/check.svg?react";
import Plus from "@/assets/icons/plus.svg?react";
import { DebouncedInput } from "@/components/debounced-input";
import { serviceConnectorQueries } from "@/data/service-connectors";
import { ServiceConnector } from "@/types/service-connectors";
import { useInfiniteQuery } from "@tanstack/react-query";
import {
	Command,
	CommandGroup,
	CommandItem,
	CommandList,
	CommandSeparator,
	Popover,
	PopoverContent,
	PopoverTrigger
} from "@zenml-io/react-component-library";
import { cn } from "@zenml-io/react-component-library/utilities";
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { CreateServiceConnectorFallback } from "../../service-connectors/create-fallback";

type Props = {
	connectorResourceType: string;
};

export function ConnectorSelect({ connectorResourceType }: Props) {
	const form = useFormContext();
	const [open, setOpen] = useState(false);
	const [createFallbackOpen, setCreateFallbackOpen] = useState(false);
	const [search, setSearch] = useState("");
	const selectedConnectorRef = useRef<ServiceConnector | null>(null);
	const selectedConnectorId = form.watch("connector");

	const connectorList = useInfiniteQuery(
		serviceConnectorQueries.serviceConnectorListInfinite({
			resource_type: connectorResourceType,
			sort_by: "desc:created",
			...(search ? { name: `contains:${search}` } : {})
		})
	);

	const connectors = connectorList.data?.pages.flatMap((page) => page.items) ?? [];
	const selectedConnector = connectors.find((connector) => connector.id === selectedConnectorId);
	const displayedConnector =
		selectedConnector ??
		(selectedConnectorRef.current?.id === selectedConnectorId
			? selectedConnectorRef.current
			: null);

	useEffect(() => {
		if (selectedConnector) {
			selectedConnectorRef.current = selectedConnector;
		} else if (!selectedConnectorId) {
			selectedConnectorRef.current = null;
		}
	}, [selectedConnector, selectedConnectorId]);

	function handleOpenChange(nextOpen: boolean) {
		if (nextOpen) {
			setSearch("");
		}
		setOpen(nextOpen);
	}

	return (
		<>
			<Controller
				control={form.control}
				name="connector"
				render={({ field }) => (
					<Popover modal={true} open={open} onOpenChange={handleOpenChange}>
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
								{displayedConnector ? (
									<ConnectorItem connector={displayedConnector} />
								) : (
									"Select Connector"
								)}
							</button>
						</PopoverTrigger>
						<PopoverContent
							className="p-0"
							style={{ width: "var(--radix-popover-trigger-width)" }}
							align="start"
						>
							<Command shouldFilter={false}>
								<div className="p-2">
									<DebouncedInput
										value={search}
										onChange={setSearch}
										placeholder="Search connectors..."
										className="w-full"
										inputSize="sm"
									/>
								</div>
								<CommandList className="px-2 pb-2">
									<div className="space-y-1">
										{connectorList.isPending ? (
											<div className="p-2 text-center text-theme-text-secondary">
												Loading connectors...
											</div>
										) : connectorList.isError ? (
											<div className="p-2 text-center text-theme-text-secondary">
												Error loading connectors
											</div>
										) : connectors.length > 0 ? (
											<CommandGroup className="max-h-[300px] overflow-y-auto">
												{connectors.map((connector) => (
													<CommandItem
														key={connector.id}
														value={connector.id}
														onSelect={(id) => {
															const isSelected = field.value === id;
															selectedConnectorRef.current = isSelected ? null : connector;
															form.setValue("connector", isSelected ? "" : id);
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
										) : (
											<div className="p-2 text-center text-theme-text-secondary">
												No connectors found
											</div>
										)}
										<CommandSeparator className="-mx-1" />

										<CommandGroup>
											{connectorList.isSuccess && connectorList.hasNextPage && (
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
												className="flex items-center gap-2 font-semibold"
												onSelect={() => {
													// Handle create new action
													setOpen(false);
													setCreateFallbackOpen(true);
												}}
											>
												<Plus className="size-3 shrink-0 fill-neutral-400" />
												Create new Service Connector
											</CommandItem>
										</CommandGroup>
									</div>
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
