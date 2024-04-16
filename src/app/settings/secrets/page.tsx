import { Box, ProgressOutstanding } from "@zenml-io/react-component-library";
import { Commands, HeaderBox, InfoBox } from "./Fragments";

export default function SecretsPage() {
	return (
		<Box className="space-y-4 p-5">
			<h1 className="text-text-xl font-semibold">Repositories</h1>
			<InfoBox />
			<HeaderBox />
			<div className="flex items-center gap-2">
				<ProgressOutstanding />
				Administering your Code Repositories
			</div>
			<Commands />
		</Box>
	);
}
