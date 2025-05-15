import { SecretsBreadcrumb } from "@/components/breadcrumbs/library";
import { useBreadcrumbsContext } from "@/layouts/AuthenticatedLayout/BreadcrumbsContext";
import { routes } from "@/router/routes";
import { Secret } from "@/types/secret";
import { useEffect } from "react";

export function useSecretDetailBreadcrumbs(secret?: Secret) {
	const { setBreadcrumbs } = useBreadcrumbsContext();

	useEffect(() => {
		if (secret) {
			setBreadcrumbs([
				...SecretsBreadcrumb,
				{
					label: secret.name,
					href: routes.settings.secrets.detail(secret.id)
				}
			]);
		}
	}, [secret, setBreadcrumbs]);
}
