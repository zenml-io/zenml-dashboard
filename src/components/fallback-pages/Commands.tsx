import { ReactNode } from "react";
import { Codesnippet } from "../CodeSnippet";

export type CommandListArgs = {
	command: string;
	description: ReactNode;
};

export function generateCommandList(item: CommandListArgs) {
	return (
		<div className="space-y-1">
			<p className="text-text-sm text-theme-text-secondary">{item.description}</p>
			<Codesnippet code={item.command} />
		</div>
	);
}
