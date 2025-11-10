import File from "@/assets/icons/file.svg?react";
import LogoutIcon from "@/assets/icons/logout.svg?react";
import Users from "@/assets/icons/users.svg?react";
import { AnnouncementDialog } from "@/components/announcements/announcement-list/announcement-dialog";
import { useAuthContext } from "@/context/AuthContext";
import { useServerSettings } from "@/data/server/get-server-settings";
import { useServerInfo } from "@/data/server/info-query";
import { useLogoutMutation } from "@/data/session/logout-mutation";
import { useCurrentUser } from "@/data/users/current-user-query";
import { isNoAuthServer } from "@/lib/server";
import { sanitizeUrl } from "@/lib/url";
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
	Skeleton
} from "@zenml-io/react-component-library";
import { useNavigate } from "react-router-dom";
import AnnouncementButton from "./whats-new-button";
import { useAnnouncement } from "./use-announcement";
import { AnnouncementIndicator } from "@/components/announcements/announcement-indicator";

export function UserDropdown() {
	const { isAnnouncementOpen, setIsAnnouncementOpen, openAnnouncement } = useAnnouncement();
	const currentUser = useCurrentUser();
	const serverInfo = useServerInfo();
	const serverSettings = useServerSettings();
	const { removeAuthState } = useAuthContext();
	const navigate = useNavigate();
	const mutation = useLogoutMutation({
		onSuccess: () => {
			removeAuthState();
			navigate("/login");
		}
	});

	if (currentUser.isError || serverInfo.isError || serverSettings.isError) return null;

	if (currentUser.isPending || serverInfo.isPending || serverSettings.isPending)
		return <Skeleton />;

	const displayUpdates = !!serverSettings.data.body?.display_updates;

	return (
		<>
			{displayUpdates && (
				<AnnouncementDialog open={isAnnouncementOpen} setOpen={setIsAnnouncementOpen} />
			)}
			<DropdownMenu>
				<DropdownMenuTrigger className="relative">
					{displayUpdates && (
						<AnnouncementIndicator className="absolute right-0 top-0 ring-2 ring-theme-surface-primary" />
					)}
					<Avatar size="lg">
						<AvatarImage src={sanitizeUrl(currentUser.data.body?.avatar_url ?? undefined)} />
						<AvatarFallback size="lg">{currentUser.data.name[0]}</AvatarFallback>
					</Avatar>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end" sideOffset={7}>
					{displayUpdates && <AnnouncementButton openDialog={() => openAnnouncement()} />}
					<DropdownMenuItem asChild icon={<File />}>
						<a
							className="cursor-pointer"
							rel="noopener noreferrer"
							target="_blank"
							href="https://docs.zenml.io/"
						>
							Docs
						</a>
					</DropdownMenuItem>
					<DropdownMenuItem asChild icon={<Users />}>
						<a
							className="cursor-pointer"
							rel="noopener noreferrer"
							target="_blank"
							href="https://zenml.io/slack"
						>
							Community
						</a>
					</DropdownMenuItem>
					<div aria-hidden="true" className="my-1 h-[1px] bg-theme-border-moderate"></div>
					<DropdownMenuItem
						className="cursor-pointer"
						disabled={isNoAuthServer(serverInfo.data.auth_scheme)}
						onClick={() => mutation.mutate()}
						icon={<LogoutIcon className="h-3 w-3 fill-neutral-400" />}
					>
						Logout
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</>
	);
}
