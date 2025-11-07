import { Tag } from "@zenml-io/react-component-library";
import { ComponentProps } from "react";

export const ALLOWED_LABEL_VALUES = ["bugfix", "deprecation", "improvement", "feature"] as const;

export type LabelValue = (typeof ALLOWED_LABEL_VALUES)[number];

type LabelColor = ComponentProps<typeof Tag>["color"];

type LabelConfig = {
	color: LabelColor;
	displayName: string;
};

const LABEL_CONFIGS: Record<LabelValue, LabelConfig> = {
	bugfix: {
		color: "red",
		displayName: "Bugfix"
	},
	deprecation: {
		color: "yellow",
		displayName: "Deprecation"
	},
	improvement: {
		color: "green",
		displayName: "Improvement"
	},
	feature: {
		color: "blue",
		displayName: "Feature"
	}
} as const;

export function getLabelConfig(label: LabelValue): LabelConfig | null {
	return LABEL_CONFIGS[label] ?? null;
}

export function getLabelColor(label: LabelValue): LabelColor {
	return getLabelConfig(label)?.color ?? "grey";
}

export function getLabelDisplayName(label: LabelValue): string {
	return getLabelConfig(label)?.displayName ?? label;
}
