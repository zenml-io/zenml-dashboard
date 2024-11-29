import { Box } from "@zenml-io/react-component-library/components/server";
import ServiceAccountsTable from "./Table";

export default function ServiceAccountPage() {
	return (
		<Box className="space-y-4 p-5">
			<Header />
			<ServiceAccountsTable />
		</Box>
	);
}

function Header() {
	return (
		<div className="space-y-2">
			<h1 className="text-text-xl font-semibold">Service Accounts</h1>
			<div className="flex flex-wrap items-center gap-1">
				<p className="text-text-sm text-theme-text-secondary">
					Configure automated access for background tasks and integrations.
				</p>
				<a
					target="_blank"
					rel="noreferrer noopener"
					href="https://docs.zenml.io/how-to/project-setup-and-management/connecting-to-zenml/connect-with-a-service-account"
					className="link text-text-sm text-primary-400"
				>
					Learn More
				</a>
			</div>
		</div>
	);
}
