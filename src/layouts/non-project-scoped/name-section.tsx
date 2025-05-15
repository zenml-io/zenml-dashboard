import { useServerInfo } from "@/data/server/info-query";
import {
	Avatar,
	AvatarFallback,
	AvatarImage
} from "@zenml-io/react-component-library/components/client";
import { Button, Skeleton } from "@zenml-io/react-component-library/components/server";
import { NonProjectScopedDropdown } from "./dropdown";
import ExternalLink from "@/assets/icons/link-external.svg?react";
import { LoginCommand } from "@/components/login-command";
import { ServerMembers } from "./server-members";

export function NameSection() {
	return (
		<div className="flex w-full flex-col justify-between gap-2 md:flex-row md:items-center">
			<WorkspaceName />
			<MemberSection />
		</div>
	);
}

function WorkspaceName() {
	const server = useServerInfo();

	if (server.isPending) return <WorkspaceNameSkeleton />;
	if (server.isError) throw server.error;

	const serverName = server.data.name;

	return (
		<div className="flex w-full flex-col gap-5 overflow-hidden md:flex-row md:items-center">
			<Avatar type="square" size="xl">
				<AvatarImage
					src={`https://avatar.vercel.sh/${encodeURIComponent(serverName ?? "")}?size=64`}
				/>
				<AvatarFallback size="xl">{serverName?.[0] || "S"}</AvatarFallback>
			</Avatar>
			<div className="overflow-hidden">
				<p className="text-text-xs uppercase text-theme-text-secondary">Workspace</p>
				<div className="flex flex-col gap-2 md:flex-row md:items-center">
					<p className="truncate text-display-xs font-semibold">{serverName}</p>
				</div>
			</div>
		</div>
	);
}

function WorkspaceNameSkeleton() {
	return (
		<div className="flex items-center gap-5">
			<Skeleton className="size-9 shrink-0 rounded-md" />
			<Skeleton className="h-6 w-[300px] rounded-md" />
		</div>
	);
}

function MemberSection() {
	return (
		<div className="flex w-full flex-col items-start space-y-3 md:items-end">
			<div className="flex items-center gap-2">
				<ServerMembers />
				<NonProjectScopedDropdown />
			</div>
			<div className="flex flex-wrap items-center gap-2">
				<LoginCommand className="max-w-[300px]" />
				<WorkspaceUrlButton />
			</div>
		</div>
	);
}

function WorkspaceUrlButton() {
	return (
		<Button
			size="sm"
			intent="primary"
			className="flex h-7 items-center gap-1"
			emphasis="subtle"
			asChild
		>
			<a
				target="_blank"
				rel="noreferrer noopener"
				href={`${window.location.origin}/docs`}
				className="flex items-center gap-1"
			>
				API
				<ExternalLink width={16} height={16} className="shrink-0 fill-primary-600" />
			</a>
		</Button>
	);
}
