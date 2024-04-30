import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogTitle,
	DialogTrigger,
	DialogClose
} from "@zenml-io/react-component-library";
import { Button } from "@zenml-io/react-component-library";
import { ReactNode } from "react";
import { Icon } from "./Icon";

type Props = {
	isButton?: boolean;
	buttonText?: ReactNode;
	videoLink: string;
	fallbackImage?: ReactNode;
};

export function VideoModal({ videoLink, isButton = true, buttonText, fallbackImage }: Props) {
	return (
		<Dialog>
			{isButton ? (
				<DialogTrigger asChild>
					<Button className="mt-5 h-auto gap-1 px-2 py-1 sm:h-7" size="md">
						<Icon name="play-circle" className="h-5 w-5 shrink-0 fill-white" />
						{buttonText ?? <>Watch the Quickstart Guide (3 min)</>}
					</Button>
				</DialogTrigger>
			) : (
				<DialogTrigger>{fallbackImage}</DialogTrigger>
			)}

			<DialogContent className="max-w-[1000px]">
				<div className="flex items-center justify-between border-b border-theme-border-moderate py-2 pl-5 pr-3">
					<DialogTitle className="text-text-lg">Get Started</DialogTitle>
				</div>
				<div className="">
					<iframe
						className="aspect-video w-full overflow-hidden"
						src={videoLink}
						allowFullScreen
						allow="fullscreen"
					></iframe>
				</div>
				<DialogFooter>
					<DialogClose asChild>
						<Button size="md">Close</Button>
					</DialogClose>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
