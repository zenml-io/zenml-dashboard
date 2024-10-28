import { PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { useServerInfo } from "../data/server/info-query";
import { routes } from "./routes";
import { setAuthState } from "../lib/sessions";

export function ProtectedRoute({ children }: PropsWithChildren) {
	const { getAuthState, removeAuthState } = useAuthContext();
	const serverInfo = useServerInfo();
	const isLoggedIn = getAuthState();

	if (serverInfo.isError || serverInfo.isPending) return null;

	if (serverInfo.data.auth_scheme === "NO_AUTH") {
		setAuthState("true");
	}

	if (!isLoggedIn && serverInfo.data.auth_scheme !== "NO_AUTH") {
		removeAuthState();
		return (
			<Navigate
				to={
					routes.login +
					`?${new URLSearchParams({
						redirect: location.pathname + location.search
					}).toString()}`
				}
			/>
		);
	}
	return children;
}
