import { Codesnippet } from "@/components/CodeSnippet";
import { useCreateUserMutation } from "@/data/users/create-user-mutation";
import { isFetchError } from "@/lib/fetch-error";
import { User } from "@/types/user";
import { useQueryClient } from "@tanstack/react-query";
import {
	Button,
	Dialog,
	DialogClose,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
	Input,
	Switch,
	useToast
} from "@zenml-io/react-component-library";
import { useId, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { getActivationToken } from "@/lib/user";
import { Icon } from "@/components/Icon";

export function AddMemberDialog() {
	const [open, setOpen] = useState(false);
	const [successMember, setSuccessMember] = useState<User | null>(null);

	return (
		<Dialog
			open={open}
			onOpenChange={(val) => {
				setOpen(val);
				setSuccessMember(null);
			}}
		>
			<DialogTrigger asChild>
				<Button className="shrink-0" intent="primary">
					Add Member
				</Button>
			</DialogTrigger>
			<DialogContent className="">
				<DialogHeader>
					<DialogTitle> Add a New Member</DialogTitle>
				</DialogHeader>
				{successMember ? (
					<SuccessAddMember name={successMember.name} token={getActivationToken(successMember)} />
				) : (
					<AddMemberForm setSuccessMember={setSuccessMember} />
				)}
			</DialogContent>
		</Dialog>
	);
}

const CreateUserFormSchema = z.object({
	username: z.string(),
	isAdmin: z.boolean()
});
type CreateUserForm = z.infer<typeof CreateUserFormSchema>;
type AddMemberFormProps = {
	setSuccessMember: (user: User) => void;
};
function AddMemberForm({ setSuccessMember }: AddMemberFormProps) {
	const { toast } = useToast();
	const queryClient = useQueryClient();
	const { mutate, isPending } = useCreateUserMutation({
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
		onSuccess(data) {
			setSuccessMember(data);
			queryClient.invalidateQueries({ queryKey: ["users"] });
		}
	});
	const usernameId = useId();
	const isAdminId = useId();
	const { register, handleSubmit, watch, setValue } = useForm<CreateUserForm>();

	function createUser(data: CreateUserForm) {
		mutate({ is_admin: data.isAdmin, name: data.username });
	}

	return (
		<>
			<form id="create-user-form" onSubmit={handleSubmit(createUser)} className="space-y-5 p-7">
				<div className="space-y-5">
					<div className="space-y-0.5">
						<label htmlFor={usernameId} className="text-text-sm">
							Username
						</label>
						<Input {...register("username")} id={usernameId} className="w-full" />
					</div>
					<div className="flex gap-5">
						<label htmlFor={isAdminId} className="text-text-md">
							Add user as an Admin
						</label>
						<Switch
							onCheckedChange={(val) => setValue("isAdmin", !!val)}
							{...register("isAdmin", { value: false })}
							id={isAdminId}
						/>
					</div>
				</div>
			</form>
			<DialogFooter className="gap-[10px]">
				<DialogClose asChild>
					<Button size="sm" intent="secondary">
						Cancel
					</Button>
				</DialogClose>
				<Button disabled={!watch("username") || isPending} form="create-user-form" size="sm">
					Generate Token
				</Button>
			</DialogFooter>
		</>
	);
}

function SuccessAddMember({ token, name }: { token: string; name: string }) {
	return (
		<div className="space-y-5 overflow-hidden p-7 text-center">
			<Icon name="user-plus" className="m-auto mb-5 h-[110px] w-[110px] fill-success-500" />
			<div className="space-y-1">
				<p className="text-text-lg font-semibold text-theme-text-primary">{`The user ${name} was created successfully!`}</p>
				<p className="text-text-md text-theme-text-secondary">
					Share the invitation link with the user to complete the registration.
				</p>
			</div>
			<Codesnippet className="mx-auto" code={token} />
		</div>
	);
}
