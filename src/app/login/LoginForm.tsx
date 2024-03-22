import { useLoginMutation } from "@/data/login/login-mutation";
import { routes } from "@/router/routes";
import { Input, Button } from "@zenml-io/react-component-library";
import { useId, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export function LoginForm() {
	const navigate = useNavigate();

	const usernameId = useId();
	const passwordId = useId();

	const [searchParams] = useSearchParams();
	const redirect = searchParams.get("redirect");

	// TODO integrate React Hook Forms
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const mutation = useLoginMutation({
		onSuccess() {
			navigate(redirect || routes.home);
		}
	});

	function loginUser(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		mutation.mutate({ username, password });
	}

	return (
		<form onSubmit={loginUser} className="space-y-5">
			<div className="space-y-2">
				<div className="space-y-0.5">
					<label htmlFor={usernameId} className="text-text-sm">
						Username
					</label>
					<Input onChange={(e) => setUsername(e.target.value)} id={usernameId} className="w-full" />
				</div>
				<div className="space-y-0.5">
					<label htmlFor={passwordId} className="text-text-sm">
						Password
					</label>
					<Input
						onChange={(e) => setPassword(e.target.value)}
						id={passwordId}
						type="password"
						className="w-full"
					/>
				</div>
			</div>
			<Button className="w-full text-center" size="md">
				<span className="w-full">Login</span>
			</Button>
		</form>
	);
}
