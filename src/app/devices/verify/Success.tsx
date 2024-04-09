import { Box } from "@zenml-io/react-component-library";
import CheckCircle from "@/assets/icons/check-circle.svg?react";

export function DeviceVerificationSuccess() {
	return (
		<Box className="flex min-w-[540px] flex-col items-center justify-center space-y-7 px-7 py-9">
			<CheckCircle className="h-[120px] w-[120px] fill-theme-text-success" />
			<div className="text-center">
				<p className="text-display-xs font-semibold">You successfully added your device</p>
				<p className="text-theme-text-secondary">
					You may close this screen and return to your CLI.
				</p>
			</div>
		</Box>
	);
}
