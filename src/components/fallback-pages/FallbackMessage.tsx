import CodeBox from "@/assets/icons/code-box.svg?react";
import { Codesnippet } from "../CodeSnippet";

type FallbackMessageContentProps = {
	fallbackMessageContent?: {
		icon: React.ReactNode;
		title: string;
		subtitle: string;
		paragraph?: string;
		link?: string;
		href?: string;
		code?: string;
		isFullHeight?: boolean;
	};
};

export default function FallbackMessage({ fallbackMessageContent }: FallbackMessageContentProps) {
	if (!fallbackMessageContent) {
		return null;
	}

	const { icon, title, subtitle, link, href, code, isFullHeight, paragraph } =
		fallbackMessageContent;

	const Icon = () => {
		return (
			<div className="relative">
				<CodeBox />
				<div className=" absolute right-[55px] top-[20px] rounded-rounded bg-primary-25 p-3">
					{icon}
				</div>
			</div>
		);
	};

	return (
		<section
			className={`flex items-center justify-center ${
				isFullHeight ? "mt-10" : "h-[calc(100vh_-_270px)]"
			}`}
		>
			<div className="flex flex-col items-center justify-center">
				<div className="relative mb-2 flex items-center justify-center">
					<Icon />
				</div>
				<h2 className="my-3 whitespace-pre-line text-center text-display-xs font-semibold">
					{title}
				</h2>
				<p className="whitespace-pre-line text-center text-text-lg text-theme-text-secondary">
					{subtitle}
				</p>

				{link && (
					<a
						className="link mb-8 mt-5 text-text-md text-theme-text-brand"
						rel="noopener noreferrer"
						target="_blank"
						href={href}
					>
						{link}
					</a>
				)}

				{code && (
					<div className="mt-5">
						{paragraph && (
							<p className="mb-2 text-text-md text-theme-text-secondary">{paragraph}</p>
						)}
						<Codesnippet fullWidth highlightCode code={code} />
					</div>
				)}
			</div>
		</section>
	);
}
