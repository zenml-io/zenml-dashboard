import { Button } from "@zenml-io/react-component-library";
import { useCallback, useEffect, useRef, useState } from "react";
import Editor from "@monaco-editor/react";
import { validateAnnouncements } from "@/lib/validation";
import { ZodError } from "zod";

type Props = {
	value: string;
	onJsonChange: (json: string, isValid: boolean, error?: ZodError) => void;
};

export function EditorPanel({ value, onJsonChange }: Props) {
	const [json, setJson] = useState<string>(value);
	const [isDragging, setIsDragging] = useState(false);
	const fileInputRef = useRef<HTMLInputElement>(null);

	// Sync with parent value when it changes externally
	useEffect(() => {
		setJson(value);
	}, [value]);

	const handleFileRead = useCallback((file: File) => {
		const reader = new FileReader();
		reader.onload = (e) => {
			const content = e.target?.result as string;
			setJson(content);
		};
		reader.readAsText(file);
	}, []);

	const handleFileSelect = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			const file = e.target.files?.[0];
			if (file && file.type === "application/json") {
				handleFileRead(file);
			}
		},
		[handleFileRead]
	);

	const handleDrop = useCallback(
		(e: React.DragEvent) => {
			e.preventDefault();
			setIsDragging(false);
			const file = e.dataTransfer.files[0];
			if (file && file.type === "application/json") {
				handleFileRead(file);
			}
		},
		[handleFileRead]
	);

	const handleDragOver = useCallback((e: React.DragEvent) => {
		e.preventDefault();
		setIsDragging(true);
	}, []);

	const handleDragLeave = useCallback(() => {
		setIsDragging(false);
	}, []);

	const formatJson = useCallback(() => {
		try {
			const parsed = JSON.parse(json);
			const formatted = JSON.stringify(parsed, null, 2);
			setJson(formatted);
		} catch {
			// Invalid JSON, can't format
		}
	}, [json]);

	useEffect(() => {
		try {
			const parsed = JSON.parse(json || "[]");
			const result = validateAnnouncements(parsed);
			if (result.success) {
				onJsonChange(json, true);
			} else {
				onJsonChange(json, false, result.error);
			}
		} catch (e) {
			// Invalid JSON syntax - create a ZodError-like structure
			const zodError = new ZodError([
				{
					code: "custom",
					message: e instanceof Error ? e.message : "Invalid JSON syntax",
					path: []
				}
			]);
			onJsonChange(json, false, zodError);
		}
	}, [json, onJsonChange]);

	return (
		<div className="flex h-full flex-col">
			<div className="flex items-center justify-between border-b border-theme-border-moderate p-4">
				<h2 className="text-text-lg font-semibold">JSON Editor</h2>
				<div className="flex items-center gap-2">
					<Button size="sm" emphasis="subtle" onClick={formatJson}>
						Format JSON
					</Button>
					<Button size="sm" emphasis="subtle" onClick={() => fileInputRef.current?.click()}>
						Upload File
					</Button>
					<input
						ref={fileInputRef}
						type="file"
						accept="application/json"
						onChange={handleFileSelect}
						className="hidden"
					/>
				</div>
			</div>
			<div
				className={`relative flex-1 ${
					isDragging ? "border-2 border-primary-500 bg-primary-25" : ""
				}`}
				onDrop={handleDrop}
				onDragOver={handleDragOver}
				onDragLeave={handleDragLeave}
			>
				{isDragging && (
					<div className="absolute inset-0 z-10 flex items-center justify-center bg-primary-25/80">
						<div className="text-text-lg font-semibold text-primary-700">Drop JSON file here</div>
					</div>
				)}
				<Editor
					height="100%"
					defaultLanguage="json"
					value={json}
					onChange={(value) => setJson(value ?? "[]")}
					theme="vs-light"
					options={{
						minimap: { enabled: false },
						scrollBeyondLastLine: false,
						fontSize: 14,
						lineNumbers: "on",
						formatOnPaste: true,
						formatOnType: true
					}}
				/>
			</div>
		</div>
	);
}
