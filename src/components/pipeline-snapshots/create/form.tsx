import { PipelineRun } from "@/types/pipeline-runs";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Input } from "@zenml-io/react-component-library";
import { FormProvider, useForm } from "react-hook-form";
import { CreateSnapshotFormFooter } from "./_form-components/create-snapshot-form-footer";
import { CreateSnapshotFormHeader } from "./_form-components/create-snapshot-form-header";
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
		<Box>
			<FormProvider {...form}>
				<form
					className="divide-y divide-theme-border-moderate"
					onSubmit={form.handleSubmit(handleCreateSnapshot)}
				>
					<CreateSnapshotFormHeader />
					<div className="space-y-5 p-5">
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
					</div>
					<CreateSnapshotFormFooter isPending={isPending} />
				</form>
			</FormProvider>
		</Box>
	);
}
