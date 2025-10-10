import { JSONSchemaDefinition } from "@/types/forms";
import Editor, { EditorProps, OnMount } from "@monaco-editor/react";

type Props = EditorProps & {
	jsonSchema: JSONSchemaDefinition;
};

export function PlaygroundEditor({ jsonSchema, value, onChange }: Props) {
	const handleEditorMount: OnMount = (_editor, monaco) => {
		// Configure JSON language defaults with schema validation
		monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
			enableSchemaRequest: true,
			validate: true,
			schemas: [
				{
					uri: "http://zenml.io/deployment-input-schema.json",
					fileMatch: ["*"],
					schema: jsonSchema
				}
			]
		});
	};

	return (
		<Editor
			value={value}
			onChange={onChange}
			language="json"
			options={{ minimap: { enabled: false } }}
			className="h-full border border-theme-border-moderate"
			onMount={handleEditorMount}
		/>
	);
}
