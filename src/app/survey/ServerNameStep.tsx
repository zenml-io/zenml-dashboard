import { Icon } from "@/components/Icon";
import { ServerNameForm } from "@/components/survey/ServerName";
import { ServerNameFormType } from "@/components/survey/form-schemas";
import { useUpdateServerSettings } from "@/data/server/update-server-settings-mutation";
import { useToast } from "@zenml-io/react-component-library";
import { useNavigate } from "react-router-dom";

export function ServerNameStep() {
	const navigate = useNavigate();
	const { toast } = useToast();
	const { mutate: mutateServerSettings } = useUpdateServerSettings({
		onSuccess: () => {
			navigate("/");
		},
		onError: (error) => {
			if (error instanceof Error) {
				toast({
					status: "error",
					emphasis: "subtle",
					icon: <Icon name="alert-circle" className="h-5 w-5 shrink-0 fill-error-700" />,
					description: error.message,
					rounded: true
				});
			}
		}
	});

	function handleServerNameFormSubmit({ serverName }: ServerNameFormType) {
		mutateServerSettings({ name: serverName });
	}

	return <ServerNameForm submitHandler={handleServerNameFormSubmit} />;
}
