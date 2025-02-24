import { Avatar, AvatarFallback } from "@zenml-io/react-component-library";
import { cn } from "@zenml-io/react-component-library/utilities";

type Props = {
	username: string;
	className?: string;
};

export function InlineAvatar({ username, className = "" }: Props) {
	return (
		<div className={cn("inline-flex items-center gap-1", className)}>
			<Avatar className="static" size="sm">
				<AvatarFallback size="sm">{username[0]}</AvatarFallback>
			</Avatar>
			<p className="truncate text-text-sm font-semibold text-theme-text-primary">{username}</p>
		</div>
	);
}
