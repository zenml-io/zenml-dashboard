import AlertCircle from "@/assets/icons/alert-circle.svg?react";
import { getServerSettingsKey } from "@/data/server/get-server-settings";
import { useUpdateServerSettings } from "@/data/server/update-server-settings-mutation";
import { isFetchError } from "@/lib/fetch-error";
import { ServerSettings } from "@/types/server";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { Switch, useToast } from "@zenml-io/react-component-library";
import { useEffect, useId } from "react";
import { Controller, useForm } from "react-hook-form";
import { NotificationFormSchema, NotificationFormType } from "./form-schema";

type Props = {
	settings: ServerSettings;
};
export function NotificationsForm({ settings }: Props) {
	const announcementsId = useId();
	const updatesId = useId();
	const { toast } = useToast();
	const queryClient = useQueryClient();

	const { mutate } = useUpdateServerSettings({
		onError: (error) => {
			queryClient.invalidateQueries({ queryKey: getServerSettingsKey() });
			if (isFetchError(error)) {
				toast({
					status: "error",
					emphasis: "subtle",
					icon: <AlertCircle className="h-5 w-5 shrink-0 fill-error-700" />,
					description: error.message,
					rounded: true
				});
			}
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: getServerSettingsKey() });
			toast({
				status: "success",
				emphasis: "subtle",
				rounded: true,
				description: "Settings updated successfully"
			});
		}
	});

	const { control, handleSubmit, watch } = useForm<NotificationFormType>({
		resolver: zodResolver(NotificationFormSchema),
		defaultValues: {
			announcements: settings.body?.display_announcements,
			updates: settings.body?.display_updates
		}
	});

	function updateSettings({ announcements, updates }: NotificationFormType) {
		mutate({
			display_announcements: announcements,
			display_updates: updates
		});
	}

	useEffect(() => {
		const subscription = watch(() => handleSubmit(updateSettings)());
		return () => subscription.unsubscribe();
	}, [handleSubmit, watch]);

	return (
		<form id="create-user-form" className="space-y-5">
			<div className="space-y-5">
				<div className="flex items-center gap-5">
					<Controller
						control={control}
						name="announcements"
						render={({ field: { value, onChange, ref } }) => (
							<Switch
								ref={ref}
								checked={value}
								onCheckedChange={(val) => {
									onChange(!!val);
								}}
								id={announcementsId}
							/>
						)}
					/>

					<label htmlFor={announcementsId} className="text-text-md">
						<p className="font-semibold">Announcements</p>
						<p className="text-theme-text-secondary">
							Enable Announcements for important ZenML updates, surveys, and feedback opportunities.
						</p>
					</label>
				</div>
				<hr />
				<div className="flex items-center gap-5">
					<Controller
						control={control}
						name="updates"
						render={({ field: { value, onChange, ref } }) => (
							<Switch
								ref={ref}
								checked={value}
								onCheckedChange={(val) => {
									onChange(!!val);
								}}
								id={updatesId}
							/>
						)}
					/>
					<label htmlFor={updatesId} className="text-text-md">
						<p className="font-semibold">Updates</p>
						<p className="text-theme-text-secondary">
							Activate Updates to receive the latest ZenML news and feature releases.
						</p>
					</label>
				</div>
			</div>
		</form>
	);
}
