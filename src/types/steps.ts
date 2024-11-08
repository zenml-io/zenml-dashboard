import { components } from "./core";

export type Step = components["schemas"]["StepRunResponse"];

export type StepDict = Record<string, Step>;
