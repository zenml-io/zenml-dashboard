import { ServerNameForm } from "@/components/survey/ServerName";
import { ServerNameFormType } from "@/components/survey/form-schemas";
import { useUpdateServerSettings } from "@/data/server/update-server-settings-mutation";
import { useNavigate } from "react-router-dom";

export function ServerNameStep() {
	const navigate = useNavigate();
	const { mutate: mutateServerSettings } = useUpdateServerSettings({
		onSuccess: () => {
			navigate("/");
		}
	});

	function handleServerNameFormSubmit({ serverName }: ServerNameFormType) {
		mutateServerSettings({ name: serverName });
	}

	return <ServerNameForm submitHandler={handleServerNameFormSubmit} />;
}
