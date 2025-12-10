import Prism from "prismjs";
import "prismjs/components/prism-python";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-docker";
import "prismjs/components/prism-bash";
import "prismjs/components/prism-json";
import "@/assets/styles/prism-github-light.css";
import { useEffect } from "react";

export type CodeLanguage = "python" | "bash" | "ts" | "dockerfile" | "json";

type Props = {
	code: string;
	language?: CodeLanguage;
};

export function CodeHighlighter({ code, language = "python" }: Props) {
	const languageClass = `language-${language}`;
	useEffect(() => {
		Prism.highlightAll();
	}, [languageClass]);
	return <code className={languageClass}>{code}</code>;
}
