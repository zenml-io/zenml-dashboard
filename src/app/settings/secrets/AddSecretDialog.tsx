import EyeIcon from "@/assets/icons/eye.svg?react";
import Plus from "@/assets/icons/plus.svg?react";
import Trash from "@/assets/icons/trash.svg?react";
import { useCreateSecretMutation } from "@/data/secrets/create-secret-query";
import { isFetchError } from "@/lib/fetch-error";
import { Workspace } from "@/types/workspaces";
import { zodResolver } from "@hookform/resolvers/zod";
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
	useToast
} from "@zenml-io/react-component-library";
import { useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { secretFormSchema, SecretFormType } from "./form-schema";

export function AddSecretDialog({ id, workspace }: { id: string; workspace: Workspace }) {
	const [open, setOpen] = useState(false);

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button className="shrink-0" intent="primary">
					Add secret
				</Button>
			</DialogTrigger>
			<DialogContent className="mx-auto w-[90vw] max-w-[744px]">
				<DialogHeader>
					<DialogTitle>Register New Secret</DialogTitle>
				</DialogHeader>
				<AddSecret userId={id} setOpen={setOpen} workspaceId={workspace.id} />
			</DialogContent>
		</Dialog>
	);
}

export function AddSecret({
	userId,
	setOpen,
	workspaceId
}: {
	userId: string;
	setOpen: (open: boolean) => void;
	workspaceId: string;
}) {
	const {
		handleSubmit,
		control,
		watch,
		setValue,
		formState: { isValid },
		reset
	} = useForm<SecretFormType>({
		resolver: zodResolver(secretFormSchema),
		defaultValues: {
			secretName: "",
			keysValues: [{ key: "", value: "" }]
		}
	});

	const { fields, append, remove } = useFieldArray({
		control,
		name: "keysValues"
	});

	const { toast } = useToast();
	const queryClient = useQueryClient();
	const { mutate } = useCreateSecretMutation({
		onError(error) {
			if (isFetchError(error)) {
				toast({
					status: "error",
					emphasis: "subtle",
					description: error.message,
					rounded: true
				});
			}
		},
		onSuccess() {
			queryClient.invalidateQueries({ queryKey: ["secrets"] });
			setOpen(false);
			reset();
		}
	});

	const postSecret = (data: SecretFormType) => {
		mutate({
			user: userId,
			workspace: workspaceId,
			name: data.secretName,
			scope: "workspace",
			values: data.keysValues.reduce(
				(acc, pair) => {
					if (pair.key && pair.value) acc[pair.key] = pair.value;
					return acc;
				},
				{} as Record<string, string>
			)
		});
	};

	const onSubmit = (data: SecretFormType) => {
		postSecret(data);
	};

	return (
		<>
			<form id="create-secret-form" className="gap-5 p-5" onSubmit={handleSubmit(onSubmit)}>
				<div className="space-y-1">
					<div className="space-y-0.5">
						<label className="font-inter text-sm text-left font-medium leading-5">
							Secret Name
							<span className="ml-1 text-theme-text-error">*</span>
						</label>
						<Controller
							name="secretName"
							control={control}
							render={({ field }) => <Input {...field} className="mb-3 w-full" required />}
						/>
					</div>
					<div className="mt-10">
						<div>
							<h1 className="font-inter text-lg text-left font-semibold ">Keys</h1>
						</div>
						<div className="mt-5 flex flex-row ">
							<div className="flex-grow">
								<label className="font-inter text-sm text-left font-medium">Key</label>
							</div>
							<div className="flex-grow pr-12">
								<label className="font-inter text-sm text-left font-medium">Value</label>
							</div>
						</div>
					</div>

					{fields.map((field, index) => (
						<div key={field.id} className="flex flex-row items-center space-x-1 ">
							<div className="relative flex-grow ">
								<Controller
									name={`keysValues.${index}.key`}
									control={control}
									render={({ field }) => (
										<Input {...field} className="mb-2 w-full" required placeholder="key" />
									)}
								/>
							</div>
							<div className="relative flex-grow">
								<div className="relative">
									<Controller
										name={`keysValues.${index}.value`}
										control={control}
										render={({ field }) => (
											<Input
												{...field}
												className="mb-2 w-full pr-10"
												required
												placeholder="•••••••••"
												type={watch(`keysValues.${index}.showPassword`) ? "text" : "password"}
											/>
										)}
									/>
									<div
										onClick={() => {
											const showPassword = watch(`keysValues.${index}.showPassword`);
											setValue(`keysValues.${index}.showPassword`, !showPassword);
										}}
										className="absolute inset-y-1 right-0 flex cursor-pointer items-center pb-1 pr-3"
									>
										<EyeIcon className="h-4 w-4 flex-shrink-0 cursor-pointer" />
									</div>
								</div>
							</div>
							<div className="flex items-center">
								{index === fields.length - 1 && (
									<Button
										intent="primary"
										emphasis="subtle"
										onClick={() => append({ key: "", value: "" })}
										className="mb-2 flex h-7 w-7 items-center justify-center"
									>
										<Plus className="flex-shrink-0 fill-primary-600" />
									</Button>
								)}
								{index !== fields.length - 1 && (
									<Button
										intent="secondary"
										emphasis="minimal"
										onClick={() => remove(index)}
										className="mb-2 h-7 w-7 items-center justify-center"
									>
										<Trash className="flex-shrink-0 fill-theme-text-secondary" />
									</Button>
								)}
							</div>
						</div>
					))}
				</div>
			</form>
			<DialogFooter className="gap-[10px]">
				<DialogClose asChild>
					<Button size="sm" intent="secondary">
						Cancel
					</Button>
				</DialogClose>
				<Button intent="primary" disabled={!isValid} type="submit" form="create-secret-form">
					Register Secret
				</Button>
			</DialogFooter>
		</>
	);
}
