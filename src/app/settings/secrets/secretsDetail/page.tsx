import { secretQueries } from "@/data/secrets";
import { useQuery } from "@tanstack/react-query";
import { Box } from "@zenml-io/react-component-library";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useBreadcrumbsContext } from "../../../../layouts/AuthenticatedLayout/BreadcrumbsContext";
import SecretDetailTable from "./SecretDetailTable";

export default function SecretDetailsPage() {
	const { secretId } = useParams<{ secretId: string }>();
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
			<Box className="space-y-4 p-5">
				<h1 className="text-text-xl font-semibold">{secretDetail?.name}</h1>
				<span className="text-sm text-gray-500">{secretId?.slice(0, 8)}</span>
				<SecretDetailTable secretId={secretId || ""} />
			</Box>
		</>
	);
}
