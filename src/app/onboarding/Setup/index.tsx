import { useServerInfo } from "@/data/server/info-query";
import { useOnboarding } from "@/data/server/onboarding-state";
import { getOnboardingSetup } from "@/lib/onboarding";
import { checkIsLocalServer } from "@/lib/server";
import { Skeleton } from "@zenml-io/react-component-library";
import { ConnectZenMLStep, RunFirstPipeline } from "./Items";

export function OnboardingSetupList() {
	const onboarding = useOnboarding({ refetchInterval: 5000 });
	const serverInfo = useServerInfo();

	if (onboarding.isPending || serverInfo.isPending)
		return <Skeleton className="h-[200px] w-full" />;
	if (onboarding.isError || serverInfo.isError) return null;

	const isLocalServer = checkIsLocalServer(serverInfo.data.deployment_type || "other");
	const { getItem } = getOnboardingSetup(onboarding.data, isLocalServer);
	const connectStep = getItem("device_verified");
	const pipelineStep = getItem("pipeline_run");

	return (
		<ul className="space-y-5">
			{!isLocalServer && (
				<li>
					<ConnectZenMLStep
						active={connectStep.isActive}
						completed={connectStep.isCompleted}
						hasDownstreamStep={connectStep.hasDownStreamStep}
					/>
				</li>
			)}
			<li>
				<RunFirstPipeline
					active={pipelineStep.isActive}
					completed={pipelineStep.isCompleted}
					hasDownstreamStep={pipelineStep.hasDownStreamStep}
				/>
			</li>
		</ul>
	);
}
