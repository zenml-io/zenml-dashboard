import { routes } from "@/router/routes";
import { Tag } from "@zenml-io/react-component-library";
import { Link } from "react-router-dom";

type Props = {
	snapshotId: string;
	snapshotName: string;
};

export function SnapshotLink({ snapshotId, snapshotName }: Props) {
	return (
		<Link to={routes.projects.snapshots.detail.overview(snapshotId)}>
			<Tag
				color="grey"
				className="inline-flex items-center gap-0.5 text-theme-text-primary"
				rounded={false}
				emphasis="subtle"
			>
				{snapshotName}
			</Tag>
		</Link>
	);
}
