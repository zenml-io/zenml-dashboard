import { BuildItem } from "@/types/pipeline-builds";
import { Step } from "@/types/steps";
import { isString } from "./type-guards";

export function getBuildImageKey(
	stepName: string | undefined,
	images: Record<string, BuildItem> | undefined
): string | null {
	if (!images) {
		return null;
	}

	if (stepName) {
		// First check if a step operator image exists for this step
		for (const key in images) {
			if (key.startsWith(`${stepName}.`)) {
				return key;
			}
		}

		// Check if an image for this step exists
		if (images[stepName]) {
			return stepName;
		}
	}

	// Default to orchestrator if no step-specific image is found
	if (images.orchestrator) {
		return "orchestrator";
	}

	return null;
}

export function getStepBuildImage(
	stepName: string | undefined,
	images: Record<string, BuildItem> | undefined
): BuildItem | undefined {
	const imageKey = getBuildImageKey(stepName, images);

	return imageKey ? images?.[imageKey] : undefined;
}

export function getSkippedBuildImageFromStepConfig(step: Step | undefined): BuildItem | null {
	const dockerSettings = step?.metadata?.config.settings?.docker;

	if (dockerSettings?.skip_build === true && isString(dockerSettings.parent_image)) {
		return { image: dockerSettings.parent_image };
	}

	return null;
}

export function resolveStepDockerImageDisplay(
	buildImage: BuildItem | undefined,
	skippedBuildImage: BuildItem | null
): BuildItem | undefined {
	if (!buildImage) {
		return undefined;
	}

	if (skippedBuildImage && buildImage.image !== skippedBuildImage.image) {
		return skippedBuildImage;
	}

	return buildImage;
}
