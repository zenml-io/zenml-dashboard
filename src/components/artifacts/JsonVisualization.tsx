import { Props } from "./Visualization";
import { JsonView, allExpanded, defaultStyles } from "react-json-view-lite";
import "react-json-view-lite/dist/index.css";

const jsonStyles = {
	...defaultStyles,
	container: "font-mono text-text-sm leading-tight",
	basicChildStyle: "my-0",
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
	childFieldsContainer: "border-l border-theme-border-minimal ml-2 pl-0",
	quotesForFieldNames: true
};

const containerClassName =
	"overflow-x-auto rounded-md border border-theme-border-moderate bg-theme-surface-primary";
const contentClassName = "inline-block min-w-full p-2";

export function JSONVisualization({ content }: Props) {
	const data = parseJSON(content);

	if (!isJsonObject(data)) {
		return (
			<div className={containerClassName}>
				<pre className={`${contentClassName} ${jsonStyles.container}`}>{String(data)}</pre>
			</div>
		);
	}

	return (
		<div className={containerClassName}>
			<div className={contentClassName}>
				<JsonView data={data} shouldExpandNode={allExpanded} clickToExpandNode style={jsonStyles} />
			</div>
		</div>
	);
}

function isJsonObject(value: unknown): value is object | unknown[] {
	return typeof value === "object" && value !== null;
}

function parseJSON(content: string): unknown {
	try {
		return JSON.parse(content);
	} catch {
		return content;
	}
}
