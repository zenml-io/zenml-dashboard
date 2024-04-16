import { Box, ProgressOutstanding } from "@zenml-io/react-component-library";
import { HeaderBox, InfoBox } from "./Fragments";

export default function ConnectorsPage() {
	return (
		<Box className="space-y-4 p-5">
			<h1 className="text-text-xl font-semibold">Secrets</h1>
			<InfoBox />
			<HeaderBox />
			<div className="flex items-center gap-2">
				<ProgressOutstanding />
				Administering your Connectors
			</div>
		</Box>
	);
}
