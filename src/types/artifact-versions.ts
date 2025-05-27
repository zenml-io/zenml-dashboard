import { components, operations } from "./core";

export type ArtifactVersionBody = components["schemas"]["ArtifactVersionResponseBody"];
export type ArtifactVersion = components["schemas"]["ArtifactVersionResponse"];
// Artifact Visualization
export type LoadedVisualization = components["schemas"]["LoadedVisualization"];
export type ArtifactVisualization = components["schemas"]["ArtifactVisualizationResponse"];
export type ArtifactVisualizationQueryParams = NonNullable<
	operations["get_artifact_visualization_api_v1_artifact_versions__artifact_version_id__visualize_get"]["parameters"]["query"]
>;

export type ArtifactType = components["schemas"]["ArtifactType"];
