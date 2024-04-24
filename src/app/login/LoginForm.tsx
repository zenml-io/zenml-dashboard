import { useAuthContext } from "@/context/AuthContext";
import { useLoginMutation } from "@/data/session/login-mutation";
import { routes } from "@/router/routes";
import { LoginPayload } from "@/types/session";
import { Button, Input, useToast } from "@zenml-io/react-component-library";
import { useId } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Icon } from "@/components/Icon";

export function LoginForm() {
	const navigate = useNavigate();
	const { setAuthState } = useAuthContext();
	const { toast } = useToast();

	const usernameId = useId();
	const passwordId = useId();

	const [searchParams] = useSearchParams();
	const redirect = searchParams.get("redirect");

	const { register, handleSubmit } = useForm<LoginPayload>();

	const mutation = useLoginMutation({
		onError: (error) => {
			if (error instanceof Error) {
				toast({
					status: "error",
					emphasis: "subtle",
					icon: <Icon name="alert-circle" className="h-5 w-5 shrink-0 fill-error-700" />,
					description: error.message,
					rounded: true
				});
			}
		},
		onSuccess: async () => {
			setAuthState("true");
			navigate(redirect || routes.home);
		}
	});

	function login(data: LoginPayload) {
		mutation.mutate({ username: data.username.trim(), password: data.password });
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
