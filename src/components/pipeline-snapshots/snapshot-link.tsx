import SnapshotIcon from "@/assets/icons/snapshot.svg?react";
import { routes } from "@/router/routes";
import { Tag } from "@zenml-io/react-component-library";
import { ComponentProps } from "react";
import { Link } from "react-router-dom";

type Props = ComponentProps<typeof Tag> & {
	snapshotId: string;
	snapshotName: string;
};

export function SnapshotLink({ snapshotId, snapshotName, size, ...props }: Props) {
	const iconSize = size || "sm";
	const iconClassName = iconSize === "sm" ? "size-4" : "size-3";

	return (
		<Link to={routes.projects.snapshots.detail.overview(snapshotId)}>
			<Tag
				color="grey"
				className="inline-flex items-center gap-0.5 text-theme-text-primary"
				rounded={false}
				emphasis="subtle"
				size={size}
				{...props}
			>
				<SnapshotIcon className={`${iconClassName} shrink-0 fill-theme-text-tertiary`} />
				<span>{snapshotName}</span>
			</Tag>
		</Link>
	);
}
