import { useCopy } from "@/lib/copy";
import Tick from "@/assets/icons/tick-circle.svg?react";
import Copy from "@/assets/icons/copy.svg?react";
import { cn } from "@zenml-io/react-component-library/utilities";
import { useServerInfo } from "@/data/server/info-query";
import { Skeleton } from "@zenml-io/react-component-library/components/server";
import { getLoginCommand } from "@/lib/login-command";
type Props = {
	className?: string;
};
export function LoginCommand({ className }: Props) {
	const info = useServerInfo();
	const { copied, copyToClipboard } = useCopy();

	if (info.isPending) return <Skeleton className="h-7 w-[160px]" />;
	if (info.isError) return null;

	const loginCommand = getLoginCommand(info.data.deployment_type || "other");

	return (
		<div className={cn("flex items-center gap-2 truncate", className)}>
			<div className="flex w-full items-center justify-between gap-1 truncate rounded-md border border-theme-border-moderate bg-theme-surface-secondary px-2 py-1 text-text-sm text-theme-text-secondary">
				<code className="truncate font-normal">{loginCommand}</code>
				{copied ? (
					<>
						<Tick className="h-3 w-3 shrink-0 fill-theme-text-tertiary" />
						<p className="sr-only">copied successfully</p>
					</>
				) : (
					<button className="z-10" onClick={() => copyToClipboard(loginCommand)}>
						<Copy className="h-3 w-3 shrink-0 fill-theme-text-tertiary" />
						<p className="sr-only">Copy tenantUrl</p>
					</button>
				)}
			</div>
		</div>
	);
}
