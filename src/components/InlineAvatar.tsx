import { cn } from "@zenml-io/react-component-library";
import { HTMLAttributes } from "react";
import { UserOrServiceAccountAvatar } from "./avatars/user-or-service-account";
import { BotBadge } from "./bot-badge";

type CustomProps = {
	username: string;
	isServiceAccount: boolean;
	avatarUrl: string | undefined;
};

type Props = HTMLAttributes<HTMLDivElement> & CustomProps;

export function InlineAvatar({ username, isServiceAccount, avatarUrl, className, ...rest }: Props) {
	return (
		<div className={cn("inline-flex items-center gap-1 whitespace-nowrap", className)} {...rest}>
			<UserOrServiceAccountAvatar
				size="sm"
				name={username}
				isServiceAccount={isServiceAccount}
				avatarUrl={avatarUrl}
			/>
			<div className="grid grid-cols-1">
				<p className="truncate text-text-sm font-semibold text-theme-text-primary">{username}</p>
			</div>
			{isServiceAccount && <BotBadge />}
		</div>
	);
}
