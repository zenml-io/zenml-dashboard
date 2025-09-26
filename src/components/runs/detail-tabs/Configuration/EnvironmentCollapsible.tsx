import ChevronDown from "@/assets/icons/chevron-down.svg?react";
import { NestedCollapsible } from "@/components/NestedCollapsible";
import { PipelineRun } from "@/types/pipeline-runs";
import {
	CollapsibleContent,
	CollapsibleHeader,
	CollapsiblePanel,
	CollapsibleTrigger,
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger
} from "@zenml-io/react-component-library";
import { useState } from "react";

type Props = {
	run: PipelineRun;
};

const PYTHON_PACKAGES_KEY = "python_packages";

export function EnvironmentCollapsible({ run }: Props) {
	const [open, setOpen] = useState(true);

	const executionEnvironment = run.metadata?.orchestrator_environment;
	const clientEnvironment = run.metadata?.client_environment;

	const normalizedExecutionEnvironment = normalizePythonPackages(executionEnvironment ?? {});
	const normalizedClientEnvironment = normalizePythonPackages(clientEnvironment ?? {});

	return (
		<CollapsiblePanel open={open} onOpenChange={setOpen}>
			<CollapsibleHeader intent="primary" className="flex items-center gap-[10px]">
				<CollapsibleTrigger className="flex w-full items-center gap-[10px]">
					<ChevronDown
						className={` ${
							open ? "" : "-rotate-90"
						} h-5 w-5 rounded-md fill-neutral-500 transition-transform duration-200 hover:bg-neutral-200`}
					/>
					Environment
				</CollapsibleTrigger>
			</CollapsibleHeader>
			<CollapsibleContent className="space-y-3 border-t border-theme-border-moderate bg-theme-surface-primary px-5 py-3">
				<NestedCollapsible
					isInitialOpen
					intent="secondary"
					title={
						<TooltipProvider>
							<Tooltip>
								<TooltipTrigger asChild>
									<span>Client Environment</span>
								</TooltipTrigger>
								<TooltipContent className="max-w-[200px] whitespace-normal xl:max-w-[300px]">
									Environment where you start your pipeline run by calling the pipeline function.{" "}
									<a
										rel="noopener noreferrer"
										className="link"
										href="https://docs.zenml.io/user-guides/best-practices/configure-python-environments#client-environment-or-the-runner-environment"
										target="_blank"
									>
										Learn more about client environments
									</a>
								</TooltipContent>
							</Tooltip>
						</TooltipProvider>
					}
					data={normalizedClientEnvironment}
				/>
				<NestedCollapsible
					isInitialOpen
					intent="secondary"
					title={
						<TooltipProvider>
							<Tooltip>
								<TooltipTrigger asChild>
									<span>Execution Environment</span>
								</TooltipTrigger>
								<TooltipContent className="max-w-[200px] whitespace-normal xl:max-w-[300px]">
									Environment where your ZenML steps get executed.{" "}
									<a
										rel="noopener noreferrer"
										className="link"
										href="https://docs.zenml.io/user-guides/best-practices/configure-python-environments#execution-environments"
										target="_blank"
									>
										Learn more about exectuion environments
									</a>
								</TooltipContent>
							</Tooltip>
						</TooltipProvider>
					}
					data={normalizedExecutionEnvironment}
				/>
			</CollapsibleContent>
		</CollapsiblePanel>
	);
}

function normalizePythonPackages(env: Record<string, unknown>) {
	const pythonPackages = env[PYTHON_PACKAGES_KEY];
	if (typeof pythonPackages === "string") {
		return {
			...env,
			[PYTHON_PACKAGES_KEY]: pythonPackages.split("\n").map((pkg) => pkg.trim())
		};
	}
	return env;
}
