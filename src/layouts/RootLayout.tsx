import { useServerInfo } from "@/data/server/info-query";
import { routes } from "@/router/routes";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export function RootLayout() {
	const navigate = useNavigate();
	const { data } = useServerInfo({ throwOnError: true });

	useEffect(() => {
		if (data && data.active === false) {
			navigate(routes.activateServer, { replace: true });
		}
	}, [data]);

	return (
		<div className="bg-theme-surface-secondary font-sans font-medium text-theme-text-primary antialiased">
			<Outlet />
		</div>
	);
}
