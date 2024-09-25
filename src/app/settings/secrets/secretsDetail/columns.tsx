import { useState } from "react"; // Import useState for local state
import { ColumnDef } from "@tanstack/react-table";
import KeyIcon from "@/assets/icons/key-icon.svg?react";
import EyeIcon from "@/assets/icons/eye.svg?react";
import SecretTableDropDown from "./SecretTableDropDown";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger
} from "@zenml-io/react-component-library";
import { Codesnippet } from "@/components/CodeSnippet";
import Info from "@/assets/icons/info.svg?react";

const ValueCell: React.FC<{ value: unknown }> = ({ value }) => {
	const [isVisible, setIsVisible] = useState(false);
	const valueStr = typeof value === "string" ? value : "";
	const dots = "•".repeat(valueStr.length);

	return (
		<div className="flex  items-center gap-2 space-x-2">
			<EyeIcon
				onClick={() => setIsVisible(!isVisible)}
				className="h-4 w-4 flex-shrink-0 cursor-pointer"
			/>
			<span>{isVisible ? valueStr : dots}</span>
		</div>
	);
};

export function getSecretDetailColumn(secretId: any): ColumnDef<any>[] {
	const columns: ColumnDef<any>[] = [
		{
			id: "key",
			header: "Key",
			accessorFn: (row) => ({
				key: row.key,
				name: row.name
			}),
			cell: ({ getValue }) => {
				const { name, key } = getValue<{
					key: string;
					name: string;
				}>();
				return (
					<div className="flex items-center space-x-2">
						<KeyIcon className="h-4 w-4 flex-shrink-0" />
						<div className="flex flex-col">
							<div className="flex flex-row items-center gap-0.5 space-x-1">
								{/* Flex container to ensure name and icon are aligned horizontally */}
								<div className="flex flex-row items-center">
									<span className="text-text-md font-semibold text-theme-text-primary">{key}</span>

									{/* Icon placed next to the name */}
									<TooltipProvider>
										<Tooltip>
											<TooltipTrigger asChild>
												<div className="">
													<Info className="ml-1 h-4 w-4 shrink-0 cursor-pointer fill-theme-text-tertiary" />
												</div>
											</TooltipTrigger>
											<TooltipContent
												align="start"
												side="bottom"
												className="z-50 flex max-w-[480px] flex-col gap-2 bg-theme-surface-primary p-5 text-text-sm text-theme-text-primary"
											>
												<p className="text-md text-theme-text-primary">
													To use your secret in a step, you can use the following code:
												</p>
												<Codesnippet
													highlightCode
													wrap
													codeClasses="whitespace-pre-wrap break-words"
													code={`from zenml.client import Client
secret = Client().get_secret(${name})
	  
# 'secret.secret_values' will contain a dictionary with all key-value pairs within your secret.
secret.secret_values["key"]
	  `}
												/>
												<a
													className="link text-primary-400"
													target="_blank"
													href="https://docs.zenml.io/how-to/interact-with-secrets#accessing-registered-secrets"
												>
													Learn More
												</a>
											</TooltipContent>
										</Tooltip>
									</TooltipProvider>
								</div>
							</div>
						</div>
					</div>
				);
			}
		},

		{
			id: "value",
			header: "Value",
			accessorKey: "value",
			cell: ({ row }) => <ValueCell value={row.getValue("value")} />
		},
		{
			id: "actions",
			header: "",
			cell: ({ row }) => <SecretTableDropDown secretId={secretId} keyName={row.getValue("key")} />
		}
	];

	return columns;
}
