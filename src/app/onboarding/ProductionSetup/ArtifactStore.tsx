import { Codesnippet } from "@/components/CodeSnippet";
import { buttonVariants } from "@zenml-io/react-component-library";
import { LearnMoreLink } from "./Items";
import { CloudProvider } from "./ProviderSelect";

function AWSStore() {
	return (
		<>
			<div className="space-y-1">
				<p className="text-text-sm text-theme-text-secondary">
					Install the AWS CLI on your machine
				</p>
				<div className="inline-block">
					<a
						target="_blank"
						rel="noopener noreferrer"
						className={buttonVariants({
							intent: "primary",
							emphasis: "subtle",
							size: "md"
						})}
						href="https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html"
					>
						How to install the AWS CLI
					</a>
				</div>
			</div>
			<div className="space-y-1">
				<p className="text-text-sm text-theme-text-secondary">
					Create a AWS bucket or identify an existing one{" "}
					<span className="text-theme-text-tertiary">(Optional)</span>{" "}
					<LearnMoreLink href="https://awscli.amazonaws.com/v2/documentation/api/latest/reference/s3api/create-bucket.html" />
				</p>
				<Codesnippet
					wrap
					codeClasses="whitespace-pre-wrap"
					code="aws s3api create-bucket --bucket your-bucket-name --region your-region-name"
				/>
			</div>
			<div className="space-y-1">
				<p className="text-text-sm text-theme-text-secondary">Install the S3 ZenML integration</p>
				<Codesnippet
					wrap
					codeClasses="whitespace-pre-wrap"
					code="zenml integration install s3 -y"
				/>
			</div>
			<div className="space-y-1">
				<p className="text-text-sm text-theme-text-secondary">Register the artifact store</p>
				<Codesnippet
					wrap
					codeClasses="whitespace-pre-wrap"
					code="zenml artifact-store register cloud_artifact_store -f s3 --path=s3://bucket-name --connector <CONNECTOR_ID>"
				/>
			</div>
		</>
	);
}

function GCPStore() {
	return (
		<>
			<div className="space-y-1">
				<p className="text-text-sm text-theme-text-secondary">
					Install the Google Cloud CLI on your machine
				</p>
				<div className="inline-block">
					<a
						target="_blank"
						rel="noopener noreferrer"
						className={buttonVariants({
							intent: "primary",
							emphasis: "subtle",
							size: "md"
						})}
						href="https://cloud.google.com/sdk/docs/install-sdk"
					>
						How to install the Google Cloud CLI
					</a>
				</div>
			</div>
			<div className="space-y-1">
				<p className="text-text-sm text-theme-text-secondary">
					Create a GCP bucket or identify an existing one{" "}
					<span className="text-theme-text-tertiary">(Optional)</span>{" "}
					<LearnMoreLink href="https://cloud.google.com/storage/docs/creating-buckets" />
				</p>
				<Codesnippet
					wrap
					codeClasses="whitespace-pre-wrap"
					code="gsutil mb gs://your-bucket-name"
				/>
			</div>
			<div className="space-y-1">
				<p className="text-text-sm text-theme-text-secondary">Install the GCP ZenML integration </p>
				<Codesnippet
					wrap
					codeClasses="whitespace-pre-wrap"
					code="zenml integration install gcp -y"
				/>
			</div>
			<div className="space-y-1">
				<p className="text-text-sm text-theme-text-secondary">Register the artifact store</p>
				<Codesnippet
					wrap
					codeClasses="whitespace-pre-wrap"
					code="zenml artifact-store register cloud_artifact_store -f gcp --path=gs://bucket-name --connector <CONNECTOR_ID>"
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
					Install the Azure CLI on your machine
				</p>
				<div className="inline-block">
					<a
						target="_blank"
						rel="noopener noreferrer"
						className={buttonVariants({
							intent: "primary",
							emphasis: "subtle",
							size: "md"
						})}
						href="https://learn.microsoft.com/en-us/cli/azure/install-azure-cli"
					>
						How to install the Azure CLI
					</a>
				</div>
			</div>
			<div className="space-y-1">
				<p className="text-text-sm text-theme-text-secondary">
					Create a Azure bucket or identify an existing one{" "}
					<span className="text-theme-text-tertiary">(Optional)</span>{" "}
					<LearnMoreLink href="https://learn.microsoft.com/en-us/azure/storage/blobs/storage-quickstart-blobs-portal" />
				</p>
				<Codesnippet
					wrap
					codeClasses="truncate"
					code="az storage container create --name your-bucket-name --account-name your-storage-account"
				/>
			</div>
			<div className="space-y-1">
				<p className="text-text-sm text-theme-text-secondary">
					Install the Azure ZenML integration{" "}
				</p>
				<Codesnippet
					wrap
					codeClasses="whitespace-pre-wrap"
					code="zenml integration install azure -y"
				/>
			</div>
			<div className="space-y-1">
				<p className="text-text-sm text-theme-text-secondary">Register the artifact store</p>
				<Codesnippet
					wrap
					codeClasses="whitespace-pre-wrap"
					code="zenml artifact-store register cloud_artifact_store -f azure --path=az://container-name --connector <CONNECTOR_ID>"
				/>
			</div>
		</>
	);
}

function OtherStore() {
	return (
		<div className="space-y-1">
			<p className="text-text-sm text-theme-text-secondary">
				Create a remote artifact in any environment following our guides.
			</p>
			<div className="inline-block">
				<a
					target="_blank"
					rel="noopener noreferrer"
					className={buttonVariants({
						intent: "primary",
						emphasis: "subtle",
						size: "md"
					})}
					href="https://docs.zenml.io/stacks-and-components/custom-stack-solutions/implement-a-custom-stack-component"
				>
					How to create a custom artifact store
				</a>
			</div>
		</div>
	);
}

export function getArtifactStoreStep(provider: CloudProvider) {
	switch (provider) {
		case "gcp":
			return <GCPStore />;
		case "aws":
			return <AWSStore />;
		case "azure":
			return <AzureStore />;
		case "other":
			return <OtherStore />;
		default:
			break;
	}
}
