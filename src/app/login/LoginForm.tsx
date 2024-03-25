import { useLoginMutation } from "@/data/session/login-mutation";
import { routes } from "@/router/routes";
import { LoginPayload } from "@/types/session";
import { Button, Input } from "@zenml-io/react-component-library";
import { useId } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import { setAuthState } from "@/lib/sessions";

export function LoginForm() {
	const navigate = useNavigate();

	const usernameId = useId();
	const passwordId = useId();

	const [searchParams] = useSearchParams();
	const redirect = searchParams.get("redirect");

	const { register, handleSubmit, reset } = useForm<LoginPayload>();

	const mutation = useLoginMutation({
		onSuccess() {
			setAuthState("true");
			navigate(redirect || routes.home);
			reset();
		}
	});

	function login(data: LoginPayload) {
		mutation.mutate(data);
	}

	return (
		<form onSubmit={handleSubmit(login)} className="space-y-5">
			<div className="space-y-2">
				<div className="space-y-0.5">
					<label htmlFor={usernameId} className="text-text-sm">
						Username
					</label>
					<Input {...register("username")} id={usernameId} className="w-full" />
				</div>
				<div className="space-y-0.5">
					<label htmlFor={passwordId} className="text-text-sm">
						Password
					</label>
					<Input {...register("password")} id={passwordId} type="password" className="w-full" />
				</div>
			</div>
			<Button className="w-full text-center" size="md">
				<span className="w-full">Login</span>
			</Button>
		</form>
	);
}
