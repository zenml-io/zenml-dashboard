import { useAnalyticsEvent } from "@/data/analytics/event";
import { TrackEvent } from "@/types/analytics";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@zenml-io/react-component-library";
import { useForm } from "react-hook-form";
import { useUpgradeContext } from "../Context";
import { UpgradeForm, upgradeFormSchema } from "./schema";

export function useUpgradeForm() {
	const { setSubmitSuccess } = useUpgradeContext();
	const { toast } = useToast();
	const form = useForm<UpgradeForm>({
		resolver: zodResolver(upgradeFormSchema),
		defaultValues: {
			company: "",
			email: "",
			name: ""
		}
	});

	const submitFormMutation = useAnalyticsEvent({
		onSuccess: () => setSubmitSuccess(true),
		onError: (e) => {
			if (e instanceof Error) {
				toast({
					emphasis: "subtle",
					status: "error",
					rounded: true,
					description: e.message
				});
			}
		}
	});

	async function handleSubmitForm(
		{ company, email, name }: UpgradeForm,
		userId: string,
		isDebug: boolean
	) {
		const trackEvent: TrackEvent = {
			debug: isDebug,
			event: "Upgrade initiated",
			type: "track",
			user_id: userId,
			properties: {
				company,
				email,
				name
			}
		};

		submitFormMutation.mutate(trackEvent);
	}
	return { form, submitFormMutation, handleSubmitForm };
}
