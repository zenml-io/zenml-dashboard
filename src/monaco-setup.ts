import { loader } from "@monaco-editor/react";
import * as monaco from "monaco-editor";
import editorWorker from "monaco-editor/esm/vs/editor/editor.worker?worker";
import jsonWorker from "monaco-editor/esm/vs/language/json/json.worker?worker";
import { githubLight } from "./lib/monaco-editor/github-light";

self.MonacoEnvironment = {
	getWorker(_, label) {
		if (label === "json") {
			return new jsonWorker();
		}

		return new editorWorker();
	}
};

loader.config({ monaco });

loader.init().then((monaco) => {
	monaco.editor.defineTheme("github-light", githubLight);
});
