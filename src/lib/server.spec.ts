import { DeploymentType } from "@/types/server";
import { describe, test, expect } from "vitest";
import { checkIsLocalServer } from "./server";

describe("returns if the server is deployed locally or not", () => {
	test("returns true if the deployment type is local", () => {
		const deploymentType: DeploymentType = "local";
		const isLocal = checkIsLocalServer(deploymentType);
		expect(isLocal).toBe(true);
	});

	test("returns true if the deployment type is docker", () => {
		const deploymentType: DeploymentType = "docker";
		const isLocal = checkIsLocalServer(deploymentType);
		expect(isLocal).toBe(true);
	});

	test("returns false if the deployment type is not local and not docker", () => {
		const deploymentType: DeploymentType = "other";
		const isLocal = checkIsLocalServer(deploymentType);
		expect(isLocal).toBe(false);
	});
});
