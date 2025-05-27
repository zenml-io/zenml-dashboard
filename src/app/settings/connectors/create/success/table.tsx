import { DataTable } from "@zenml-io/react-component-library/components/client";
import { ServiceConnector } from "@/types/service-connectors";
import { useServiceConnectorListColumns } from "./columns";

type Props = {
	connector: ServiceConnector;
};
export function ConnectorSuccessTable({ connector }: Props) {
	const columns = useServiceConnectorListColumns();
	return (
		<section className="flex flex-col gap-5">
			<div className="flex flex-col items-center gap-5">
				<div className="w-full">
					<DataTable columns={columns} data={[connector]} />
				</div>
			</div>
		</section>
	);
}
