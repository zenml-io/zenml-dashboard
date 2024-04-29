import { Box } from "@zenml-io/react-component-library";

export function HeaderOnboardingBox() {
	return (
		<Box className="flex flex-col-reverse items-stretch overflow-hidden md:flex-row">
			<div className="w-full px-7 py-5 md:w-2/3">
				<h2 className="text-display-xs font-semibold">Welcome to ZenML</h2>
				<p className="mt-2 text-text-lg text-theme-text-secondary">
					You successfully installed ZenML dashboard. Now you can get started with your new ZenML
					server.
				</p>
			</div>
			{/* <div className="flex w-full flex-1 items-center justify-center bg-primary-50 md:w-1/3"></div> */}
		</Box>
	);
}
