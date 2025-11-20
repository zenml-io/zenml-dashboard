import { useServerInfo } from "@/data/server/info-query";
import { useOnboarding } from "@/data/server/onboarding-state";
import { getOnboardingSetup } from "@/lib/onboarding";
import { checkIsLocalServer } from "@/lib/server";
import { routes } from "@/router/routes";
import { OnboardingResponse } from "@/types/onboarding";
import { Skeleton } from "@zenml-io/react-component-library";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ConnectZenMLStep, DeployPipeline, RunFirstPipeline } from "./Items";

export function OnboardingSetupList() {
	const onboarding = useOnboarding({ refetchInterval: 5000 });
	const serverInfo = useServerInfo();

	if (onboarding.isPending || serverInfo.isPending)
		return <Skeleton className="h-[200px] w-full" />;
	if (onboarding.isError || serverInfo.isError) return null;

	const isLocalServer = checkIsLocalServer(serverInfo.data.deployment_type || "other");

	return <OnboardingSetupListContent onboarding={onboarding.data} isLocalServer={isLocalServer} />;
}

type Props = {
	onboarding: OnboardingResponse;
	isLocalServer: boolean;
};

function OnboardingSetupListContent({ onboarding, isLocalServer }: Props) {
	const navigate = useNavigate();
	const { getItem, isFinished } = getOnboardingSetup(onboarding, isLocalServer);
	const connectStep = getItem("device_verified");
	const pipelineStep = getItem("pipeline_run");
	const deployStep = getItem("snapshot_deployed");
	const isInitialFinished = useRef(isFinished);

	useEffect(() => {
		if (isFinished === true && isInitialFinished.current === false) {
			navigate(routes.home + "?success=true");
		}
	}, [isFinished, navigate]);

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
			<li>
				<DeployPipeline
					active={deployStep.isActive}
					completed={deployStep.isCompleted}
					hasDownstreamStep={deployStep.hasDownStreamStep}
				/>
			</li>
		</ul>
	);
}
