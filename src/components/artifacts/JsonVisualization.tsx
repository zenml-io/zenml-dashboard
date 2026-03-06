import { Props } from "./Visualization";
import { JsonView, allExpanded, defaultStyles } from "react-json-view-lite";
import "react-json-view-lite/dist/index.css";

const jsonStyles = {
	...defaultStyles,
	container:
		"rounded-md overflow-x-auto border border-theme-border-moderate bg-theme-surface-primary p-4 font-mono text-text-sm leading-tight",
	basicChildStyle: "ml-4 my-0",
	label: "text-theme-text-secondary mr-1",
	clickableLabel: "text-theme-text-secondary mr-1 cursor-pointer",
	nullValue: "text-theme-text-tertiary italic",
	undefinedValue: "text-theme-text-tertiary italic",
	numberValue: "text-blue-500",
	stringValue: "text-green-600 dark:text-green-400",
	booleanValue: "text-purple-500",
	otherValue: "text-theme-text-primary",
	// !important beats the library's same-specificity black color class without needing its internal names
	expandIcon: `${defaultStyles.expandIcon} !text-neutral-500`,
	collapseIcon: `${defaultStyles.collapseIcon} !text-neutral-500`,
	punctuation: `${defaultStyles.punctuation} !text-neutral-500`,
	childFieldsContainer: "border-l border-theme-border-minimal ml-1 pl-0",
	quotesForFieldNames: true
};

export function JSONVisualization({ content }: Props) {
	const json = parseJSON(content);

	console.log(json);
	console.log(content);
	return (
		<JsonView
			data={json as object}
			shouldExpandNode={allExpanded}
			clickToExpandNode
			style={jsonStyles}
		/>
	);

	function parseJSON(content: string): unknown {
		try {
			return JSON.parse(content);
		} catch {
			return content;
		}
	}
}
