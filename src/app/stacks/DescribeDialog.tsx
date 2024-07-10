import { Codesnippet } from "@/components/CodeSnippet";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from "@zenml-io/react-component-library";
import { ReactNode } from "react";
import { Infobox } from "./DialogItems";

export function DescribeDialog({ children, name }: { children: ReactNode; name: string }) {
	return (
		<Dialog>
			<DialogTrigger>{children}</DialogTrigger>
			<DialogContent className="lg:min-w-[600px]">
				<DialogHeader>
					<DialogTitle>Describe Stack</DialogTitle>
				</DialogHeader>
				<div className="space-y-5 p-7">
					<Infobox action="describe" />
					<div className="space-y-1">
						<p className="text-text-sm text-theme-text-secondary">Describe a stack</p>
						<Codesnippet
							codeClasses="whitespace-pre-wrap"
							wrap
							code={`zenml stack describe ${name}`}
						/>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}
