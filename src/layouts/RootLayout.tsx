import { useServerInfo } from "@/data/server/info-query";
import { routes } from "@/router/routes";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { usePageTitle } from "@/hooks/usePageTitle";

export function RootLayout() {
	const navigate = useNavigate();
	const { data } = useServerInfo({ throwOnError: true });

	// Set browser titles for both public and authenticated routes.
	usePageTitle();

	useEffect(() => {
		if (data && data.active === false) {
			navigate(routes.activateServer + `?redirect=${routes.onboarding}`, { replace: true });
		}
	}, [data, navigate]);

	return <Outlet />;
}
