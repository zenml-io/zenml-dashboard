import { Box } from "@zenml-io/react-component-library";
import { LoginForm } from "./LoginForm";

export default function LoginPage() {
	return (
		<Box className="flex w-full max-w-[540px] flex-col gap-5 p-7">
			<div className="text-center">
				<h1 className="mb-0.5 text-display-xs font-semibold">Log in to your account</h1>
				<p className="text-theme-text-secondary">
					Please, fill in your details to log in to your ZenML account.
				</p>
			</div>
			<LoginForm />
		</Box>
	);
}
