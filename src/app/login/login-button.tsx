import { setAuthState } from "@/lib/sessions";
import { routes } from "@/router/routes";
import { useMutation } from "@tanstack/react-query";
import { Button, Spinner, useToast } from "@zenml-io/react-component-library";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { loginPro } from "./login";

export function LoginButton() {
	const [params] = useSearchParams();
	const navigate = useNavigate();
	const { toast } = useToast();
	const redirect = params.get("redirect");
	const callbackUrl = `${window.location.origin}/login?${params.toString()}`;
	const [firstTry, setFirstTry] = useState(true);

	const { mutate: login, isPending } = useMutation({
		onSettled: () => {
			setFirstTry(false);
		},
		mutationFn: loginPro,
		onError: (error) => {
			if (error instanceof Error) {
				toast({
					status: "error",
					emphasis: "subtle",
					description: error.message,
					rounded: true
				});
			}
			console.error(error);
		},
		onSuccess: async (data) => {
			if (data.authorization_url) {
				window.location.href = `${data.authorization_url}?redirect=${encodeURIComponent(callbackUrl)}`;
				return;
			}
			if (data.access_token) {
				setAuthState("true");
				navigate(redirect || routes.home);
				return;
			}
		}
	});

	useEffect(() => {
		if (firstTry) {
			login();
		}
	}, [firstTry, login]);

	if (firstTry && isPending) return <Spinner />;

	return (
		<Button size="lg" className="w-fit" onClick={() => login()}>
			Login
		</Button>
	);
}
