import { PipelineRun } from "@/types/pipeline-runs";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Input } from "@zenml-io/react-component-library";
import { FormProvider, useForm } from "react-hook-form";
import { CreatePipelineSnapshotFormSchema, createPipelineSnapshotFormSchema } from "./form-schema";
import { generateSnapshotName } from "./name-helper";
import { PipelineSelect } from "./pipeline-select";
import { RunSelect } from "./run-select";
import { useSubmitHandler } from "./use-submit-handler";

type Props = {
	run?: PipelineRun;
};

export function CreateSnapshotForm({ run }: Props) {
	const form = useForm<CreatePipelineSnapshotFormSchema>({
		resolver: zodResolver(createPipelineSnapshotFormSchema),
		defaultValues: {
			name: run?.name ? generateSnapshotName(run.name) : "",
			pipeline: run?.resources?.pipeline?.id || "",
			run: run?.id || ""
		}
	});

	const { handleCreateSnapshot, isPending } = useSubmitHandler(
		run?.resources?.snapshot?.id || null
	);

	const pipeline = run?.resources?.pipeline;

	return (
		<Box className="p-5">
			<FormProvider {...form}>
				<form className="space-y-5" onSubmit={form.handleSubmit(handleCreateSnapshot)}>
					<div>
						<label className="text-text-sm">Name</label>
						<Input className="w-full" {...form.register("name")} />
					</div>
					<div>
						<label className="text-text-sm">Pipeline</label>
						<PipelineSelect pipeline={pipeline || undefined} />
					</div>
					<div>
						<label className="text-text-sm">Run</label>
						<RunSelect run={run || undefined} />
					</div>
					<Button type="submit" disabled={isPending}>
						{isPending && (
							<div className="h-4 w-4 animate-spin rounded-rounded border-2 border-theme-text-negative border-b-theme-text-brand" />
						)}
						Create Snapshot
					</Button>
				</form>
			</FormProvider>
		</Box>
	);
}
