import { sanitizeUrl } from "@/lib/url";
import { Avatar, AvatarFallback, AvatarImage } from "@zenml-io/react-component-library";
import { ComponentPropsWithoutRef, forwardRef } from "react";
import { ServiceAccountAvatar } from "./service-account-avatar";

type Props = {
	avatarUrl?: string;
	name: string;
	isServiceAccount: boolean;
};

export const UserOrServiceAccountAvatar = forwardRef<
	React.ElementRef<typeof Avatar>,
	ComponentPropsWithoutRef<typeof Avatar> & Props
>(({ avatarUrl, name, isServiceAccount, size, ...rest }, ref) => {
	if (isServiceAccount)
		return (
			<ServiceAccountAvatar
				ref={ref}
				size={size}
				serviceAccountName={name}
				serviceAccountAvatar={avatarUrl}
				{...rest}
			/>
		);

	return (
		<Avatar ref={ref} size={size} {...rest}>
			<AvatarImage alt="Logo displayed for the user" src={sanitizeUrl(avatarUrl)} />
			<AvatarFallback size={size}>{name[0]}</AvatarFallback>
		</Avatar>
	);
});
UserOrServiceAccountAvatar.displayName = "UserOrServiceAccountAvatar";
