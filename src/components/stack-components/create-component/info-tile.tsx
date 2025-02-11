import FileText from "@/assets/icons/file-text.svg?react";
import File from "@/assets/icons/file.svg?react";
import TerminalSquare from "@/assets/icons/terminal-square.svg?react";
import { sanitizeUrl } from "@/lib/url";
import { Box, Button } from "@zenml-io/react-component-library/components/server";

type InfoTileProps = {
	sdkDocsUrl?: string;
	logoUrl?: string;
	name: string;
};
export function InfoTile({ sdkDocsUrl, name, logoUrl }: InfoTileProps) {
	return (
		<Box className="space-y-5 overflow-hidden pb-5">
			<div className="flex h-[120px] w-full items-center justify-center bg-teal-25">
				{!!logoUrl && (
					<img
						width={60}
						height={60}
						className="aspect-square object-contain"
						src={sanitizeUrl(logoUrl)}
						alt={`Logo of ${name}`}
					/>
				)}
			</div>
			<div className="space-y-2">
				<div className="px-5">
					<p className="text-text-lg font-semibold">Need Help?</p>
					<p className="text-theme-text-secondary">
						Follow our extensive documentation to get started.
					</p>
				</div>
				<ul className="space-y-0.5 px-5">
					{!!sdkDocsUrl && (
						<li>
							<Button asChild emphasis="minimal" intent="primary" size="md">
								<a
									className="flex items-center gap-1"
									target="_blank"
									rel="noopener noreferrer"
									href={sdkDocsUrl}
								>
									<FileText className="size-5 shrink-0 fill-primary-600" />
									Api Reference
								</a>
							</Button>
						</li>
					)}
					<li>
						<Button asChild emphasis="minimal" intent="primary" size="md">
							<a
								className="flex items-center gap-1"
								target="_blank"
								rel="noopener noreferrer"
								href="https://github.com/zenml-io/zenml/tree/main/examples"
							>
								<TerminalSquare className="size-5 shrink-0 fill-primary-600" />
								Navigate our examples
							</a>
						</Button>
					</li>
					<li>
						<Button asChild emphasis="minimal" intent="primary" size="md">
							<a
								className="flex items-center gap-1"
								target="_blank"
								rel="noopener noreferrer"
								href="https://www.zenml.io/blog"
							>
								<File className="size-5 shrink-0 fill-primary-600" />
								Read our blog
							</a>
						</Button>
					</li>
				</ul>
			</div>
		</Box>
	);
}
