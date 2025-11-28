import { Tick } from "@/components/Tick";
import { ComponentBadge } from "@/components/stack-components/ComponentBadge";
import * as WizardStep from "@/components/wizard/Wizard";
import { stackQueries } from "@/data/stacks";
import { extractComponents } from "@/lib/components";
import { snakeCaseToTitleCase } from "@/lib/strings";
import { routes } from "@/router/routes";
import { StackComponent } from "@/types/components";
import { Stack } from "@/types/stack";
import { useQuery } from "@tanstack/react-query";
import { Avatar, AvatarFallback } from "@zenml-io/react-component-library/components/client";
import { Button, Skeleton } from "@zenml-io/react-component-library/components/server";
import { Link } from "react-router-dom";
import { StackWizardFooter } from "../../../components/WizardFooter";
import { useExistingInfraContext } from "../../ExistingInfraContext";
import { FlavorIcon } from "../../FlavorIcon";

export function FinalStep() {
	const { data } = useExistingInfraContext();

	const stack = useQuery({
		...stackQueries.stackDetail(data.createdStackId || ""),
		throwOnError: true
	});

	if (stack.isError) return null;
	if (stack.isPending) return <Skeleton className="h-[200px] w-full" />;

	const stackData = stack.data;

	const components = extractComponents(
		stack.data.metadata?.components as Record<string, StackComponent[]> | undefined
	);

	return (
		<WizardStep.Wrapper>
			<WizardStep.Header>Your stack</WizardStep.Header>
			<WizardStep.Body>
				<div className="space-y-5">
					<p className="text-theme-text-secondary">
						Here you can review the created stack and stack components. Now you can start running
						pipelines using this new configuration.
					</p>
					<div className="divide-y divide-theme-border-moderate overflow-hidden rounded-md border border-theme-border-moderate">
						<StackOverviewHeader stack={stackData} />
						{components.map((component) => (
							<StackComponentItem key={component.id} component={component} />
						))}
					</div>
				</div>
			</WizardStep.Body>
			<StackWizardFooter displayCancel={false}>
				<FinishButton />
			</StackWizardFooter>
		</WizardStep.Wrapper>
	);
}

function FinishButton() {
	return (
		<Button size="md" asChild>
			<Link to={routes.stacks.overview}>Finish</Link>
		</Button>
	);
}

function StackOverviewHeader({ stack }: { stack: Stack }) {
	return (
		<div className="flex items-center gap-3 bg-theme-surface-secondary p-5 font-semibold">
			<Tick className="h-5 w-5" tickClasses="w-3 h-3" />
			<Avatar type="square" size="lg">
				<AvatarFallback size="lg">{stack.name[0]}</AvatarFallback>
			</Avatar>
			<div>
				<p className="text-text-lg">{stack.name}</p>
				<p className="text-text-sm text-theme-text-secondary">{stack.id.split("-")[0]}</p>
			</div>
		</div>
	);
}

function StackComponentItem({ component }: { component: StackComponent }) {
	return (
		<div key={component.id} className="flex items-center justify-between py-3 pl-9 pr-5">
			<div className="flex items-center gap-3">
				<Tick className="h-5 w-5" tickClasses="w-3 h-3" />
				<FlavorIcon
					width={24}
					height={24}
					flavor={component.resources?.flavor.name || ""}
					type={component.body?.type || "orchestrator"}
				/>
				<div>
					<p className="text-text-lg font-semibold">{component.name}</p>
					<p className="text-text-sm text-theme-text-secondary">{component.id.split("-")[0]}</p>
				</div>
			</div>
			<ComponentBadge type={component.body?.type || "alerter"}>
				{snakeCaseToTitleCase(component.body?.type as string)}
			</ComponentBadge>
		</div>
	);
}
