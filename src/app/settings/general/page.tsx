import { Box } from "@zenml-io/react-component-library";
import { GeneralForm } from "./GeneralForm";

export default function GeneralSettingsPage() {
	return (
		<Box className="flex flex-col gap-5 p-5">
			<h1 className="text-text-xl font-semibold">General</h1>
			<GeneralForm />
		</Box>
	);
}
