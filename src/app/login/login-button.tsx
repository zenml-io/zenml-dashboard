import { setAuthState } from "@/lib/sessions";
import { routes } from "@/router/routes";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@zenml-io/react-component-library";
import { useNavigate, useSearchParams } from "react-router-dom";
import { loginPro } from "./login";

export function LoginButton() {
	const [params] = useSearchParams();
	const navigate = useNavigate();
	const redirect = params.get("redirect");
	const callbackUrl = `${window.location.origin}/login?${params.toString()}`;

	const { mutate: login } = useMutation({
		mutationFn: loginPro,
		onSuccess: (data) => {
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

	return (
		<Button size="lg" className="w-fit" onClick={() => login()}>
			Login
		</Button>
	);
}
