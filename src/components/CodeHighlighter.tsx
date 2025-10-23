import Prism from "prismjs";
import "prismjs/components/prism-python";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-bash";
import "@/assets/styles/prism-github-light.css";
import { useEffect } from "react";

type Props = {
	code: string;
	language: string;
};

export function CodeHighlighter({ code, language = "python" }: Props) {
	const languageClass = `language-${language}`;
	useEffect(() => {
		Prism.highlightAll();
	}, [languageClass]);
	return <code className={languageClass}>{code}</code>;
}
