import { Codesnippet } from "@/components/CodeSnippet";

type Props = {
	projectName: string;
};

export function SetProject({ projectName }: Props) {
	return (
		<div className="space-y-1">
			<p className="text-text-sm text-theme-text-secondary">Set your project</p>
			<Codesnippet
				highlightCode
				code={`zenml init && zenml project set ${projectName || "<PROJECT-NAME>"}`}
			/>
		</div>
	);
}
