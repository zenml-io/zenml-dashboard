import Aws from "@/assets/icons/services/aws.svg?react";
import Gcp from "@/assets/icons/services/gcp.svg?react";
import Azure from "@/assets/icons/services/azure.svg?react";
import { HTMLAttributes } from "react";
import { cn } from "@zenml-io/react-component-library";
type Props = HTMLAttributes<HTMLOrSVGElement> & {
	provider: "aws" | "gcp" | "azure";
};
export function CloudProviderIcon({ provider, className, ...rest }: Props) {
	const classname = cn("w-5 h-5 shrink-0", className);
	switch (provider) {
		case "aws":
			return <Aws {...rest} className={classname} />;
		case "azure":
			return <Azure {...rest} className={classname} />;
		case "gcp":
			return <Gcp {...rest} className={classname} />;
	}
}
