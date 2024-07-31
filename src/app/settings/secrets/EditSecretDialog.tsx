import { useEffect } from "react";
import {
	Button,
	Dialog,
	DialogClose,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	Input,
	useToast
} from "@zenml-io/react-component-library";
import PlusIcon from "@/assets/icons/secret-add.svg?react";
import DeleteIcon from "@/assets/icons/secret-delete.svg?react";
import EyeIcon from "@/assets/icons/eye.svg?react";
import { useQueryClient } from "@tanstack/react-query";
import { useUpdateSecret } from "@/data/secrets/update-secret-query";
import { isFetchError } from "@/lib/fetch-error";
import { useGetSecretDetail } from "@/data/secrets/get-secret-detail";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { secretFormSchema, SecretFormType } from "./form-schema";
import { UpdateSecret } from "@/types/secret";

interface EditSecretDialogProps {
	secretId: string;
	isOpen: boolean;
	onClose: () => void;
	isSecretNameEditable: boolean;
	dialogTitle: string;
}

export function EditSecretDialog({
	secretId,
	isOpen,
	onClose,
	isSecretNameEditable,
	dialogTitle
}: EditSecretDialogProps) {
	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className="mx-auto w-[90vw] max-w-[744px]">
				<DialogHeader>
					<DialogTitle>{dialogTitle}</DialogTitle>
				</DialogHeader>
				<EditSecret
					secretId={secretId}
					onClose={onClose}
					isSecretNameEditable={isSecretNameEditable}
				/>
			</DialogContent>
		</Dialog>
	);
}

interface EditSecretProps {
	secretId: string;
	onClose: () => void;
	isSecretNameEditable: boolean;
}

export function EditSecret({ secretId, onClose, isSecretNameEditable }: EditSecretProps) {
	const { data: secretDetail, isLoading, isError } = useGetSecretDetail(secretId);

	const {
		handleSubmit,
		control,
		setValue,
		watch,
		formState: { isValid }
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

	useEffect(() => {
		if (secretDetail) {
			setValue("secretName", secretDetail.name);
			setValue(
				"keysValues",
				Object.entries(secretDetail.body.values || {}).map(([key, value]) => ({
					key,
					value: String(value)
				}))
			);
		}
	}, [secretDetail, setValue]);

	const addKeyValuePair = () => {
		append({ key: "", value: "", showPassword: false });
	};

	const { toast } = useToast();
	const queryClient = useQueryClient();
	const { mutate } = useUpdateSecret({
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
			queryClient.invalidateQueries({ queryKey: ["secretDetail", secretId] });
			onClose();
		}
	});

	const onSubmit = (data: SecretFormType) => {
		const updatedSecretData: UpdateSecret = {
			name: data.secretName,
			scope: "workspace",
			values: data.keysValues.reduce(
				(acc, pair) => {
					if (pair.key && pair.value) acc[pair.key] = pair.value;
					return acc;
				},
				{} as Record<string, string>
			)
		};
		mutate({ id: secretId, body: updatedSecretData });
	};

	const togglePasswordVisibility = (index: number) => {
		const currentValue = watch(`keysValues.${index}.showPassword`);
		setValue(`keysValues.${index}.showPassword`, !currentValue);
	};

	if (isLoading) return <p>Loading...</p>;
	if (isError) return <p>Error fetching secret details.</p>;

	return (
		<>
			<form id="edit-secret-form" className="gap-5 p-5" onSubmit={handleSubmit(onSubmit)}>
				<div className="space-y-0.5">
					<div className="space-y-0.5">
						<label className="font-inter text-sm text-left font-medium leading-5">
							Secret Name
							<span className="ml-1 text-theme-text-error">*</span>
						</label>
						<Controller
							name="secretName"
							control={control}
							render={({ field }) => (
								<Input
									{...field}
									className="mb-3 w-full"
									required
									disabled={!isSecretNameEditable}
								/>
							)}
						/>
					</div>
					<div className="mt-10">
						<div>
							<h1 className="font-inter text-lg text-left font-semibold">Keys</h1>
						</div>
						<div className="mt-5 flex flex-row">
							<div className="flex-grow">
								<label className="font-inter text-sm text-left font-medium">Key</label>
							</div>
							<div className="flex-grow pr-12">
								<label className="font-inter text-sm text-left font-medium">Value</label>
							</div>
						</div>
					</div>
					{fields.map((field, index) => (
						<div key={field.id} className="flex flex-row items-center space-x-1">
							<div className="relative flex-grow">
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
										onClick={() => togglePasswordVisibility(index)}
										className="absolute inset-y-1 right-0 flex cursor-pointer items-center pb-1 pr-3"
									>
										<EyeIcon className="h-4 w-4 flex-shrink-0 cursor-pointer" />
									</div>
								</div>
							</div>
							<div className="flex items-center">
								{index === fields.length - 1 && (
									<div onClick={addKeyValuePair} className="mb-2 ml-2">
										<PlusIcon className="h-7 w-7 flex-shrink-0 cursor-pointer" />
									</div>
								)}
								{index !== fields.length - 1 && (
									<div onClick={() => remove(index)} className="mb-2 ml-2">
										<DeleteIcon />
									</div>
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
				<Button intent="primary" type="submit" form="edit-secret-form" disabled={!isValid}>
					Save Secret
				</Button>
			</DialogFooter>
		</>
	);
}
