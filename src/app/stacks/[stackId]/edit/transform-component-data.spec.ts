import { StackComponent, StackComponentType } from "@/types/components";
import { Stack } from "@/types/stack";
import { describe, expect, it } from "vitest";
import { transformStackToFormData } from "./transform-component-data";

function makeComponent({
	id,
	name,
	type,
	logoUrl
}: {
	id: string;
	name: string;
	type?: StackComponentType;
	logoUrl?: string;
}): StackComponent {
	return {
		id,
		name,
		body: {
			type,
			logo_url: logoUrl
		}
	} as StackComponent;
}

function makeStack(componentsByType?: Record<string, StackComponent[]>): Stack {
	return {
		name: "test-stack",
		metadata: {
			components: componentsByType
		}
	} as Stack;
}

describe("transformStackToFormData", () => {
	const componentTypes: StackComponentType[] = [
		"orchestrator",
		"artifact_store",
		"step_operator",
		"experiment_tracker"
	];

	it("returns null when orchestrator is missing", () => {
		const stack = makeStack({
			artifact_store: [makeComponent({ id: "as-1", name: "S3", type: "artifact_store" })]
		});

		expect(transformStackToFormData(stack, componentTypes)).toBeNull();
	});

	it("returns null when artifact_store is missing", () => {
		const stack = makeStack({
			orchestrator: [makeComponent({ id: "orch-1", name: "Local", type: "orchestrator" })]
		});

		expect(transformStackToFormData(stack, componentTypes)).toBeNull();
	});

	it("maps known component types into form data and falls back logoUrl to empty string", () => {
		const orchestrator = makeComponent({
			id: "orch-1",
			name: "Local orchestrator",
			type: "orchestrator"
		});
		const artifactStore = makeComponent({
			id: "as-1",
			name: "S3 artifact store",
			type: "artifact_store",
			logoUrl: "https://example.com/s3.svg"
		});
		const stepOperator = makeComponent({
			id: "so-1",
			name: "Spark operator",
			type: "step_operator"
		});
		const unknownType = makeComponent({
			id: "unknown-1",
			name: "Unknown",
			type: "model_registry"
		});
		const missingType = makeComponent({
			id: "no-type-1",
			name: "Missing type"
		});

		const stack = makeStack({
			orchestrator: [orchestrator],
			artifact_store: [artifactStore],
			step_operator: [stepOperator],
			model_registry: [unknownType],
			other: [missingType]
		});

		expect(transformStackToFormData(stack, componentTypes)).toEqual({
			stackName: "test-stack",
			components: {
				orchestrator: [{ id: "orch-1", name: "Local orchestrator", logoUrl: "" }],
				artifact_store: [
					{
						id: "as-1",
						name: "S3 artifact store",
						logoUrl: "https://example.com/s3.svg"
					}
				],
				step_operator: [{ id: "so-1", name: "Spark operator", logoUrl: "" }],
				experiment_tracker: []
			}
		});
	});
});
