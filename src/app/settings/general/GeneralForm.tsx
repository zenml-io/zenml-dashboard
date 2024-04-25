import { Icon } from "@/components/Icon";
import { getServerSettingsKey, useServerSettings } from "@/data/server/get-server-settings";
import { useUpdateServerSettings } from "@/data/server/update-server-settings-mutation";
import { isFetchError } from "@/lib/fetch-error";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { Button, Input, Skeleton, useToast } from "@zenml-io/react-component-library";
import { useId } from "react";
import { useForm } from "react-hook-form";
import { GeneralFormType, generalFormSchema } from "./GeneralFormSchema";

export function GeneralForm() {
	const serverNameId = useId();
	const { toast } = useToast();
	const queryclient = useQueryClient();

	const { isError, isPending, data } = useServerSettings({ throwOnError: true });

	const { mutate, isPending: isMutationPending } = useUpdateServerSettings({
		onError(error) {
			if (isFetchError(error)) {
				toast({
					status: "error",
					emphasis: "subtle",
					icon: <Icon name="alert-circle" className="h-5 w-5 shrink-0 fill-error-700" />,
					description: error.message,
					rounded: true
				});
			}
		},
		onSuccess: async () => {
			await queryclient.invalidateQueries({ queryKey: getServerSettingsKey() });
			toast({
				status: "success",
				emphasis: "subtle",
				rounded: true,
				description: "Server Settings updated successfully"
			});
			reset();
		}
	});

	const {
		handleSubmit,
		register,
		reset,
		formState: { isValid }
	} = useForm<GeneralFormType>({
		resolver: zodResolver(generalFormSchema)
	});

	function updateServerSettings(data: GeneralFormType) {
		mutate({ server_name: data.serverName });
	}

	if (isError) return null;
	if (isPending) return <Skeleton className="h-[150px] max-w-[600px]" />;

	return (
		<div className="w-full max-w-[600px]">
			<form className="space-y-2" onSubmit={handleSubmit(updateServerSettings)}>
				<div className="space-y-2">
					<div className="space-y-0.5">
						<label htmlFor={serverNameId} className="text-text-sm">
							Server Name
						</label>
						<Input
							placeholder={data.body?.server_name}
							{...register("serverName")}
							id={serverNameId}
							className="w-full"
						/>
					</div>
				</div>
				<div className="flex justify-end">
					<Button disabled={isMutationPending || !isValid} size="md" intent="primary">
						Update
					</Button>
				</div>
			</form>
		</div>
	);
}
