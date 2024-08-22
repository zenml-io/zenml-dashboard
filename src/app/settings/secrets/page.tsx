import { Box } from "@zenml-io/react-component-library";
import SecretsTable from "./SecretsTable";
import { useEffect } from "react";
import { useBreadcrumbsContext } from "../../../layouts/AuthenticatedLayout/BreadcrumbsContext";

export default function SecretsPage() {
	const { setCurrentBreadcrumbData } = useBreadcrumbsContext();
	useEffect(() => {
		setCurrentBreadcrumbData({ segment: "secrets", data: null });
	}, []);
	return (
		<Box className="space-y-4 p-5">
			<h1 className="text-text-xl font-semibold">Secrets</h1>
			<div className="flex flex-row space-x-2">
				<p className="text-text-md text-theme-text-secondary">
					Configure and manage your pipeline secrets and configurations.
				</p>
				<a
					href="https://docs.zenml.io/how-to/interact-with-secrets"
					className="text-text-md  text-primary-400"
				>
					Learn More
				</a>
			</div>
			<SecretsTable />
		</Box>
	);
}
