import { Tag } from "@zenml-io/react-component-library";
import { getLabelColor, getLabelDisplayName, LabelValue } from "./label-utils";

export function AnnouncementLabel({ label }: { label: LabelValue }) {
	return (
		<Tag color={getLabelColor(label)} size="xs" rounded={false} emphasis="subtle">
			{getLabelDisplayName(label)}
		</Tag>
	);
}
