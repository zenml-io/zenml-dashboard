import { Box } from "@zenml-io/react-component-library";
import { LoginButton } from "./login-button";

export default function LoginPage() {
	return (
		<Box className="flex w-full max-w-[540px] flex-col gap-5 p-7">
			<div className="text-center">
				<h1 className="mb-0.5 text-display-xs font-semibold">Log in to ZenML Pro</h1>
			</div>
			<div className="flex justify-center">
				<LoginButton />
			</div>
		</Box>
	);
}
