import { useGetSecretDetail } from "@/data/secrets/get-secret-detail";
import { Box } from "@zenml-io/react-component-library";
import { useParams } from "react-router-dom";
import SecretDetailTable from "./SecretDetailTable";

export default function SecretDetailsPage() {
	const { secretId } = useParams<{ secretId: string }>() || "";
	const { data: secretDetail } = useGetSecretDetail(secretId || "");

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
