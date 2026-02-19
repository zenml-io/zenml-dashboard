import AlertCircle from "@/assets/icons/alert-circle.svg?react";
import { useAuthContext } from "@/context/AuthContext";
import { useLoginMutation } from "@/data/session/login-mutation";
import { routes } from "@/router/routes";
import { LoginFormType, loginFormSchema } from "@/types/session";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input, useToast } from "@zenml-io/react-component-library";
import { useId } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";

export function LoginForm() {
	const navigate = useNavigate();
	const { setAuthState } = useAuthContext();
	const { toast } = useToast();

	const usernameId = useId();
	const passwordId = useId();

	const [searchParams] = useSearchParams();
	const redirect = searchParams.get("redirect");
	const username = searchParams.get("username") ?? undefined;

	const {
		register,
		handleSubmit,
		formState: { isValid }
	} = useForm<LoginFormType>({
		resolver: zodResolver(loginFormSchema),
		defaultValues: { username }
	});

	const mutation = useLoginMutation({
		onError: (error) => {
			if (error instanceof Error) {
				toast({
					status: "error",
					emphasis: "subtle",
					icon: <AlertCircle className="h-5 w-5 shrink-0 fill-error-700" />,
					description: error.message,
					rounded: true
				});
			}
		},
		onSuccess: async () => {
			setAuthState("true");
			navigate(redirect || routes.projects.overview);
		}
	});

	function login(data: LoginFormType) {
		mutation.mutate({ username: data.username.trim(), password: data.password });
	}

	function handleUsernameKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
		// When user presses Enter on username field, focus the password field
		if (e.key === "Enter") {
			e.preventDefault();
			document.getElementById(passwordId)?.focus();
		}
	}

	return (
		<form onSubmit={handleSubmit(login)} className="space-y-5">
			<div className="space-y-2">
				<div className="space-y-0.5">
					<label htmlFor={usernameId} className="text-text-sm">
						Username
					</label>
					<Input
						{...register("username")}
						id={usernameId}
						className="w-full"
						onKeyDown={handleUsernameKeyDown}
					/>
				</div>
				<div className="space-y-0.5">
					<label htmlFor={passwordId} className="text-text-sm">
						Password
					</label>
					<Input {...register("password")} id={passwordId} type="password" className="w-full" />
				</div>
			</div>
			<Button disabled={!isValid} className="w-full text-center" size="md">
				<span className="w-full">Login</span>
			</Button>
		</form>
	);
}
