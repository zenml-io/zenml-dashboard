"use client";

import TickCircle from "@/assets/icons/tick-circle.svg?react";
import { serviceConnectorQueries } from "@/data/service-connectors";
import { useVerifyExistingConnector } from "@/data/service-connectors/verify-existing-connectors";
import { useResourcesContext } from "@/layouts/connectors-detail/resources-context";
import { useQuery } from "@tanstack/react-query";
import { Button, Skeleton } from "@zenml-io/react-component-library";
import { ReactNode, useState } from "react";
import { useParams } from "react-router-dom";
import { LoadingDialog } from "./loading-dialog";

export function VerifyButton({ children }: { children: ReactNode }) {
	const { setResources } = useResourcesContext();
	const { connectorId } = useParams() as { connectorId: string };
	const connectorQuery = useQuery({
		...serviceConnectorQueries.serviceConnectorDetail(connectorId),
		throwOnError: true
	});
	const [dialogOpen, setDialogOpen] = useState(false);
	const verifyConnector = useVerifyExistingConnector();
	if (connectorQuery.isPending) return <Skeleton className="h-7 w-[150px]" />;
	if (connectorQuery.isError) return null;

	const handleClose = () => {
		setDialogOpen(false);
	};

	return (
		<>
			<LoadingDialog
				data={verifyConnector.data}
				open={dialogOpen}
				isLoading={verifyConnector.isPending}
				isError={verifyConnector.isError}
				onClose={handleClose}
				onSuccess={() => {
					if (verifyConnector.data) {
						setResources(verifyConnector.data);
						setDialogOpen(false);
					}
				}}
			/>
			<Button
				disabled={verifyConnector.isPending && dialogOpen}
				onClick={() => {
					setDialogOpen(true);
					verifyConnector.mutate({
						connectorId
					});
				}}
				className="gap-1"
				size="md"
			>
				<TickCircle width={24} height={24} className="size-5 shrink-0 fill-white" />
				{children}
			</Button>
		</>
	);
}
