import Help from "@/assets/icons/help.svg?react";
import { Codesnippet } from "@/components/CodeSnippet";
import { HelpBox } from "@/components/fallback-pages/Helpbox";
import { ChecklistItem } from "@/components/onboarding/ChecklistItem";
import { useServerInfo } from "@/data/server/info-query";
import { getLoginCommand } from "@/lib/login-command";
import { OnboardingStep } from "@/types/onboarding";
import { StackDeploymentProvider } from "@/types/stack";
import { Box, Skeleton, buttonVariants } from "@zenml-io/react-component-library";
import { Dispatch, SetStateAction } from "react";
import { PipelineSnippet } from "./pipeline-snippet";
import { DisabledOption, ProviderOnboardingStep } from "./provider-step";
import { SetProject } from "./set-project";
import { RunScript } from "./run-script";
import { InfoBox } from "@/components/Infobox";
import { SCRIPT_CONFIG } from "./constant";

export function ConnectZenMLStep({ completed, hasDownstreamStep, active }: OnboardingStep) {
	const { data } = useServerInfo({ throwOnError: true });

	return (
		<ChecklistItem
			active={active}
			hasDownstream={hasDownstreamStep}
			completed={completed}
			title="Install and log in to ZenML (5 min)"
		>
			<div className="flex flex-col gap-5">
				<div>
					<p className="mb-1 text-text-sm text-theme-text-secondary">Install ZenML</p>
					<Codesnippet
						code={`pip install "zenml==${data ? data.version : <Skeleton className="w-7" />}" scikit-learn scikit-image "numpy<2.0.0"`}
					/>
				</div>
				<div>
					<p className="mb-1 text-text-sm text-theme-text-secondary">Log in to your ZenML Server</p>
					<Codesnippet code={getLoginCommand(data?.deployment_type || "other")} />
				</div>
				<HelpBox link="https://docs.zenml.io/user-guides/production-guide/deploying-zenml#connecting-to-a-deployed-zenml" />
			</div>
		</ChecklistItem>
	);
}

export function RunFirstPipeline({ active, completed, hasDownstreamStep }: OnboardingStep) {
	return (
		<ChecklistItem
			active={active}
			hasDownstream={hasDownstreamStep}
			completed={completed}
			title="Run a pipeline (2 min)"
		>
			<div className="flex flex-col gap-5">
				<SetProject projectName="default" />
				<PipelineSnippet />
				<div>
					<p className="mb-1 text-text-sm text-theme-text-secondary">Run the training pipeline.</p>
					<Codesnippet code="python run.py" />
				</div>
				<Box className="flex w-full flex-wrap items-center justify-between gap-y-1 p-2">
					<div className="flex items-center gap-[10px]">
						<div className="flex h-7 w-7 items-center justify-center rounded-sm bg-teal-25">
							<Help className="h-5 w-5 fill-teal-400" />
						</div>
						<p>Do you need help?</p>
					</div>
					<div className="flex items-center gap-1">
						<a
							target="_blank"
							rel="noopener noreferrer"
							className={buttonVariants({ intent: "secondary", emphasis: "subtle", size: "md" })}
							href="https://github.com/zenml-io/zenml/blob/main/examples/quickstart/README.md"
						>
							Open the Readme
						</a>
						<a
							target="_blank"
							rel="noopener noreferrer"
							className={buttonVariants({ intent: "primary", emphasis: "subtle", size: "md" })}
							href="https://docs.zenml.io/user-guides/starter-guide/create-an-ml-pipeline"
						>
							Browse our docs
						</a>
					</div>
				</Box>
			</div>
		</ChecklistItem>
	);
}

export function ConnectRemoteStorage({
	completed,
	active,
	hasDownstreamStep,
	provider,
	setProvider
}: OnboardingStep & {
	provider: StackDeploymentProvider | null;
	setProvider: Dispatch<SetStateAction<StackDeploymentProvider | null>>;
}) {
	return (
		<ChecklistItem
			hasDownstream={hasDownstreamStep}
			completed={completed}
			title="Connect remote storage (5 min)"
			active={active}
		>
			<div className="space-y-5">
				<InfoBox>
					ZenML stacks provides the cloud infrastructure needed to run your ML pipelines at scale,
					giving you access to more compute resources than your local machine.{" "}
					<a
						rel="noopener noreferrer"
						target="_blank"
						className="link text-theme-text-brand"
						href="https://docs.zenml.io/stacks"
					>
						Learn more
					</a>
				</InfoBox>
				<ProviderOnboardingStep selectedProvider={provider} setSelectedProvider={setProvider} />

				{provider ? (
					<RunScript provider={provider} />
				) : (
					<DisabledOption number={2}>Run the script</DisabledOption>
				)}
				<HelpBox link="https://docs.zenml.io/stacks" />
			</div>
		</ChecklistItem>
	);
}

export function RunNewPipeline({
	active,
	completed,
	hasDownstreamStep,
	provider
}: OnboardingStep & {
	provider: StackDeploymentProvider | null;
}) {
	const stackName = provider ? SCRIPT_CONFIG[provider].stackName : "<REMOTE_STACK_NAME>";
	const integrationName = provider ? SCRIPT_CONFIG[provider].integration : "<INTEGRATION_NAME>";
	return (
		<ChecklistItem
			hasDownstream={hasDownstreamStep}
			completed={completed}
			title="Run a pipeline in a remote stack (3 min)"
			active={active}
		>
			<div className="space-y-5">
				<div className="space-y-1">
					<p className="text-text-sm text-theme-text-secondary">Install the stack integrations</p>
					<Codesnippet
						wrap
						codeClasses="whitespace-pre-wrap"
						code={`zenml integration install ${integrationName}`}
					/>
				</div>
				<div className="space-y-1">
					<p className="text-text-sm text-theme-text-secondary">Set the new stack</p>
					<Codesnippet
						wrap
						codeClasses="whitespace-pre-wrap"
						code={`zenml stack set ${stackName}`}
					/>
				</div>
				<div className="space-y-1">
					<p className="text-text-sm text-theme-text-secondary">Run the pipeline</p>
					<Codesnippet wrap codeClasses="whitespace-pre-wrap" code="python run.py" />
				</div>
				<div>
					<HelpBox link="https://docs.zenml.io/stacks" />
				</div>
			</div>
		</ChecklistItem>
	);
}
