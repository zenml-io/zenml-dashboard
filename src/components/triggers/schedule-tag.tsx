import Clock from "@/assets/icons/clock.svg?react";
import { Tag } from "@zenml-io/react-component-library";
import { ComponentProps } from "react";

type Props = ComponentProps<typeof Tag>;

export function ScheduleTag({ ...props }: Props) {
	return (
		<Tag rounded={false} className="inline-flex" emphasis="subtle" color="blue" {...props}>
			<Clock className="h-4 w-4 shrink-0 fill-current" />
			<span className="truncate">Schedule</span>
		</Tag>
	);
}
