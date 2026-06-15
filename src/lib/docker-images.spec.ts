import { BuildItem } from "@/types/pipeline-builds";
import { Step } from "@/types/steps";
import { describe, expect, it } from "vitest";
import {
	getBuildImageKey,
	getSkippedBuildImageFromStepConfig,
	getStepBuildImage,
	resolveStepDockerImageDisplay
} from "./docker-images";

const buildItem = (image: string): BuildItem => ({ image });

describe("getBuildImageKey", () => {
	it("prefers step operator keys over the step name and orchestrator", () => {
		const images = {
			"train_step.something_operator": buildItem("operator-image"),
			train_step: buildItem("step-image"),
			orchestrator: buildItem("orchestrator-image")
		};

		expect(getBuildImageKey("train_step", images)).toBe("train_step.something_operator");
	});

	it("falls back to the step name when no operator image exists", () => {
		const images = {
			train_step: buildItem("step-image"),
			orchestrator: buildItem("orchestrator-image")
		};

		expect(getBuildImageKey("train_step", images)).toBe("train_step");
	});

	it("falls back to orchestrator when no step-specific image exists", () => {
		const images = {
			orchestrator: buildItem("orchestrator-image")
		};

		expect(getBuildImageKey("missing_step", images)).toBe("orchestrator");
		expect(getBuildImageKey(undefined, images)).toBe("orchestrator");
	});
});

describe("getStepBuildImage", () => {
	it("returns the build item for the resolved image key", () => {
		const stepImage = buildItem("step-image");
		const images = {
			train_step: stepImage,
			orchestrator: buildItem("orchestrator-image")
		};

		expect(getStepBuildImage("train_step", images)).toBe(stepImage);
	});
});

describe("getSkippedBuildImageFromStepConfig", () => {
	it("returns the parent image when skip_build is enabled", () => {
		const step = {
			metadata: {
				config: {
					settings: {
						docker: {
							skip_build: true,
							parent_image: "python:3.11-slim"
						}
					}
				}
			}
		} as unknown as Step;

		expect(getSkippedBuildImageFromStepConfig(step)).toEqual({
			image: "python:3.11-slim"
		});
	});

	it("returns null when skip_build is disabled or parent_image is not a string", () => {
		const skippedDisabled = {
			metadata: {
				config: {
					settings: {
						docker: {
							skip_build: false,
							parent_image: "python:3.11-slim"
						}
					}
				}
			}
		} as unknown as Step;

		const invalidParentImage = {
			metadata: {
				config: {
					settings: {
						docker: {
							skip_build: true,
							parent_image: 123
						}
					}
				}
			}
		} as unknown as Step;

		expect(getSkippedBuildImageFromStepConfig(skippedDisabled)).toBeNull();
		expect(getSkippedBuildImageFromStepConfig(invalidParentImage)).toBeNull();
	});
});

describe("resolveStepDockerImageDisplay", () => {
	it("shows the skipped parent image with a copy button when it differs from the build image", () => {
		const buildImage = buildItem("built-image");
		const skippedBuildImage = buildItem("parent-image");

		expect(resolveStepDockerImageDisplay(buildImage, skippedBuildImage)).toEqual({
			item: skippedBuildImage,
			displayCopyButton: true
		});
	});

	it("keeps the build image when the skipped image matches or is absent", () => {
		const buildImage = buildItem("same-image");
		const matchingSkippedImage = buildItem("same-image");

		expect(resolveStepDockerImageDisplay(buildImage, matchingSkippedImage)).toEqual({
			item: buildImage,
			displayCopyButton: false
		});

		expect(resolveStepDockerImageDisplay(buildImage, null)).toEqual({
			item: buildImage,
			displayCopyButton: false
		});
	});
});
