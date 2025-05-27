import { PropsWithChildren, ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { useServerInfo } from "../data/server/info-query";
import { routes } from "./routes";
import { setAuthState } from "@/lib/sessions";
import { isNoAuthServer } from "@/lib/server";

export function withProtectedRoute(comp: ReactNode) {
	return <ProtectedRoute>{comp}</ProtectedRoute>;
}

function ProtectedRoute({ children }: PropsWithChildren) {
	const { getAuthState, removeAuthState } = useAuthContext();
	const serverInfo = useServerInfo();
	const isLoggedIn = getAuthState();

	if (serverInfo.isError || serverInfo.isPending) return null;

	if (isNoAuthServer(serverInfo.data.auth_scheme)) {
		setAuthState("true");
	}

	if (!isLoggedIn && !isNoAuthServer(serverInfo.data.auth_scheme)) {
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
