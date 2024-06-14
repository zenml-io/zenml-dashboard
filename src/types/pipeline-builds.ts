import { components } from "./core";

export type PipelineBuildResponse = components["schemas"]["PipelineBuildResponse"];
export type BuildItem = components["schemas"]["BuildItem"];
export type BuildItemMap = { [key: string]: BuildItem };
