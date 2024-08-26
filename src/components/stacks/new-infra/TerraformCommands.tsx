import { Codesnippet } from "../../CodeSnippet";
import { Numberbox } from "../../NumberBox";

export function TerraformCommands() {
	return (
		<div className="space-y-5">
			<div className="space-y-1">
				<div className="flex items-center gap-1">
					<Numberbox>3</Numberbox>
					<span className="text-text-lg font-semibold">Run the following commands</span>
				</div>
			</div>
			<div>
				<p className="mb-1 text-text-sm text-theme-text-secondary">
					Initialize the Terraform configuration.
				</p>
				<Codesnippet code="terraform init --upgrade" />
			</div>
			<div>
				<p className="mb-1 text-text-sm text-theme-text-secondary">
					Run terraform apply to deploy the ZenML stack to Azure.
				</p>
				<Codesnippet code="terraform apply" />
			</div>
		</div>
	);
}
