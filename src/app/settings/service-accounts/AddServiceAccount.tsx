import { serviceAccountQueryKeys } from "@/data/service-accounts";
import { useCreateApiKey } from "@/data/service-accounts/create-api-key";
import { useCreateServiceAccount } from "@/data/service-accounts/create-service-account";
import { isFetchError } from "@/lib/fetch-error";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import {
	Button,
	Checkbox,
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
import { Dispatch, SetStateAction, useState } from "react";
import { Controller, FormProvider, useForm, useFormContext } from "react-hook-form";
import { CreateServiceAccountForm, createServiceAccountFormSchema } from "./form-schema";
import { ApiKeySuccess } from "./[service-account-id]/Success";

export function AddServiceAccountDialog({ isFallback }: { isFallback: boolean }) {
	const [open, setOpen] = useState(false);
	const [apikeyValue, setApiKeyValue] = useState("");
	const queryClient = useQueryClient();

	const form = useForm<CreateServiceAccountForm>({
		resolver: zodResolver(createServiceAccountFormSchema),
		defaultValues: {
			name: "",
			description: "",
			createDefault: false
		}
	});

	const isSuccess = !!apikeyValue && form.watch("createDefault");

	function renderDialogContent() {
		if (isSuccess) return <ApiKeySuccess value={apikeyValue} />;
		return (
			<AddServiceAccountForm
				isFallback={isFallback}
				setApiKeyValue={setApiKeyValue}
				setOpen={setOpen}
			/>
		);
	}

	return (
		<FormProvider {...form}>
			<Dialog
				open={open}
				onOpenChange={(b) => {
					// some hack to not invalidate until the user closes it, so the modal stays open and doesnt get destroyed
					if (isFallback && !b)
						queryClient.invalidateQueries({
							queryKey: serviceAccountQueryKeys.serviceAccountsKey()
						});
					setOpen(b);
					setApiKeyValue("");
					form.reset();
				}}
			>
				<DialogTrigger asChild>
					<Button className="shrink-0" size="sm" intent="primary">
						Add service account
					</Button>
				</DialogTrigger>
				<DialogContent
					data-success={isSuccess}
					className="mx-auto overflow-x-auto transition-none data-[success=true]:max-w-[800px]"
				>
					<DialogHeader>
						<DialogTitle>Add service account</DialogTitle>
					</DialogHeader>
					{renderDialogContent()}
				</DialogContent>
			</Dialog>
		</FormProvider>
	);
}

type FormProps = {
	setOpen: Dispatch<SetStateAction<boolean>>;
	setApiKeyValue: Dispatch<SetStateAction<string>>;
	isFallback: boolean;
};
export function AddServiceAccountForm({ setApiKeyValue, setOpen, isFallback }: FormProps) {
	const {
		watch,
		handleSubmit,
		control,
		formState: { isValid }
	} = useFormContext<CreateServiceAccountForm>();
	const { toast } = useToast();
	const queryClient = useQueryClient();

	const { mutate } = useCreateServiceAccount({
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
		async onSuccess(data) {
			toast({
				description: "The service account has been added successfully.",
				status: "success",
				emphasis: "subtle",
				rounded: true
			});
			if (watch("createDefault")) {
				postApiKey(data.id);
				return;
			}
			queryClient.invalidateQueries({
				queryKey: serviceAccountQueryKeys.serviceAccountsKey()
			});
			setOpen(false);
		}
	});

	const { mutate: postApi } = useCreateApiKey({
		onSuccess(data) {
			if (!isFallback)
				queryClient.invalidateQueries({
					queryKey: serviceAccountQueryKeys.serviceAccountsKey()
				});
			setApiKeyValue(data.body?.key || "");
		},
		onError(error) {
			if (isFetchError(error)) {
				toast({
					status: "error",
					emphasis: "subtle",
					description: error.message,
					rounded: true
				});
			}
		}
	});

	const postApiKey = (serviceAccountI: string) => {
		postApi({
			serviceAccountId: serviceAccountI, // replace with actual ID or variable
			body: {
				name: "default",
				description: "Default api key"
			}
		});
	};

	const onSubmit = (data: CreateServiceAccountForm) => {
		mutate({
			name: data.name,
			description: data.description,
			active: true
		});
	};

	return (
		<>
			<form id="create-secret-form" className="space-y-5 p-7" onSubmit={handleSubmit(onSubmit)}>
				<div className="space-y-0.5">
					<label className="font-inter text-sm text-left font-medium leading-5">Name:</label>
					<Controller
						name="name"
						control={control}
						render={({ field }) => (
							<Input {...field} className="w-full" required placeholder="Add name" />
						)}
					/>
				</div>
				<div className="space-y-0.5">
					<label className="font-inter text-sm text-left font-medium leading-5">Description:</label>
					<Controller
						name="description"
						control={control}
						render={({ field }) => (
							<Input {...field} className="w-full" placeholder="Add description" />
						)}
					/>
				</div>
				<div className="flex flex-col">
					<div className="flex items-center gap-2">
						<Controller
							control={control}
							name="createDefault"
							render={({ field: { onChange, value } }) => (
								<Checkbox
									checked={value}
									id="default-key"
									onCheckedChange={(val) => onChange(!!val)}
								/>
							)}
						/>
						<label htmlFor="default-key">Create a default API Key</label>
					</div>
					<p className="pl-[30px] text-text-xs text-theme-text-secondary">
						This will include a default API Key for your service account.
					</p>
				</div>
			</form>
			<DialogFooter className="gap-[10px]">
				<DialogClose asChild>
					<Button size="sm" intent="secondary">
						Cancel
					</Button>
				</DialogClose>
				<Button
					intent="primary"
					size="sm"
					disabled={!isValid}
					type="submit"
					form="create-secret-form"
				>
					Add service account
				</Button>
			</DialogFooter>
		</>
	);
}
