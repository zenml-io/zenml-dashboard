import { Codesnippet } from "@/components/CodeSnippet";
import { HelpBox } from "@/components/fallback-pages/Helpbox";
import { ChecklistItem } from "@/components/onboarding/ChecklistItem";
import {} from "@/lib/onboarding";
import { OnboardingStep } from "@/types/onboarding";
import { useState } from "react";
import { getArtifactStoreStep } from "./ArtifactStore";
import { getServiceConnectorStep } from "./ConnectorContent";
import { CloudProvider, ProviderSelect } from "./ProviderSelect";

export function CreateServiceConnector({ hasDownstreamStep, active, completed }: OnboardingStep) {
	const [selectedProvider, setSelectedProvider] = useState<CloudProvider>("aws");

	return (
		<ChecklistItem
			hasDownstream={hasDownstreamStep}
			active={active}
			completed={completed}
			title="Create a service connector"
		>
			<p className="mb-3">
				A service connector grants users of your ZenML tenant the ability to access components like
				your artifact store{" "}
				<LearnMoreLink href="https://docs.zenml.io/user-guide/production-guide/remote-storage#configuring-permissions-with-your-first-service-connector" />
			</p>
			<div className="space-y-5">
				<div className="space-y-1">
					<label
						htmlFor="artifact-store-provider"
						className="text-text-sm text-theme-text-secondary"
					>
						Select your cloud provider
					</label>
					<ProviderSelect
						id="artifact-store-provider"
						value={selectedProvider}
						setValue={setSelectedProvider}
					/>
				</div>
				{getServiceConnectorStep(selectedProvider)}
				<div>
					<HelpBox link="https://docs.zenml.io/user-guide/production-guide/remote-storage#configuring-permissions-with-your-first-service-connector" />
				</div>
			</div>
		</ChecklistItem>
	);
}

export function CreateArtifactStore({ completed, active, hasDownstreamStep }: OnboardingStep) {
	const [selectedProvider, setSelectedProvider] = useState<CloudProvider>("aws");
	return (
		<ChecklistItem
			hasDownstream={hasDownstreamStep}
			completed={completed}
			title="Create an artifact store"
			active={active}
		>
			<p className="mb-3">
				Configuring a remote artifact store will version your pipeline's data directly in your cloud
				provider{" "}
				<LearnMoreLink href="https://docs.zenml.io/user-guide/production-guide/remote-storage" />
			</p>
			<div className="space-y-5">
				<div className="space-y-1">
					<label
						htmlFor="artifact-store-provider"
						className="text-text-sm text-theme-text-secondary"
					>
						Select your cloud provider
					</label>
					<ProviderSelect
						displayOther
						id="artifact-store-provider"
						value={selectedProvider}
						setValue={setSelectedProvider}
					/>
				</div>
				{getArtifactStoreStep(selectedProvider)}
				<div>
					<HelpBox link="https://docs.zenml.io/user-guide/production-guide/remote-storage" />
				</div>
			</div>
		</ChecklistItem>
	);
}

export function CreateNewStack({ completed, active, hasDownstreamStep }: OnboardingStep) {
	return (
		<ChecklistItem
			hasDownstream={hasDownstreamStep}
			completed={completed}
			title="Create a new stack"
			active={active}
		>
			<p className="mb-3">
				A stack configures how a pipeline is executed{" "}
				<LearnMoreLink href="https://docs.zenml.io/user-guide/production-guide/understand-stacks" />
			</p>
			<div className="space-y-5">
				<div>
					<p className="mb-1 text-text-sm text-theme-text-secondary">
						Download the quickstart example to your local machine
					</p>
					<Codesnippet
						codeClasses="whitespace-pre-wrap"
						code="zenml stack register local_with_remote_storage -o default -a cloud_artifact_store"
					/>
				</div>
				<HelpBox link="https://docs.zenml.io/user-guide/production-guide/understand-stacks" />
			</div>
		</ChecklistItem>
	);
}

export function RunNewPipeline({ active, completed, hasDownstreamStep }: OnboardingStep) {
	return (
		<ChecklistItem
			hasDownstream={hasDownstreamStep}
			completed={completed}
			title="Run the pipeline in the new stack"
			active={active}
		>
			<div className="space-y-5">
				<div className="space-y-1">
					<p className="text-text-sm text-theme-text-secondary">Set the new stack</p>
					<Codesnippet
						wrap
						codeClasses="whitespace-pre-wrap"
						code="zenml stack set local_with_remote_storage"
					/>
				</div>
				<div className="space-y-1">
					<p className="text-text-sm text-theme-text-secondary">Run the pipeline</p>
					<Codesnippet
						wrap
						codeClasses="whitespace-pre-wrap"
						code="python run.py --training-pipeline"
					/>
				</div>
				<div>
					<HelpBox link="https://docs.zenml.io/user-guide/production-guide/understand-stacks" />
				</div>
			</div>
		</ChecklistItem>
	);
}

export function LearnMoreLink({ href }: { href: string }) {
	return (
		<a
			href={href}
			rel="noopener noreferrer"
			target="_blank"
			className="link text-text-sm font-semibold text-theme-text-brand"
		>
			Learn more
		</a>
	);
}
