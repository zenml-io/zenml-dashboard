import { Avatar, AvatarFallback, cn } from "@zenml-io/react-component-library";

type Props = {
	username: string;
	className?: string;
};

export function InlineAvatar({ username, className }: Props) {
	return (
		<div className={cn("inline-flex items-center gap-1", className)}>
			<Avatar size="sm">
				<AvatarFallback size="sm">{username[0]}</AvatarFallback>
			</Avatar>
			<p className="text-text-sm font-semibold text-theme-text-primary">{username}</p>
		</div>
	);
}
