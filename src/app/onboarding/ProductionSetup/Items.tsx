import Plus from "@/assets/icons/plus.svg?react";
import { Codesnippet } from "@/components/CodeSnippet";
import { HelpBox } from "@/components/fallback-pages/Helpbox";
import { ChecklistItem } from "@/components/onboarding/ChecklistItem";
import {} from "@/lib/onboarding";
import { routes } from "@/router/routes";
import { OnboardingStep } from "@/types/onboarding";
import { Button } from "@zenml-io/react-component-library";
import { Link } from "react-router-dom";

export function CreateNewStack({ completed, active, hasDownstreamStep }: OnboardingStep) {
	const link =
		routes.stacks.create.index + "?" + new URLSearchParams({ origin: "onboarding" }).toString();
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
				<div className="space-y-3">
					<p>Connect your Cloud to deploy your ZenML pipelines in a remote stack.</p>
					<Button className="w-fit" size="md" asChild>
						<Link className="flex" to={link}>
							<Plus className="h-5 w-5 shrink-0 fill-white" />
							Register a stack
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
			title="Run the pipeline in the new stack"
			active={active}
		>
			<div className="space-y-5">
				<div className="space-y-1">
					<p className="text-text-sm text-theme-text-secondary">Set the new stack</p>
					<Codesnippet wrap codeClasses="whitespace-pre-wrap" code="zenml stack set REMOTE_STACK" />
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
