import { setAuthState } from "@/lib/sessions";
import { routes } from "@/router/routes";
import { useMutation } from "@tanstack/react-query";
import { Button, Spinner } from "@zenml-io/react-component-library";
import { useEffect, useState } from "react";
import { useNavigate, useNavigation, useSearchParams } from "react-router-dom";
import { loginPro } from "./login";

export function LoginButton() {
	const [params] = useSearchParams();
	const navigate = useNavigate();
	const navigation = useNavigation();
	const redirect = params.get("redirect");
	const callbackUrl = `${window.location.origin}/login?${params.toString()}`;
	const [firstTry, setFirstTry] = useState(true);

	const { mutate: login, isPending } = useMutation({
		onSettled: () => {
			setFirstTry(false);
		},
		mutationFn: loginPro,
		onError: (error) => {
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

	if (firstTry && (isPending || navigation.state === "loading")) return <Spinner />;

	return (
		<Button size="lg" className="w-fit" onClick={() => login()}>
			Login
		</Button>
	);
}
