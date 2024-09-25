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
			<div className="space-y-2">
				<h1 className="text-text-xl font-semibold">Secrets</h1>

				<p className="text-text-sm text-theme-text-secondary">
					Configure and manage your pipeline secrets and configurations.{" "}
					<a
						target="_blank"
						rel="noreferrer noopener"
						href="https://docs.zenml.io/how-to/interact-with-secrets"
						className="link text-primary-400"
					>
						Learn More
					</a>
				</p>
			</div>
			<SecretsTable />
		</Box>
	);
}
