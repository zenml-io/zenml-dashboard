import { useState } from "react";
import { parseWizardData } from "./create/new-infrastructure/persist";
import { parseWizardData as parseTerraform } from "./create/terraform/persist";
import { ResumeStackBanner } from "./ResumeStackBanner";
import { ResumeTerraformBanner } from "./ResumeTerraformBanner";

export function ResumeBanners() {
	const [hasResumeableStack, setResumeableStack] = useState(parseWizardData().success);
	const [hasResumeableTerraform, setResumeableTerraform] = useState<boolean>(
		parseTerraform().success
	);

	if (!hasResumeableStack && !hasResumeableTerraform) return null;

	return (
		<div className="space-y-5">
			{hasResumeableStack && <ResumeStackBanner setHasResumeableStack={setResumeableStack} />}
			{hasResumeableTerraform && (
				<ResumeTerraformBanner setHasResumeableTerraform={setResumeableTerraform} />
			)}
		</div>
	);
}
