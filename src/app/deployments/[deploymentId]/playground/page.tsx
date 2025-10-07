import { PlaygroundInputs } from "./_components/inputs";

export default function PlaygroundPage() {
	return (
		<div className="flex h-full w-full flex-1 flex-col xl:flex-row">
			<PlaygroundInputs />
			<div className="h-full w-full bg-blue-500 xl:w-1/2"></div>
		</div>
	);
}
