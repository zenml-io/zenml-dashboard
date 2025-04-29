import { Tag } from "@zenml-io/react-component-library/components/server";
import Transform from "@/assets/icons/transform.svg?react";

type Props = {
	connectorName: string;
};

export function ConnectorTag({ connectorName }: Props) {
	return (
		<Tag color="yellow" rounded={false} className="w-fit gap-0.5" emphasis="subtle">
			<Transform width={20} height={20} className="shrink-0 fill-warning-900" />
			<span>{connectorName}</span>
		</Tag>
	);
}
