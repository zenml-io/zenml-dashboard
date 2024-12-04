export function getArtifactVersionSnippet(id: string) {
	return `from zenml.client import Client

artifact = Client().get_artifact_version("${id}")
data = artifact.load()`;
}

export function getStepSnippet(id: string) {
	return `from zenml.client import Client

step = Client().get_run_step("${id}")
config = step.config`;
}

export function getRunSnippet(id: string) {
	return `from zenml.client import Client

run = Client().get_pipeline_run("${id}")
config = run.config`;
}

export function getSecretSnippet(id: string) {
	return `from zenml.client import Client

secret = Client().get_secret("${id}")
`;
}
