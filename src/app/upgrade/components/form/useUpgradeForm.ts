import { fetcher } from "@/data/fetch";
import { analyticsServerUrl } from "@/lib/analytics";
import { TrackEvent } from "@/types/analytics";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
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

	const submitFormMutation = useMutation({
		mutationFn: submitUpgradeForm,
		onSuccess: () => setSubmitSuccess(true),
		onError: (e) => {
			toast({
				emphasis: "subtle",
				status: "error",
				rounded: true,
				description: e.message
			});
		}
	});

	async function handleSubmitForm(data: UpgradeForm, userId: string, isDebug: boolean) {
		submitFormMutation.mutate({
			...data,
			userId,
			isDebug
		});
	}
	return { form, submitFormMutation, handleSubmitForm };
}

async function submitUpgradeForm({
	company,
	email,
	isDebug,
	name,
	userId
}: UpgradeForm & { isDebug: boolean; userId: string }) {
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
	return fetcher(analyticsServerUrl, {
		method: "POST",
		credentials: "omit",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify([trackEvent])
	});
}
