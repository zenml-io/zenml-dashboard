import { NestedCollapsible } from "@/components/NestedCollapsible";
import { snakeCaseToTitleCase } from "@/lib/strings";
import { StackComponent } from "@/types/components";
import { PipelineRun } from "@/types/pipeline-runs";
import { CollapsibleHeader } from "@zenml-io/react-component-library";

type Props = {
	component: StackComponent;
	run: PipelineRun;
};

export function StackComponentCollapsible({ component, run }: Props) {
	const keyName = `${component.body?.type}.${component.body?.flavor}`;
	const settings =
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		(run.metadata?.config.settings as { [key: string]: any } | undefined)?.[keyName] ?? "";

	if (!settings || Object.keys(settings).length === 0) {
		return (
			<CollapsibleHeader
				intent="secondary"
				className="grid w-full grid-cols-2 gap-2 rounded-md border border-theme-border-moderate pl-[60px]"
			>
				<span>{snakeCaseToTitleCase(component.body?.type as string)}</span>
				<div>{component.name}</div>
			</CollapsibleHeader>
		);
	}

	return (
		<NestedCollapsible
			intent="secondary"
			contentClassName="pl-[60px]"
			className="w-full"
			isInitialOpen={false}
			data={settings}
			title={
				<div className="grid w-full grid-cols-2 gap-2 text-left">
					<span>{snakeCaseToTitleCase(component.body?.type as string)}</span>
					<div>{component.name}</div>
				</div>
			}
		/>
	);
}
