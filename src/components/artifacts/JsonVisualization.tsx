import { Codesnippet } from "../CodeSnippet";
import { Props } from "./Visualization";

export function JSONVisualization({ content }: Props) {
	return <Codesnippet highlightCode code={JSON.stringify(content, null, 2)} />;
}
