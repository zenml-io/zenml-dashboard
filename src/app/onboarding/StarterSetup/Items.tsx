import Help from "@/assets/icons/help.svg?react";
import { Codesnippet } from "@/components/CodeSnippet";
import { HelpBox } from "@/components/fallback-pages/Helpbox";
import { ChecklistItem } from "@/components/onboarding/ChecklistItem";
import { useServerInfo } from "@/data/server/info-query";
import { OnboardingStep } from "@/types/onboarding";
import { Box, Skeleton, buttonVariants } from "@zenml-io/react-component-library";

export function ConnectZenMLStep({ completed, hasDownstreamStep, active }: OnboardingStep) {
	const { data } = useServerInfo({ throwOnError: true });
	return (
		<ChecklistItem
			active={active}
			hasDownstream={hasDownstreamStep}
			completed={completed}
			title="Connect to ZenML"
		>
			<div className="flex flex-col gap-5">
				<div>
					<p className="mb-1 text-text-sm text-theme-text-secondary">Install ZenML</p>
					<Codesnippet
						code={`pip install "zenml==${data ? data.version : <Skeleton className="w-7" />}"`}
					/>
				</div>
				<div>
					<p className="mb-1 text-text-sm text-theme-text-secondary">Login to your ZenML Server</p>
					<Codesnippet code={`zenml connect --url ${window.location.origin}`} />
				</div>
				<HelpBox link="https://docs.zenml.io/user-guide/production-guide/deploying-zenml#connecting-to-a-deployed-zenml" />
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
			title="Run your first pipeline"
		>
			<div className="flex flex-col gap-5">
				<div>
					<p className="mb-1 text-text-sm text-theme-text-secondary">
						Download the quickstart example to your local machine
					</p>
					<Codesnippet code="git clone --depth 1 https://github.com/zenml-io/zenml.git && cd zenml/examples/quickstart" />
				</div>
				<div>
					<p className="mb-1 text-text-sm text-theme-text-secondary">
						Initialize ZenML in the current directory
					</p>
					<Codesnippet code="zenml init" />
				</div>
				<div>
					<p className="mb-1 text-text-sm text-theme-text-secondary">
						Install the remaining requirements apart from ZenML
					</p>
					<Codesnippet code="pip install -r requirements.txt" />
				</div>
				<div>
					<p className="mb-1 text-text-sm text-theme-text-secondary">
						Run the training pipeline.
						<br />
						Once it is running, your dashboard will show all the details of the associated run,
						models, and artifacts.
					</p>
					<Codesnippet code="python run.py --training-pipeline" />
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
							href="https://docs.zenml.io/user-guide/starter-guide/create-an-ml-pipeline"
						>
							Browse our docs
						</a>
					</div>
				</Box>
			</div>
		</ChecklistItem>
	);
}
