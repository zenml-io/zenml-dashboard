import { CollapsibleChevron } from "@/components/collapsible-chevron";
import { JsonSchemaEditor } from "@/components/JsonSchemaEditor";
import { usePipelineRun } from "@/data/pipeline-runs/pipeline-run-detail-query";
import { waitConditionQueries } from "@/data/wait-conditions";
import { useResolveRunWaitCondition } from "@/data/wait-conditions/resolve-condition";
import { JSONSchemaDefinition } from "@/types/forms";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
	Button,
	CollapsibleContent,
	CollapsibleHeader,
	CollapsiblePanel,
	CollapsibleTrigger,
	Skeleton,
	useToast
} from "@zenml-io/react-component-library";
import { useId, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { waitConditionFormSchema, WaitConditionFormValues } from "./wait-condition-form-schema";

type WaitConditionCollapsibleProps = {
	runId: string;
};

export function WaitConditionCollapsible({ runId }: WaitConditionCollapsibleProps) {
	const { data, isError, isPending } = usePipelineRun({ runId: runId });

	const waitCondition = data?.resources?.active_wait_condition ?? undefined;

	if (isError) return null;
	if (isPending) return <Skeleton className="h-[180px]" />;
	if (!waitCondition) return null;

	return <WaitConditionContent waitConditionId={waitCondition.id} />;
}

type WaitConditionContentProps = {
	waitConditionId: string;
};

function WaitConditionContent({ waitConditionId }: WaitConditionContentProps) {
	const { toast } = useToast();
	const [open, setOpen] = useState(true);
	const [hasSchemaErrors, setHasSchemaErrors] = useState(false);
	const {
		data: waitCondition,
		isError,
		isPending
	} = useQuery({
		...waitConditionQueries.detail(waitConditionId)
	});
	const queryClient = useQueryClient();

	const resolveMutation = useResolveRunWaitCondition({
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [...waitConditionQueries.all, waitConditionId] });
			queryClient.invalidateQueries({ queryKey: ["runs"] });
		},
		onError: (e) => {
			toast({
				emphasis: "subtle",
				status: "error",
				rounded: true,
				description: e.message
			});
		}
	});
	const formId = useId();

	if (isPending) return <Skeleton className="h-[180px]" />;
	if (isError) return null;

	function resolveCondition(resolution: "abort" | "continue", result?: unknown) {
		resolveMutation.mutate({
			runWaitConditionId: waitConditionId,
			payload: {
				resolution,
				...(result === undefined ? {} : { result })
			}
		});
	}

	function handleAbort() {
		resolveCondition("abort");
	}

	function handleContinue(values: WaitConditionFormValues) {
		if (!values.result) return resolveCondition("continue", undefined);
		try {
			resolveCondition("continue", JSON.parse(values.result));
		} catch (e) {
			toast({
				emphasis: "subtle",
				status: "error",
				rounded: true,
				description: "Failed to parse Json Payload"
			});
		}
	}

	const schema = waitCondition.metadata?.data_schema;

	return (
		<CollapsiblePanel open={open} onOpenChange={setOpen} className="border-warning-300">
			<CollapsibleHeader className="bg-warning-50">
				<CollapsibleTrigger className="flex w-full items-center gap-[10px]">
					<CollapsibleChevron open={open} />
					<p id="wait-condition-collapsible" className="font-medium text-warning-900">
						Waiting for input
					</p>
				</CollapsibleTrigger>
			</CollapsibleHeader>
			<CollapsibleContent className="space-y-5 border-t border-warning-300 bg-theme-surface-primary px-5 py-3">
				<div className="space-y-3">
					<div className="space-y-1">
						<p className="text-sm font-medium text-theme-text-primary">Name</p>
						<p className="text-sm text-theme-text-secondary">{waitCondition.name}</p>
					</div>
					{waitCondition.metadata?.question ? (
						<div className="space-y-1">
							<p className="text-sm font-medium text-theme-text-primary">Question</p>
							<p className="text-sm text-theme-text-secondary">{waitCondition.metadata.question}</p>
						</div>
					) : null}
				</div>

				{schema ? (
					<WaitConditionForm
						schema={schema}
						formId={formId}
						waitConditionId={waitConditionId}
						handleSubmit={handleContinue}
						onValidationChange={setHasSchemaErrors}
					/>
				) : null}

				<div className="flex justify-end gap-2">
					<Button
						disabled={resolveMutation.isPending}
						intent="secondary"
						type="button"
						onClick={handleAbort}
					>
						Abort
					</Button>
					<Button
						disabled={resolveMutation.isPending || (schema ? hasSchemaErrors : false)}
						type={schema ? "submit" : "button"}
						form={schema ? formId : undefined}
						intent="primary"
						onClick={!schema ? () => handleContinue({}) : undefined}
					>
						Continue
					</Button>
				</div>
			</CollapsibleContent>
		</CollapsiblePanel>
	);
}

type WaitConditionFormProps = {
	schema: JSONSchemaDefinition;
	formId: string;
	waitConditionId: string;
	handleSubmit: (values: WaitConditionFormValues) => void;
	onValidationChange: (hasErrors: boolean) => void;
};

function getInitialSchemaValue(schema: JSONSchemaDefinition): string | undefined {
	const initialValue = schema.default !== undefined ? schema.default : undefined;

	return initialValue === undefined ? undefined : JSON.stringify(initialValue, null, "\t");
}

function WaitConditionForm({
	schema,
	formId,
	waitConditionId,
	handleSubmit,
	onValidationChange
}: WaitConditionFormProps) {
	const form = useForm<WaitConditionFormValues>({
		resolver: zodResolver(waitConditionFormSchema),
		defaultValues: {
			result: getInitialSchemaValue(schema)
		}
	});

	return (
		<form id={formId} onSubmit={form.handleSubmit(handleSubmit)}>
			<div className="space-y-2">
				<p className="text-sm font-medium text-theme-text-primary">Input</p>
				<Controller
					control={form.control}
					name="result"
					render={({ field }) => (
						<JsonSchemaEditor
							className="h-[200px]"
							modelId={waitConditionId}
							jsonSchema={schema}
							value={field.value}
							onChange={field.onChange}
							onValidationChange={onValidationChange}
						/>
					)}
				/>
			</div>
		</form>
	);
}
