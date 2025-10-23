import { useServerInfo } from "@/data/server/info-query";
import { routes } from "@/router/routes";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export function RootLayout() {
	const navigate = useNavigate();
	const { data } = useServerInfo({ throwOnError: true });

	useEffect(() => {
		if (data && data.active === false) {
			navigate(routes.activateServer + `?redirect=${routes.onboarding}`, { replace: true });
		}
	}, [data, navigate]);

	return <Outlet />;
}
