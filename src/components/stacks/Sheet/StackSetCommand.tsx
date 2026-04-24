import { Codesnippet } from "@/components/CodeSnippet";
import { CollapsibleCard } from "@/components/CollapsibleCard";
import { Numberbox } from "../../NumberBox";
import { useIntegrationsContext } from "./IntegrationsContext";

type StackSetCommandProps = {
	name: string;
};

export function StackSetCommand({ name }: StackSetCommandProps) {
	const { integrations } = useIntegrationsContext();

	return (
		<section className="px-5 pt-5">
			<CollapsibleCard title="Set this stack" initialOpen>
				<ul className="space-y-5">
					<li className="space-y-2">
						<div className="flex items-center gap-2">
							<Numberbox>1</Numberbox>
							<p className="font-semibold">Set your stack</p>
						</div>
						<div className="space-y-1">
							<p className="text-text-sm text-theme-text-secondary">
								Set the stack as active on your client
							</p>
							<Codesnippet
								codeClasses="whitespace-pre-wrap"
								wrap
								code={`zenml stack set ${name}`}
							/>
						</div>
					</li>
					{integrations.length >= 1 && (
						<li className="space-y-2">
							<div className="flex items-center gap-2">
								<Numberbox>2</Numberbox>
								<p className="font-semibold">Install the integrations</p>
							</div>
							<div className="space-y-1">
								<p className="text-text-sm text-theme-text-secondary">
									Install the required integrations to run pipelines in your stack
								</p>
								<Codesnippet
									codeClasses="whitespace-pre-wrap"
									wrap
									code={`zenml integration install ${integrations.join(" ")} --uv`}
								/>
							</div>
						</li>
					)}
				</ul>
			</CollapsibleCard>
		</section>
	);
}
