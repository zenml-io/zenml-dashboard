import Help from "@/assets/icons/help.svg?react";
import Plus from "@/assets/icons/plus.svg?react";
import { Codesnippet } from "@/components/CodeSnippet";
import { HelpBox } from "@/components/fallback-pages/Helpbox";
import { ChecklistItem } from "@/components/onboarding/ChecklistItem";
import { useServerInfo } from "@/data/server/info-query";
import { routes } from "@/router/routes";
import { OnboardingStep } from "@/types/onboarding";
import { Box, Button, Skeleton, buttonVariants } from "@zenml-io/react-component-library";
import { Link } from "react-router-dom";

export function ConnectZenMLStep({ completed, hasDownstreamStep, active }: OnboardingStep) {
	const { data } = useServerInfo({ throwOnError: true });
	return (
		<ChecklistItem
			active={active}
			hasDownstream={hasDownstreamStep}
			completed={completed}
			title="Install and Connect ZenML (5 min)"
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
					<Codesnippet code={`zenml login ${window.location.origin}`} />
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
			title="Run a pipeline (2 min)"
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

export function CreateNewStack({ completed, active, hasDownstreamStep }: OnboardingStep) {
	const link =
		routes.stacks.create.index + "?" + new URLSearchParams({ origin: "onboarding" }).toString();
	return (
		<ChecklistItem
			hasDownstream={hasDownstreamStep}
			completed={completed}
			title="Connect to a remote stack (5 min)"
			active={active}
		>
			<p className="mb-3">
				A stack configures how a pipeline is executed{" "}
				<LearnMoreLink href="https://docs.zenml.io/user-guide/production-guide/understand-stacks" />
			</p>
			<div className="space-y-5">
				<div className="space-y-3">
					<p>Connect your Cloud to deploy your ZenML pipelines in a remote stack.</p>
					<Button className="w-fit" size="md" asChild>
						<Link className="flex" to={link}>
							<Plus className="h-5 w-5 shrink-0 fill-white" />
							Register a remote stack
						</Link>
					</Button>
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
			title="Run a pipeline in a remote stack (3 min)"
			active={active}
		>
			<div className="space-y-5">
				<div className="space-y-1">
					<p className="text-text-sm text-theme-text-secondary">Set the new stack</p>
					<Codesnippet wrap codeClasses="whitespace-pre-wrap" code="zenml stack set REMOTE_STACK" />
				</div>
				<div className="space-y-1">
					<p className="text-text-sm text-theme-text-secondary">Run the pipeline</p>
					<Codesnippet wrap codeClasses="whitespace-pre-wrap" code="python run.py" />
				</div>
				<div>
					<HelpBox link="https://docs.zenml.io/user-guide/production-guide/understand-stacks" />
				</div>
			</div>
		</ChecklistItem>
	);
}

function LearnMoreLink({ href }: { href: string }) {
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
