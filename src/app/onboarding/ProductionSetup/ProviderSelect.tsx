import Aws from "@/assets/icons/services/aws.svg?react";
import Gcp from "@/assets/icons/services/gcp.svg?react";
import Azure from "@/assets/icons/services/azure.svg?react";
import Cloud from "@/assets/icons/cloud.svg?react";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from "@zenml-io/react-component-library";

type Props = {
	displayOther?: boolean;
	setValue?: (value: CloudProvider) => void;
	value?: CloudProvider;
	id: string;
};

export type CloudProvider = "gcp" | "aws" | "azure" | "other";

export function ProviderSelect({ displayOther = false, setValue, value, id }: Props) {
	return (
		<Select value={value} onValueChange={setValue}>
			<SelectTrigger
				id={id}
				className="w-[125px] border border-neutral-300 px-2 text-left text-text-md"
			>
				<SelectValue placeholder="Select your Provider" />
			</SelectTrigger>
			<SelectContent className="">
				<SelectItem value="aws">
					<div className="flex items-center gap-1">
						<Aws className="h-5 w-5" />
						AWS
					</div>
				</SelectItem>
				<SelectItem value="gcp">
					{" "}
					<div className="flex items-center gap-1">
						<Gcp className="h-5 w-5" />
						GCP
					</div>
				</SelectItem>
				<SelectItem value="azure">
					<div className="flex items-center gap-1">
						<Azure className="h-5 w-5" />
						Azure
					</div>
				</SelectItem>
				{displayOther && (
					<SelectItem value="other">
						<div className="flex items-center gap-1">
							<Cloud className="h-5 w-5 stroke-neutral-400" />
							Other
						</div>
					</SelectItem>
				)}
			</SelectContent>
		</Select>
	);
}
