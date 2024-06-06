import { Codesnippet } from "@/components/CodeSnippet";
import { LearnMoreLink } from "./Items";
import { CloudProvider } from "./ProviderSelect";

function AWSConnector() {
	return (
		<>
			<div className="space-y-1">
				<p className="text-text-sm text-theme-text-secondary">
					Create a AWS service connector using the IAM Method{" "}
					<LearnMoreLink href="https://docs.zenml.io/how-to/auth-management/aws-service-connector#aws-iam-role" />
				</p>
				<Codesnippet
					wrap
					codeClasses="whitespace-pre-wrap"
					code="AWS_PROFILE=<AWS_PROFILE> zenml service-connector register cloud_connector --type aws --auto-configure"
				/>
			</div>
		</>
	);
}

function GCPConnector() {
	return (
		<>
			<div className="space-y-1">
				<p className="text-text-sm text-theme-text-secondary">
					Create a GCP service connector using the Service Account Method{" "}
					<LearnMoreLink href="https://docs.zenml.io/how-to/auth-management/gcp-service-connector#gcp-service-account" />
				</p>
				<Codesnippet
					wrap
					codeClasses="whitespace-pre-wrap"
					code="zenml service-connector register cloud_connector --type gcp --auth-method service-account --service_account_json=@<PATH_TO_SERVICE_ACCOUNT_JSON> --project-id=<PROJECT_ID> --generate_temporary_tokens=False"
				/>
			</div>
		</>
	);
}

function AzureStore() {
	return (
		<>
			<div className="space-y-1">
				<p className="text-text-sm text-theme-text-secondary">
					Create an Azure service connector using the Service Principal Method{" "}
					<LearnMoreLink href="https://docs.zenml.io/how-to/auth-management/azure-service-connector#azure-service-principal" />
				</p>
				<Codesnippet
					wrap
					codeClasses="whitespace-pre-wrap"
					code="zenml service-connector register cloud_connector --type azure --auth-method service-principal --tenant_id=<TENANT_ID> --client_id=<CLIENT_ID> --client_secret=<CLIENT_SECRET>"
				/>
			</div>
		</>
	);
}

export function getServiceConnectorStep(provider: CloudProvider) {
	switch (provider) {
		case "gcp":
			return <GCPConnector />;
		case "aws":
			return <AWSConnector />;
		case "azure":
			return <AzureStore />;
		default:
			break;
	}
}
