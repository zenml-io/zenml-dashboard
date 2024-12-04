import { isString } from "@/lib/type-guards";
import { Codesnippet } from "../CodeSnippet";
import { Props } from "./Visualization";

export function JSONVisualization({ content }: Props) {
	const json = parseJSON(content);
	return (
		<Codesnippet
			fullWidth
			highlightCode
			code={isString(json) ? json : JSON.stringify(json, null, 2)}
		/>
	);
}

function parseJSON(content: string): unknown {
	try {
		const parsedJSON = JSON.parse(content);
		return parsedJSON;
	} catch (e) {
		return content;
	}
}
