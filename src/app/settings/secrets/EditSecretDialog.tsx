import EyeIcon from "@/assets/icons/eye.svg?react";
import Plus from "@/assets/icons/plus.svg?react";
import Trash from "@/assets/icons/trash.svg?react";
import { secretQueries } from "@/data/secrets";
import { useUpdateSecret } from "@/data/secrets/update-secret-query";
import { isFetchError } from "@/lib/fetch-error";
import { UpdateSecret } from "@/types/secret";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
	Button,
	DialogClose,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	Input,
	useToast
} from "@zenml-io/react-component-library";
import { useEffect } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { secretFormSchema, SecretFormType } from "./form-schema";

interface EditSecretDialogProps {
	secretId: string;
	isSecretNameEditable: boolean;
	dialogTitle: string;
}

export function EditSecretDialog({
	secretId,
	isSecretNameEditable,
	dialogTitle
}: EditSecretDialogProps) {
	return (
		<DialogContent className="mx-auto w-[90vw] max-w-[744px]">
			<DialogHeader>
				<DialogTitle>{dialogTitle}</DialogTitle>
			</DialogHeader>
			<EditSecret secretId={secretId} isSecretNameEditable={isSecretNameEditable} />
		</DialogContent>
	);
}

interface EditSecretProps {
	secretId: string;
	isSecretNameEditable: boolean;
}

export function EditSecret({ secretId, isSecretNameEditable }: EditSecretProps) {
	const {
		data: secretDetail,
		isLoading,
		isError
	} = useQuery({ ...secretQueries.secretDetail(secretId) });

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
				Object.entries(secretDetail.body?.values || {}).map(([key, value]) => ({
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
			toast({
				status: "success",
				emphasis: "subtle",
				description: "Secret updated successfull",
				rounded: true
			});
			queryClient.invalidateQueries({ queryKey: ["secrets"] });
			queryClient.invalidateQueries({ queryKey: ["secretDetail", secretId] });
		}
	});

	const onSubmit = (data: SecretFormType) => {
		const updatedSecretData: UpdateSecret = {
			name: data.secretName,
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
									<button
										type="button"
										onClick={() => togglePasswordVisibility(index)}
										className="absolute inset-y-1 right-0 flex items-center pb-1 pr-3"
									>
										<EyeIcon className="h-4 w-4 flex-shrink-0" />
									</button>
								</div>
							</div>
							<div className="flex items-center">
								{index === fields.length - 1 && (
									<Button
										type="button"
										intent="primary"
										emphasis="subtle"
										onClick={addKeyValuePair}
										className="mb-2 flex h-7 w-7 items-center justify-center"
									>
										<Plus className="flex-shrink-0 fill-primary-600" />
									</Button>
								)}
								{index !== fields.length - 1 && (
									<Button
										type="button"
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
					{fields.length === 0 && (
						<Button
							type="button"
							intent="primary"
							emphasis="subtle"
							onClick={addKeyValuePair}
							className="mb-2 flex h-7 w-7 items-center justify-center"
						>
							<Plus className="flex-shrink-0 fill-primary-600" />
						</Button>
					)}
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
