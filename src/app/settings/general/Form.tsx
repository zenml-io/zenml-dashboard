import { FormEvent, useState } from "react";
import { Button, Input } from "@zenml-io/react-component-library";

type GeneralServerFormProps = {
	server: any;
};

export default function GeneralOrgForm({ server }: GeneralServerFormProps) {
	const [serverName, setServerName] = useState(server.name);
	// const { toast } = useToast();
	const [isLoading, setIsLoading] = useState(false);

	// const router = useRouter();

	async function handleSubmit(e: FormEvent<HTMLFormElement>) {
		// const body: UpdateOrg = {
		// 	name: serverName
		// };
		// e.preventDefault();
		// setIsLoading(true);
		// try {
		// 	await updateOrg(body, org.id);
		// 	setIsLoading(false);
		// 	router.refresh();
		// } catch (e) {
		// 	if (isFetchError(e)) {
		// 		if (e.status === 401) {
		// 			router.replace("/login");
		// 			return;
		// 		}
		// 		if (e.status === 403) {
		// 			toast({
		// 				rounded: true,
		// 				icon: <Info className="h-5 w-5 shrink-0 fill-theme-text-brand" />,
		// 				status: "default",
		// 				emphasis: "subtle",
		// 				description: "You don't have sufficient permissions to perform this action."
		// 			});
		// 			setIsLoading(false);
		// 			return;
		// 		}
		// 	}
		// 	setError(() => {
		// 		throw e;
		// 	});
		// 	setIsLoading(false);
		// }
	}

	return (
		<form onSubmit={(e) => handleSubmit(e)} className="flex w-full max-w-[600px] flex-col ">
			<Input
				onChange={(e) => setServerName(e.target.value)}
				required
				minLength={1}
				value={serverName}
				maxLength={50}
				className="w-full"
				defaultValue={serverName}
			/>

			<div className="flex justify-end">
				<Button disabled={isLoading || serverName.trim() === ""} className="mt-2" variant="primary">
					Update
				</Button>
			</div>
		</form>
	);
}
