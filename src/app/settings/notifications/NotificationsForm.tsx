import AlertCircle from "@/assets/icons/alert-circle.svg?react";
import { getServerSettingsKey } from "@/data/server/get-server-settings";
import { useUpdateServerSettings } from "@/data/server/update-server-settings-mutation";
import { isFetchError } from "@/lib/fetch-error";
import { ServerSettings } from "@/types/server";
import { useQueryClient } from "@tanstack/react-query";
import { Switch, useToast } from "@zenml-io/react-component-library";
import { useId } from "react";

type Props = {
	settings: ServerSettings;
};

export function NotificationsForm({ settings }: Props) {
	const announcementsId = useId();
	const updatesId = useId();
	const { toast } = useToast();
	const queryClient = useQueryClient();

	// Get current values directly from the settings prop
	const announcements = settings.body?.display_announcements ?? false;
	const updates = settings.body?.display_updates ?? false;

	const { mutate, isPending } = useUpdateServerSettings({
		onError: (error) => {
			// If there's an error, refetch to get the current state
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
			// Refresh data to get the latest state
			queryClient.invalidateQueries({ queryKey: getServerSettingsKey() });
			toast({
				status: "success",
				emphasis: "subtle",
				rounded: true,
				description: "Settings updated successfully"
			});
		}
	});

	// Handler functions for each toggle
	const handleAnnouncementsChange = (checked: boolean) => {
		// Directly submit the new value to the backend
		mutate({
			display_announcements: checked
		});
	};

	const handleUpdatesChange = (checked: boolean) => {
		// Directly submit the new value to the backend
		mutate({
			display_updates: checked
		});
	};

	return (
		<div className="space-y-5">
			<div className="flex items-center gap-5">
				<Switch
					checked={announcements}
					onCheckedChange={handleAnnouncementsChange}
					id={announcementsId}
					disabled={isPending}
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
				<Switch
					checked={updates}
					onCheckedChange={handleUpdatesChange}
					id={updatesId}
					disabled={isPending}
				/>
				<label htmlFor={updatesId} className="text-text-md">
					<p className="font-semibold">Updates</p>
					<p className="text-theme-text-secondary">
						Activate Updates to receive the latest ZenML news and feature releases.
					</p>
				</label>
			</div>
		</div>
	);
}
