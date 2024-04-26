import { ProgressTick, cn } from "@zenml-io/react-component-library";
import Check from "@/assets/icons/check.svg?react";
import { ComponentPropsWithoutRef } from "react";

type Props = ComponentPropsWithoutRef<typeof ProgressTick> & { tickClasses?: string };
export function Tick({ tickClasses, ...rest }: Props) {
	return (
		<ProgressTick {...rest}>
			<Check className={cn("h-4 w-4 fill-success-300", tickClasses)} />
		</ProgressTick>
	);
}
