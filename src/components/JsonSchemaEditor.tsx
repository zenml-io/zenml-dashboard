import { JSONSchemaDefinition } from "@/types/forms";
import Editor, { EditorProps, OnMount } from "@monaco-editor/react";
import { cn } from "@zenml-io/react-component-library";

type Props = EditorProps & {
	modelId: string;
	jsonSchema: JSONSchemaDefinition;
};

export function JsonSchemaEditor({ jsonSchema, value, onChange, modelId, className }: Props) {
	const fileMatch = `${modelId}.json`;

	const handleEditorMount: OnMount = (_editor, monaco) => {
		// Configure JSON language defaults with schema validation
		monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
			enableSchemaRequest: true,
			validate: true,
			schemas: [
				{
					uri: `model-input-schema-${modelId}.json`,
					fileMatch: [fileMatch],
					schema: jsonSchema
				}
			]
		});
	};

	return (
		<Editor
			theme="github-light"
			path={fileMatch}
			value={value}
			onChange={onChange}
			language="json"
			options={{ minimap: { enabled: false } }}
			className={cn("h-full border border-theme-border-moderate", className)}
			onMount={handleEditorMount}
		/>
	);
}
