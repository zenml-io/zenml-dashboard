import AlertCircle from "@/assets/icons/alert-circle.svg?react";
import { useUpdateCurrentUserMutation } from "@/data/users/update-current-user-mutation";
import { isFetchError } from "@/lib/fetch-error";
import { UpdateUser, User } from "@/types/user";
import { useQueryClient } from "@tanstack/react-query";
import { Button, Input, useToast } from "@zenml-io/react-component-library";
import { useId } from "react";
import { useForm } from "react-hook-form";
import { UpdatePasswordDialog } from "./UpdatePassword/UpdatePasswordDialog";
import { UpdateProfileForm as UpdateProfileFormType } from "./UpdateProfileSchema";

type Props = {
	user: User;
};

export function UpdateProfileForm({ user }: Props) {
	const queryclient = useQueryClient();
	const { toast } = useToast();
	const fullNameId = useId();
	const usernameId = useId();

	const { isPending, mutate } = useUpdateCurrentUserMutation({
		onError(error) {
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
			queryclient.invalidateQueries({ queryKey: ["current-user"] });
			queryclient.invalidateQueries({ queryKey: ["users"] });
			reset();
			toast({
				status: "success",
				emphasis: "subtle",
				rounded: true,
				description: "User updated successfully"
			});
		}
	});

	const { register, reset, handleSubmit, watch } = useForm<UpdateProfileFormType>();

	function updateUser(data: UpdateProfileFormType) {
		// As this is a put, we need to filter out the empty values
		const body: UpdateUser = {
			...(data.fullName && { full_name: data.fullName }),
			...(data.username && { name: data.username })
		};

		mutate(body);
	}

	return (
		<div className="w-full max-w-[600px]">
			<form onSubmit={handleSubmit(updateUser)}>
				<div className="space-y-2">
					<div className="space-y-0.5">
						<label htmlFor={fullNameId} className="text-text-sm">
							Full Name
						</label>
						<Input
							placeholder={user.body?.full_name}
							{...register("fullName")}
							id={fullNameId}
							className="w-full"
						/>
					</div>
					<div className="space-y-0.5">
						<label htmlFor={usernameId} className="text-text-sm">
							Username
						</label>
						<Input
							{...register("username")}
							placeholder={user.name}
							id={usernameId}
							className="w-full"
						/>
					</div>
					<div className="flex justify-end">
						<Button
							disabled={isPending || (!watch("fullName") && !watch("username"))}
							size="md"
							intent="primary"
						>
							Update
						</Button>
					</div>
				</div>
			</form>
			<UpdatePasswordDialog />
		</div>
	);
}
