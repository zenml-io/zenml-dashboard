import { Codesnippet } from "@/components/CodeSnippet";
import { HelpBox } from "@/components/fallback-pages/Helpbox";
import { ChecklistItem } from "@/components/onboarding/ChecklistItem";
import { useServerInfo } from "@/data/server/info-query";
import { getLoginCommand } from "@/lib/login-command";
import { OnboardingStep } from "@/types/onboarding";
import { Skeleton } from "@zenml-io/react-component-library";
import { OnboardingHelpBox } from "./helpbox";
import { PipelineSnippet } from "./pipeline-snippet";
import { SetProject } from "./set-project";

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
						code={`uv pip install "zenml==${data ? data.version : <Skeleton className="w-7" />}"`}
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
				<OnboardingHelpBox href="https://docs.zenml.io/user-guides/starter-guide/create-an-ml-pipeline" />
			</div>
		</ChecklistItem>
	);
}

export function DeployPipeline({ active, completed, hasDownstreamStep }: OnboardingStep) {
	return (
		<ChecklistItem
			active={active}
			hasDownstream={hasDownstreamStep}
			completed={completed}
			title="Deploy your pipeline (2 min)"
		>
			<div className="flex flex-col gap-5">
				<div className="space-y-1">
					<p>Deploy the pipeline</p>
					<p className="text-text-sm text-theme-text-secondary">
						Deploying your pipeline provides you with an API endpoint that you can call to trigger a
						pipeline run.
					</p>
				</div>
				<Codesnippet code="zenml pipeline deploy run.hello_pipeline" />
				<OnboardingHelpBox href="https://docs.zenml.io/concepts/deployment" />
			</div>
		</ChecklistItem>
	);
}
