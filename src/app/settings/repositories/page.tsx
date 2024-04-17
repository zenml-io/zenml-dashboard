import { Box, ProgressOutstanding } from "@zenml-io/react-component-library";
import { CommandSection, HeaderBox, InfoBox } from "./Fragments";

export default function RepositoriesPage() {
	return (
		<Box className="space-y-4 p-5">
			<h1 className="text-text-xl font-semibold">Repositories</h1>
			<InfoBox />
			<HeaderBox />
			<div className="flex items-center gap-2">
				<ProgressOutstanding />
				Administering your Code Repositories
			</div>
			<CommandSection />
		</Box>
	);
}
