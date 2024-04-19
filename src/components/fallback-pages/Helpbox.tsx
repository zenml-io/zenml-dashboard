import { Box, buttonVariants } from "@zenml-io/react-component-library";
import { ReactNode } from "react";
import { Icon } from "../Icon";

type HelpBoxProps = {
	text?: ReactNode;
	link: string;
};
export function HelpBox({ link, text = "Do you need help?" }: HelpBoxProps) {
	return (
		<Box className="flex w-full flex-wrap items-center justify-between p-2">
			<div className="flex items-center gap-[10px]">
				<div className="flex h-7 w-7 items-center justify-center rounded-sm bg-teal-25">
					<Icon name="help" className="h-5 w-5 fill-teal-400" />
				</div>
				<p>{text}</p>
			</div>
			<a
				target="_blank"
				rel="noopener noreferrer"
				className={buttonVariants({ intent: "primary", emphasis: "subtle", size: "md" })}
				href={link}
			>
				Browse our docs
			</a>
		</Box>
	);
}
