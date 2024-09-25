import { secretQueries } from "@/data/secrets";
import { useQuery } from "@tanstack/react-query";
import { Box } from "@zenml-io/react-component-library";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { CopyButton } from "../../../../components/CopyButton";
import { useBreadcrumbsContext } from "../../../../layouts/AuthenticatedLayout/BreadcrumbsContext";
import SecretDetailTable from "./SecretDetailTable";

export default function SecretDetailsPage() {
	const { secretId } = useParams() as { secretId: string };
	const { setCurrentBreadcrumbData } = useBreadcrumbsContext();
	const { data: secretDetail } = useQuery({ ...secretQueries.secretDetail(secretId || "") });

	useEffect(() => {
		secretDetail &&
			setCurrentBreadcrumbData({
				segment: "secretsDetail",
				data: { name: secretDetail.name, id: secretDetail.id }
			});
	}, [secretDetail]);

	return (
		<>
			<Box className="space-y-5 p-5">
				<div>
					<h1 className="text-text-xl font-semibold">{secretDetail?.name}</h1>
					<div className="group/copybutton flex items-center space-x-1">
						<div className="text-theme-text-secondary">{secretId?.slice(0, 8)}</div>
						<CopyButton copyText={secretId} />
					</div>
				</div>
				<SecretDetailTable secretId={secretId || ""} />
			</Box>
		</>
	);
}
