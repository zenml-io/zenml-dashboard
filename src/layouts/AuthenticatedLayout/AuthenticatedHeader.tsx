import ZenMLIcon from "@/assets/icons/zenml-icon.svg?react";
import { useLogoutMutation } from "@/data/session/logout-mutation";
import { removeAuthState } from "@/lib/sessions";
import { routes } from "@/router/routes";
import { Button } from "@zenml-io/react-component-library";
import { Link, useNavigate } from "react-router-dom";

export function AuthenticatedHeader() {
	const navigate = useNavigate();
	const mutation = useLogoutMutation();

	return (
		<header className="sticky top-0 z-10 h-9 border-b border-theme-border-moderate bg-theme-surface-primary">
			<div className="flex h-full items-center justify-between">
				<Link
					aria-label="Go to organizations page"
					to={routes.home}
					className="flex h-full w-9 flex-shrink-0 items-center justify-center border-r border-theme-border-moderate"
				>
					<ZenMLIcon className="h-6 w-6" />
				</Link>
				<Button
					onClick={() => {
						mutation.mutate();
						removeAuthState();
						navigate(routes.login, { replace: true });
					}}
				>
					Logout
				</Button>
			</div>
		</header>
	);
}
