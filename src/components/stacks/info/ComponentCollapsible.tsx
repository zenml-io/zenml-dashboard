import { snakeCaseToTitleCase } from "@/lib/strings";
import { sanitizeUrl } from "@/lib/url";
import { StackComponent } from "@/types/components";
import { PipelineRun } from "@/types//pipeline-runs";
import { Box, Button } from "@zenml-io/react-component-library/components/server";
import { ComponentBadge } from "../../stack-components/ComponentBadge";
import { ComponentInfoDialog } from "./ComponentInfoDialog";
import { NestedCollapsible } from "../../NestedCollapsible";

type Props = {
	component: StackComponent;
	run: PipelineRun;
};
export function ComponentCollapsible({ component, run }: Props) {
	const keyName = `${component.body?.type}.${component.body?.flavor}`;
	const settings =
		(run.metadata?.config.settings as { [key: string]: any } | undefined)?.[keyName] ?? undefined;

	if (!settings || Object.keys(settings).length === 0) {
		return (
			<ComponentInfoDialog name={component.name} type={component.body?.type || "orchestrator"}>
				<button className="w-full">
					<Box className="flex items-center justify-between px-5 py-3 text-left">
						<ComponentCollapsibleItem component={component} />
					</Box>
				</button>
			</ComponentInfoDialog>
		);
	}

	return (
		<NestedCollapsible
			intent="primary"
			contentClassName="pl-[60px]"
			className="w-full"
			isInitialOpen={false}
			title={
				<div className="flex w-full items-center justify-between text-left">
					<ComponentCollapsibleItem component={component} />
				</div>
			}
			data={settings}
		>
			<ComponentInfoDialog name={component.name} type={component.body?.type || "orchestrator"}>
				<Button
					intent="secondary"
					emphasis="minimal"
					className="mx-auto flex w-fit justify-center text-text-sm text-theme-text-secondary"
				>
					See Component Details
				</Button>
			</ComponentInfoDialog>
		</NestedCollapsible>
	);
}

export function ComponentCollapsibleItem({ component }: { component: StackComponent }) {
	return (
		<>
			<div className="flex items-center gap-2">
				<img
					width={32}
					height={32}
					alt={`${component.body?.flavor} logo`}
					src={sanitizeUrl(component.body?.logo_url || "")}
				/>
				<div>
					<p className="text-text-lg">{component.name}</p>
					<p className="text-text-sm text-theme-text-secondary">{component.id.split("-")[0]}</p>
				</div>
			</div>
			<ComponentBadge type={component.body?.type || "orchestrator"}>
				{snakeCaseToTitleCase(component.body?.type || "")}
			</ComponentBadge>
		</>
	);
}
