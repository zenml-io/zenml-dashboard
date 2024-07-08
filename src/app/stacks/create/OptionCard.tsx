import { Badge, Box } from "@zenml-io/react-component-library";
import { ReactNode } from "react";

type Props = {
	icon: ReactNode;
	title: ReactNode;
	isRecommended?: boolean;
	subtitle: ReactNode;
	estimatedTime: string;
	comingSoon?: boolean;
};
export function CreateStackOptionCard({
	icon,
	estimatedTime,
	subtitle,
	title,
	comingSoon = false,
	isRecommended = false
}: Props) {
	return (
		<Box className={`h-full w-full space-y-1 px-6 py-5 ${comingSoon && "bg-neutral-50"}`}>
			{icon}
			<div className="flex flex-wrap items-center gap-1">
				<h2 className="text-text-lg font-semibold">{title}</h2>
				{isRecommended && (
					<Badge className="font-semibold" color="green" size="sm">
						Recommended
					</Badge>
				)}
				{comingSoon && (
					<Badge className="font-semibold" color="purple" size="sm">
						Coming Soon
					</Badge>
				)}
			</div>
			<p className="text-theme-text-secondary">{subtitle}</p>
			<p className="text-text-xs text-theme-text-tertiary">Estimated time: {estimatedTime} mins</p>
		</Box>
	);
}
