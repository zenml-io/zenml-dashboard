import LockIcon from "@/assets/icons/Lock.svg?react";
import { CopyButton } from "@/components/CopyButton";
import { DisplayDate } from "@/components/DisplayDate";
import { InlineAvatar } from "@/components/InlineAvatar";
import { getUsername } from "@/lib/user";
import { SecretNamespace } from "@/types/secret";
import { User } from "@/types/user";
import { ColumnDef } from "@tanstack/react-table";
import { NavigateFunction } from "react-router-dom";
import SecretsDropdown from "./SecretsDropdown";
import Info from "@/assets/icons/info.svg?react";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger
} from "@zenml-io/react-component-library";
import { Codesnippet } from "@/components/CodeSnippet";

export function getSecretColumns(navigate: NavigateFunction): ColumnDef<SecretNamespace>[] {
	return [
		{
			id: "secret",
			header: "Secret",
			accessorFn: (row) => row.name,
			cell: ({ getValue, row }) => (
				<div className="flex cursor-pointer items-center space-x-2">
					<LockIcon className="h-4 w-4 flex-shrink-0 cursor-pointer fill-primary-400" />
					<div className="flex flex-col">
						<div className="group/copybutton flex flex-row items-center gap-0.5 space-x-1">
							{/* Flex container to ensure name and icon are aligned horizontally */}
							<div className="flex flex-row items-center">
								<span
									className="text-text-md font-semibold text-theme-text-primary"
									onClick={() => navigate(`/settings/secrets/${row.original.id}`)}
								>
									{getValue<string>()}
								</span>
								{/* Icon placed next to the name */}
								<TooltipProvider>
									<Tooltip>
										<TooltipTrigger asChild>
											<div className="">
												<Info className="ml-1 h-4 w-4 shrink-0 fill-theme-text-tertiary" />
											</div>
										</TooltipTrigger>
										<TooltipContent
											align="start"
											side="bottom"
											className=" z-50 flex max-w-[480px] flex-col gap-2 bg-theme-surface-primary p-5 text-text-sm text-theme-text-primary"
										>
											<p className="text-md text-theme-text-primary">
												To use your secret in a step, you can use the following code:
											</p>
											<Codesnippet
												fullWidth
												highlightCode
												wrap
												codeClasses="whitespace-pre-wrap break-words" // Use break-words for more natural wrapping
												code={`from zenml.client import Client
secret = Client().get_secret(${getValue<string>()})
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
							<CopyButton copyText={getValue<string>()} />
						</div>
						<span className="text-sm text-gray-500">{row.original.id.slice(0, 8)}</span>
					</div>
				</div>
			)
		},

		{
			id: "author",
			header: "Author",
			accessorFn: (row) => row.body?.user,
			cell: ({ getValue }) => {
				const user = getValue<User>();
				return (
					<>
						<InlineAvatar username={getUsername(user)} />
					</>
				);
			}
		},
		{
			id: "created_at",
			header: "Created At",
			accessorFn: (row) => row.body?.created,
			cell: ({ getValue }) => (
				<p className="text-text-sm text-theme-text-secondary">
					<DisplayDate dateString={getValue<string>()} />
				</p>
			)
		},
		{
			id: "admin_actions",
			header: "",
			accessorFn: (row) => String(row.id),
			cell: ({ row, getValue }) => {
				const secretId = getValue() as string;
				return row.original.body?.user?.body?.is_admin ? (
					<SecretsDropdown secretId={secretId} />
				) : (
					<p className="text-sm text-theme-text-secondary">No Actions</p>
				);
			}
		}
	];
}
