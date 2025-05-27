export function ServiceConnectorListHeader() {
	return (
		<div className="space-y-2">
			<h1 className="text-text-xl font-semibold">Service Connectors</h1>
			<p className="text-text-sm text-theme-text-secondary">
				Configure and manage your service connectors.{" "}
				<a
					target="_blank"
					rel="noreferrer noopener"
					href="https://docs.zenml.io/how-to/infrastructure-deployment/auth-management"
					className="link text-text-sm text-primary-400"
				>
					Learn More
				</a>
			</p>
		</div>
	);
}
