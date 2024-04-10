import { Avatar, AvatarImage, AvatarFallback } from "@zenml-io/react-component-library"; // Ajusta la ruta de importación según sea necesario

interface UserProfileProps {
	size: "md" | "sm" | "lg" | "xs" | "xl" | "xxl" | null | undefined;
	type: "rounded" | "square" | null | undefined;
	name: string;
	email?: string;
	avatarUrl: string;
}

export const CompleteAvatar = ({ name, email, avatarUrl, size, type }: UserProfileProps) => {
	return (
		<div className="inline-flex items-center gap-1">
			<Avatar size="md" type={type}>
				<AvatarImage alt="User image" src={avatarUrl} />
				<AvatarFallback size={size}>{name}</AvatarFallback>
			</Avatar>
			<div>
				<p className="text-text-sm">{name}</p>
				<p className="text-text-xs text-theme-text-secondary">{email || "No email"}</p>
			</div>
		</div>
	);
};
