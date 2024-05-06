import { Avatar, AvatarFallback } from "@zenml-io/react-component-library";

type Props = {
	username: string;
};

export function InlineAvatar({ username }: Props) {
	return (
		<div className="inline-flex items-center gap-1">
			<Avatar size="sm">
				<AvatarFallback size="sm">{username[0]}</AvatarFallback>
			</Avatar>
			<p className="text-text-sm font-semibold text-theme-text-primary">{username}</p>
		</div>
	);
}
