import { GithubDirectory } from "@/types/github";

export function parsePipelines(dir: GithubDirectory) {
	const pipelines = dir.filter((item) => item.type === "dir");
	const names = pipelines.map((pipeline) => pipeline.name);
	return names;
}
