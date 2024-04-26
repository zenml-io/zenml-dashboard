import { ProgressTick, cn } from "@zenml-io/react-component-library";
import { ComponentPropsWithoutRef } from "react";
import { Icon } from "./Icon";

type Props = ComponentPropsWithoutRef<typeof ProgressTick> & { tickClasses?: string };
export function Tick({ tickClasses, ...rest }: Props) {
	return (
		<ProgressTick {...rest}>
			<Icon name="check" className={cn("h-4 w-4 fill-success-300", tickClasses)} />
		</ProgressTick>
	);
}
