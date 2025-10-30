import { Deployment } from "@/types/deployments";
import { PipelineSnapshot } from "@/types/pipeline-snapshots";
import { PlaygroundInputs } from "./_components/inputs";
import { useInvokeDeployment } from "@/data/deployment-invocations/invoke";
import { PlaygroundOutputs } from "./_components/outputs";
import { useToast } from "@zenml-io/react-component-library";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";

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
		<PanelGroup direction="horizontal" className="h-full !flex-col md:!flex-row">
			<Panel minSize={33} defaultSize={50}>
				<PlaygroundInputs
					deploymentId={deployment.id}
					isInvoking={invokeDeployment.isPending}
					submitDeployment={submitDeployment}
					snapshot={snapshot}
				/>
			</Panel>
			<PanelResizeHandle className="hidden w-[1px] bg-theme-border-moderate transition-colors duration-200 data-[resize-handle-state=drag]:bg-theme-border-bold data-[resize-handle-state=hover]:bg-theme-border-bold md:block" />
			<Panel minSize={33} defaultSize={50} className="h-full bg-theme-surface-primary xl:pr-[80px]">
				<PlaygroundOutputs
					clearOutputs={() => invokeDeployment.reset()}
					isInvoking={invokeDeployment.isPending}
					outputs={invokeDeployment.data}
				/>
			</Panel>
		</PanelGroup>
	);
}
