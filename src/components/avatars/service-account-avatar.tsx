import { generateNumberFromSalt } from "@/lib/images";
import { sanitizeUrl } from "@/lib/url";
import { Avatar, AvatarFallback, AvatarImage, cn } from "@zenml-io/react-component-library";
import { ComponentPropsWithoutRef, forwardRef } from "react";

type Props = {
	serviceAccountName: string;
	serviceAccountAvatar: string | undefined;
};

const getClassVariant = (saltValue: number): string => {
	switch (saltValue) {
		case 1:
			return "bg-primary-100 text-theme-text-brand";
		case 2:
			return "bg-warning-50 text-warning-500";
		case 3:
			return "bg-magenta-50 text-magenta-400";
		case 4:
			return "bg-turquoise-50 text-turquoise-400";
		default:
			return "";
	}
};

export const ServiceAccountAvatar = forwardRef<
	React.ElementRef<typeof Avatar>,
	ComponentPropsWithoutRef<typeof Avatar> & Props
>(({ size, type, serviceAccountName, serviceAccountAvatar, className, ...rest }, ref) => {
	const salt = (generateNumberFromSalt(serviceAccountName ?? "") % 4) + 1;

	const mdRounded = size === "xxl" || size === "xl";

	return (
		<Avatar
			ref={ref}
			size={size}
			className={cn(!mdRounded && "rounded-sm", className)}
			type="square"
			{...rest}
		>
			<AvatarImage src={sanitizeUrl(serviceAccountAvatar ?? undefined)} />
			<AvatarFallback className={getClassVariant(salt)} size={size}>
				{serviceAccountName?.[0] ?? "S"}
			</AvatarFallback>
		</Avatar>
	);
});
ServiceAccountAvatar.displayName = "ServiceAccountAvatar";
