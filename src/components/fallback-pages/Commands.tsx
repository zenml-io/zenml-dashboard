import { ReactNode } from "react";
import { Codesnippet } from "../CodeSnippet";

export type CommandListItem = {
	command: string;
	description: ReactNode;
};

export function generateCommandList(item: CommandListItem) {
	return (
		<div className="space-y-1">
			<p className="text-text-sm text-theme-text-secondary">{item.description}</p>
			<Codesnippet wrap code={item.command} />
		</div>
	);
}
