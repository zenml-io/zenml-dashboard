import Prism from "prismjs";
import "prismjs/components/prism-python";
import "@/assets/styles/prism-github-light.css";
import { useEffect } from "react";

type Props = {
	code: string;
};

export function CodeHighlighter({ code }: Props) {
	useEffect(() => {
		Prism.highlightAll();
	}, []);
	return <code className="language-python">{code}</code>;
}
