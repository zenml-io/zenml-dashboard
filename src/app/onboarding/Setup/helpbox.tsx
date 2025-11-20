import Help from "@/assets/icons/help.svg?react";
import { Box, buttonVariants } from "@zenml-io/react-component-library";

type OnboardingHelpBoxProps = {
	href: string;
};

export function OnboardingHelpBox({ href }: OnboardingHelpBoxProps) {
	return (
		<Box className="flex w-full flex-wrap items-center justify-between gap-y-1 p-2">
			<div className="flex items-center gap-[10px]">
				<div className="flex h-7 w-7 items-center justify-center rounded-sm bg-teal-25">
					<Help className="h-5 w-5 fill-teal-400" />
				</div>
				<p>Do you need help?</p>
			</div>
			<a
				target="_blank"
				rel="noopener noreferrer"
				className={buttonVariants({ intent: "primary", emphasis: "subtle", size: "md" })}
				href={href}
			>
				Browse our docs
			</a>
		</Box>
	);
}
