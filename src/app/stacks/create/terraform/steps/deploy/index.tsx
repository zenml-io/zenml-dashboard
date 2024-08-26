import ExternalLink from "@/assets/icons/link-external.svg?react";
import ConfigIcon from "@/assets/icons/logs.svg?react";
import { Codesnippet } from "@/components/CodeSnippet";
import { InfoBox } from "@/components/Infobox";
import { Numberbox } from "@/components/NumberBox";
import { TerraformCommands } from "@/components/stacks/new-infra/TerraformCommands";
import * as WizardStep from "@/components/wizard/Wizard";
import { stackQueries } from "@/data/stacks";
import { routes } from "@/router/routes";
import { StackDeploymentProvider } from "@/types/stack";
import { useQuery } from "@tanstack/react-query";
import { Button, Skeleton } from "@zenml-io/react-component-library/components/server";
import { useNavigate } from "react-router-dom";
import { StackWizardFooter } from "../../../components/WizardFooter";
import { clearWizardData } from "../../persist";
import { useCreateTerraformContext } from "../../TerraformContext";
import { PollingSection } from "./Pollingstep";

export function DeploymentStep() {
	return (
		<WizardStep.Wrapper>
			<WizardStep.Header>Deploy ZenML Stack</WizardStep.Header>
			<WizardStep.Body>
				<section className="space-y-5">
					<Header />
					<CliStep />
					<CodeSnippetStep />
					<TerraformCommands />
					<PollingSection />
				</section>
			</WizardStep.Body>
			<StackWizardFooter displayCancel={false}>
				<CancelButton />
				<NextButton />
			</StackWizardFooter>
		</WizardStep.Wrapper>
	);
}

function NextButton() {
	return (
		<Button disabled size="md">
			Next
		</Button>
	);
}

function Header() {
	return (
		<div className="space-y-1">
			<p className="flex items-center gap-1 text-text-lg font-semibold">
				<ConfigIcon className="h-5 w-5 fill-primary-400" />
				Configuration
			</p>
			<p className="text-theme-text-secondary">Follow the steps to deploy your Stack.</p>
		</div>
	);
}

function getLink(type: StackDeploymentProvider) {
	switch (type) {
		case "aws":
			return "https://aws.amazon.com/cli/";
		case "azure":
			return "https://learn.microsoft.com/en-us/cli/azure/";
		case "gcp":
			return "https://cloud.google.com/sdk/gcloud";
	}
}

function getCli(type: StackDeploymentProvider) {
	switch (type) {
		case "aws":
			return "AWS";
		case "gcp":
			return "gcloud";
		case "azure":
			return "Azure";
	}
}

function CliStep() {
	const { data } = useCreateTerraformContext();
	return (
		<div className="space-y-5">
			<div className="space-y-1">
				<div className="flex items-center gap-1">
					<Numberbox>1</Numberbox>
					<span className="text-text-lg font-semibold">
						Login locally with the {getCli(data.provider || "aws")} CLI
					</span>
				</div>
				<p className="text-theme-text-secondary">
					Make sure you are logged in locally with an account with appropriate permissions.
				</p>

				<Button asChild className="w-fit gap-1" intent="secondary" emphasis="subtle" size="md">
					<a rel="noopener noreferrer" target="_blank" href={getLink(data.provider || "aws")}>
						<span>Learn More</span>
						<ExternalLink className="h-5 w-5 shrink-0 fill-primary-900" />
					</a>
				</Button>
			</div>
		</div>
	);
}

function CodeSnippetStep() {
	const { data } = useCreateTerraformContext();
	return (
		<div className="space-y-5">
			<div className="space-y-1">
				<div className="flex items-center gap-1">
					<Numberbox>2</Numberbox>
					<span className="text-text-lg font-semibold">
						Create a file with the following configuration
					</span>
				</div>
				<p className="text-theme-text-secondary">
					Create a file named <code className="font-mono text-primary-400">main.tf</code> in the
					Cloud Shell and copy and paste the Terraform configuration below into it.
				</p>
			</div>
			{data.provider === "gcp" && (
				<InfoBox intent="warning">
					Please replace <code className="font-mono text-primary-400">project_id</code> in the
					following Terraform script with your own one.
				</InfoBox>
			)}
			<ProviderCodesnippet />
		</div>
	);
}

function ProviderCodesnippet() {
	const { data } = useCreateTerraformContext();
	const deploymentConfig = useQuery({
		...stackQueries.stackDeploymentConfig({
			provider: data.provider || "aws",
			terraform: true,
			stack_name: data.stackName!,
			location: data.location
		}),
		enabled: !!data.stackName
	});
	if (deploymentConfig.isError) return null;
	if (deploymentConfig.isPending) return <Skeleton className="h-[200px] w-full" />;

	return (
		<Codesnippet
			fullWidth
			highlightCode
			codeClasses="whitespace-pre-wrap word-break-all"
			wrap
			code={deploymentConfig.data.configuration || ""}
		/>
	);
}

function CancelButton() {
	const navigate = useNavigate();

	function onCancel() {
		clearWizardData();
		navigate(routes.stacks.create.index);
	}

	return (
		<Button onClick={() => onCancel()} intent="secondary" size="md">
			Cancel
		</Button>
	);
}
