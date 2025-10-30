import { JSONSchemaDefinition } from "@/types/forms";
import { PipelineSnapshot } from "@/types/pipeline-snapshots";
import { Button } from "@zenml-io/react-component-library";
import { Controller } from "react-hook-form";
import { PlaygroundEditor } from "./editor";
import { useInvokeForm } from "./invoke-form";

type Props = {
	snapshot: PipelineSnapshot;
	submitDeployment: (data: unknown) => void;
	isInvoking: boolean;
	deploymentId: string;
};

export function PlaygroundInputs({ snapshot, submitDeployment, isInvoking, deploymentId }: Props) {
	const jsonSchema = snapshot.metadata?.pipeline_spec?.input_schema as JSONSchemaDefinition;
	const { form, handleSubmit } = useInvokeForm(jsonSchema, submitDeployment);

	return (
		<form
			onSubmit={form.handleSubmit(handleSubmit)}
			className="flex h-full w-full flex-col divide-y divide-theme-border-moderate pl-5 pr-5 xl:pl-[80px] xl:pr-0"
		>
			<div className="flex h-full flex-col gap-5 overflow-auto py-5 xl:pr-5">
				<p className="text-text-lg font-semibold">Input</p>
				<section className="flex-1">
					<Controller
						control={form.control}
						name="parameters"
						render={({ field }) => (
							<PlaygroundEditor
								deploymentId={deploymentId}
								jsonSchema={jsonSchema}
								value={field.value}
								onChange={field.onChange}
							/>
						)}
					/>
				</section>
			</div>
			<div className="flex items-center justify-end gap-2 p-5">
				<Button
					disabled={isInvoking}
					size="md"
					type="button"
					intent="secondary"
					emphasis="subtle"
					className="bg-theme-surface-primary"
					onClick={() => form.reset()}
				>
					Reset
				</Button>
				<Button disabled={isInvoking} size="md" type="submit">
					Run
				</Button>
			</div>
		</form>
	);
}
