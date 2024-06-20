import AlertCircle from "@/assets/icons/alert-circle.svg?react";
import { ServerNameForm } from "@/components/survey/ServerName";
import { useSurveyContext } from "@/components/survey/SurveyContext";
import { ServerNameFormType } from "@/components/survey/form-schemas";
import { useActivateServer } from "@/data/server/activate-server-mutation";
import { useLoginMutation } from "@/data/session/login-mutation";
import { useToast } from "@zenml-io/react-component-library";
import { useAuthContext } from "../../context/AuthContext";
import { useServerActivationContext } from "./ServerActivationContext";
import { Dispatch, SetStateAction } from "react";

type Props = {
	setUsername: Dispatch<SetStateAction<string>>;
};
export function SetServerNameStep({ setUsername }: Props) {
	const { serverSettings } = useServerActivationContext();
	const { setSurveyStep } = useSurveyContext();

	const { setAuthState } = useAuthContext();
	const { toast } = useToast();

	const { mutate: loginMutate } = useLoginMutation({
		onSuccess: () => {
			setAuthState("true");
			setSurveyStep((prev) => prev + 1);
		}
	});

	const { mutate } = useActivateServer({
		onSuccess: async (data) => {
			setUsername(data.name);
			loginMutate({ username: data.name, password: serverSettings.admin_password ?? undefined });
		},
		onError: (error) => {
			if (error instanceof Error) {
				toast({
					status: "error",
					emphasis: "subtle",
					icon: <AlertCircle className="h-5 w-5 shrink-0 fill-error-700" />,
					description: error.message,
					rounded: true
				});
			}
		}
	});

	function handlePasswordSubmit({ serverName }: ServerNameFormType) {
		mutate({
			...serverSettings,
			server_name: serverName
		});
	}
	return <ServerNameForm submitHandler={handlePasswordSubmit} />;
}
