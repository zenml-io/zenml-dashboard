"use client";

import Pin from "@/assets/icons/pin-01.svg?react";
import { getCurrentUserKey, useCurrentUser } from "@/data/users/current-user-query";
import { useUpdateCurrentUserMutation } from "@/data/users/update-current-user-mutation";
import { useQueryClient } from "@tanstack/react-query";
import { Skeleton } from "@zenml-io/react-component-library";
import { DropdownMenuItem } from "@zenml-io/react-component-library/components/client";

type Props = {
	projectId: string;
};

export function DefaultProjectHandler({ projectId }: Props) {
	const currentUserQuery = useCurrentUser();
	if (currentUserQuery.isPending || currentUserQuery.isError)
		return (
			<>
				<Skeleton className="h-[44px] w-full" />
				<div aria-hidden="true" className="my-1 h-[1px] bg-theme-border-moderate"></div>
			</>
		);

	const defaultProjectId = currentUserQuery.data.body?.default_project_id;
	const isDefaultProject = defaultProjectId === projectId;
	const userId = currentUserQuery.data.id;

	if (isDefaultProject) return <ProjectSetter userId={userId} />;

	return <ProjectSetter projectId={projectId} userId={userId} />;
}

type SetterProps = {
	projectId?: string;
	userId: string;
};

function ProjectSetter({ projectId }: SetterProps) {
	const queryClient = useQueryClient();

	const { mutate: updateCurrentUser, isPending } = useUpdateCurrentUserMutation({
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: getCurrentUserKey() });
		}
	});

	return (
		<DropdownMenuItem
			onSelect={() => {
				updateCurrentUser({
					default_project_id: projectId || null
				});
			}}
			disabled={isPending}
			className="hover:cursor-pointer"
			icon={<Pin />}
		>
			{projectId ? "Set as default" : "Unset as default"}
		</DropdownMenuItem>
	);
}
