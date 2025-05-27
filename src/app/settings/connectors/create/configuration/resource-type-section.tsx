import Container from "@/assets/icons/container.svg?react";
import Package from "@/assets/icons/package.svg?react";
import {
	ScrollArea,
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from "@zenml-io/react-component-library/components/client";
import { Skeleton } from "@zenml-io/react-component-library/components/server";
import { Controller, useFormContext } from "react-hook-form";
import { ConnectorConfigForm } from "./schema";
import { useRegisterConnectorContext } from "../create-context";
import { serviceConnectorQueries } from "@/data/service-connectors";
import { useQuery } from "@tanstack/react-query";

export function ResourceTypeSection() {
	return (
		<section className="space-y-5">
			<div className="space-y-1">
				<div className="flex items-center gap-1">
					<Package width={24} height={24} className="shrink-0 fill-primary-400" />
					<p className="text-text-lg font-semibold">Select your resource type</p>
				</div>
				<p className="text-theme-text-secondary">
					Select resource types your connector will provide access to. Choose a specific type or
					enable all available resources.{" "}
					<a
						target="_blank"
						rel="noopener noreferrer"
						href="https://docs.zenml.io/how-to/infrastructure-deployment/auth-management/service-connectors-guide#resource-types"
						className="link text-theme-text-brand"
					>
						Learn More
					</a>
				</p>
			</div>
			<ResourceTypeSelect />
		</section>
	);
}

function ResourceTypeSelect() {
	const { control } = useFormContext<ConnectorConfigForm>();
	const { connectorType } = useRegisterConnectorContext();
	const typeQuery = useQuery(serviceConnectorQueries.serviceConnectorTypeDetail(connectorType));

	if (typeQuery.isError) return <p>Failed to fetch Connector Type {connectorType}</p>;
	if (typeQuery.isPending) return <Skeleton className="h-7 w-full" />;

	const type = typeQuery.data;

	return (
		<Controller
			control={control}
			name="resourceType"
			render={({ field }) => (
				<Select onValueChange={field.onChange} defaultValue={field.value}>
					<SelectTrigger className="border border-theme-border-moderate">
						<SelectValue placeholder="Select your Resource Type" />
					</SelectTrigger>
					<SelectContent className="">
						<ScrollArea viewportClassName="max-h-[300px]">
							{type.resource_types.map((item) => (
								<SelectItem key={item.name} value={item.resource_type}>
									<div className="flex items-center gap-1">
										{item.logo_url && (
											<img
												alt={item.name}
												width={24}
												height={24}
												className="shrink-0 object-contain"
												src={item.logo_url}
											/>
										)}
										{item.name}
									</div>
								</SelectItem>
							))}
							<SelectItem value="all">
								<div className="flex items-center gap-1">
									<Container
										width={24}
										height={24}
										className="shrink-0 fill-neutral-400 object-contain"
									/>
									All resources types
								</div>
							</SelectItem>
						</ScrollArea>
					</SelectContent>
				</Select>
			)}
		/>
	);
}
