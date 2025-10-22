import { Deployment } from "@/types/deployments";
import { PipelineSnapshot } from "@/types/pipeline-snapshots";
import { PlaygroundInputs } from "./_components/inputs";
import { useInvokeDeployment } from "@/data/deployment-invocations/invoke";
import { PlaygroundOutputs } from "./_components/outputs";
import { useToast } from "@zenml-io/react-component-library";

type Props = {
	snapshot: PipelineSnapshot;
	deployment: Deployment;
};

export function PlaygroundPageContent({ snapshot, deployment }: Props) {
	const { toast } = useToast();
	const invokeDeployment = useInvokeDeployment({
		onError: (err) => {
			if (err instanceof Error) {
				toast({
					status: "error",
					emphasis: "subtle",
					rounded: true,
					description: err.message
				});
			}
			console.error(err);
		},
		onSuccess: (data) => {
			console.log(data);
		}
	});

	function submitDeployment(data: unknown) {
		const authKey = deployment.metadata?.auth_key;
		const url = deployment.body?.url;

		if (!url) {
			toast({
				status: "error",
				emphasis: "subtle",
				rounded: true,
				description: "URL is not set"
			});
			return;
		}

		invokeDeployment.mutate({
			authKey: authKey ?? undefined,
			url,
			payload: {
				parameters: data
			}
		});
	}

	return (
		<div className="flex h-full w-full flex-1 flex-col divide-y divide-theme-border-moderate xl:flex-row xl:divide-x xl:divide-y-0">
			<PlaygroundInputs
				deploymentId={deployment.id}
				isInvoking={invokeDeployment.isPending}
				submitDeployment={submitDeployment}
				snapshot={snapshot}
			/>
			<div className="h-full w-full bg-theme-surface-primary xl:w-1/2 xl:pr-[80px]">
				<PlaygroundOutputs
					clearOutputs={() => invokeDeployment.reset()}
					isInvoking={invokeDeployment.isPending}
					outputs={invokeDeployment.data}
				/>
			</div>
		</div>
	);
}
