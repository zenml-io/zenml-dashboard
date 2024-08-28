import { useSurveyContext } from "@/components/survey/SurveyContext";
import { UsageReasonForm } from "@/components/survey/UsageReason";
import { UsageReasonFormType } from "@/components/survey/form-schemas";
import { UserMetadata } from "@/types/user";
import { useSurveyUserContext } from "./SurveyUserContext";

export function UsageReasonStep() {
	const { setSurveyStep } = useSurveyContext();
	const { setUser } = useSurveyUserContext();

	function handleUsageReasonSubmit({
		usageReason,
		comparison_tools,
		otherTool,
		otherToolVal
	}: UsageReasonFormType) {
		const metadata: UserMetadata = {
			usage_reason: usageReason,
			...(!!comparison_tools && {
				comparing_tools:
					!!otherTool && !!otherToolVal ? [...comparison_tools, otherToolVal] : comparison_tools
			})
		};
		setUser((prev) => ({
			...prev,
			user_metadata: { ...prev.user_metadata, ...metadata }
		}));
		setSurveyStep((prev) => prev + 1);
	}

	return <UsageReasonForm submitHandler={handleUsageReasonSubmit} />;
}
