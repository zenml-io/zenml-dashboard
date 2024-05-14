import ChevronDown from "@/assets/icons/chevron-down.svg?react";
import {
	CollapsibleContent,
	CollapsibleHeader,
	CollapsiblePanel,
	CollapsibleTrigger,
	Tag
} from "@zenml-io/react-component-library";
import { useState } from "react";
import Docker from "@/assets/icons/services/docker.svg?react";
import Redirect from "@/assets/icons/redirect.svg?react";
import { CopyButton } from "@/components/CopyButton";
import { Codesnippet } from "@/components/CodeSnippet";
import { KeyValue } from "@/components/KeyValue";
import { extractDockerImageKey } from "@/lib/strings";

type Props = {
	data: any;
};

export function DockerImageCollapsible({ data }: Props) {
	const [open, setOpen] = useState(true);

	return (
		<CollapsiblePanel open={open} onOpenChange={setOpen}>
			<CollapsibleHeader intent="primary" className="flex items-center gap-[10px]">
				<CollapsibleTrigger className="flex w-full items-center gap-[10px]">
					<ChevronDown
						className={` ${
							open ? "" : "-rotate-90"
						} h-5 w-5 rounded-md fill-neutral-500 transition-transform duration-200 hover:bg-neutral-200`}
					/>
					Docker Image
				</CollapsibleTrigger>
			</CollapsibleHeader>
			<CollapsibleContent className="border-t border-theme-border-moderate bg-theme-surface-primary px-5 py-3">
				<dl className="grid grid-cols-1 gap-x-[10px] gap-y-2 md:grid-cols-3 md:gap-y-4">
					<KeyValue
						label="Docker Image"
						value={
							<div className="flex justify-between">
								<Tag className="inline-flex items-center gap-0.5" rounded={false} emphasis="subtle">
									<Docker className="mr-1 h-4 w-4 fill-theme-text-brand" />
									{extractDockerImageKey(data.image)}
								</Tag>
								<div className="align-center mr-1 flex">
									<a
										className="cursor-pointer"
										rel="noopener noreferrer"
										target="_blank"
										href={`https://${data.image}`}
									>
										<Redirect className="mr-1 mt-0.5 h-5 w-5 fill-theme-text-tertiary" />
									</a>
									<CopyButton copyText={data.image} isVisible copyTitle="Copy url" />
								</div>
							</div>
						}
					/>
					<KeyValue
						label="Contains Code"
						value={
							<Tag
								color={data.contains_code ? "green" : "grey"}
								className="inline-flex items-center gap-0.5"
								rounded={false}
								emphasis="subtle"
							>
								{data.contains_code ? "Available" : "None"}
							</Tag>
						}
					/>
				</dl>
				<p className="mb-2 mt-5 text-theme-text-secondary">Dockerfile</p>
				<Codesnippet fullWidth highlightCode wrap code={data.dockerfile} />
				<p className="mb-2 mt-5 text-theme-text-secondary">Requirements</p>
				<Codesnippet fullWidth highlightCode wrap code={data.requirements} />
			</CollapsibleContent>
		</CollapsiblePanel>
	);
}
