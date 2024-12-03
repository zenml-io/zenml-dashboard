import { serviceAccountQueryKeys } from "@/data/service-accounts";
import { useCreateApiKey } from "@/data/service-accounts/create-api-key";
import { isFetchError } from "@/lib/fetch-error";
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
import { Dispatch, SetStateAction, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { serviceAccountFormSchema, ServiceAccountFormType } from "../form-schema";
import { ApiKeySuccess } from "./Success";

export function AddApiKeyDialog({
	serviceAccountId,
	isFallback
}: {
	serviceAccountId: string;
	isFallback: boolean;
}) {
	const queryClient = useQueryClient();
	const [open, setOpen] = useState(false);
	const [apikeyValue, setApikeyValue] = useState("");

	const isSuccess = !!apikeyValue;

	function renderDialogContent() {
		if (isSuccess) return <ApiKeySuccess value={apikeyValue} />;
		return (
			<CreateApiKeyForm
				isFallback={isFallback}
				serviceAccountId={serviceAccountId}
				setApikeyValue={setApikeyValue}
			/>
		);
	}

	return (
		<>
			<Dialog
				open={open}
				onOpenChange={(b) => {
					if (isFallback && !b)
						queryClient.invalidateQueries({
							queryKey: serviceAccountQueryKeys.apiKeysKey(serviceAccountId)
						});
					setOpen(b);
					setApikeyValue("");
				}}
			>
				<DialogTrigger asChild>
					<Button className="shrink-0" intent="primary" size="sm">
						Generate API Key
					</Button>
				</DialogTrigger>
				<DialogContent
					data-success={isSuccess}
					className="mx-auto overflow-x-auto transition-none data-[success=true]:max-w-[800px]"
				>
					<DialogHeader>
						<DialogTitle>
							{isSuccess ? "API Key Created Successfully" : "Generate API Key"}
						</DialogTitle>
					</DialogHeader>
					{renderDialogContent()}
				</DialogContent>
			</Dialog>
		</>
	);
}

type FormProps = {
	serviceAccountId: string;
	setApikeyValue: Dispatch<SetStateAction<string>>;
	isFallback: boolean;
};
function CreateApiKeyForm({ serviceAccountId, setApikeyValue, isFallback }: FormProps) {
	const { toast } = useToast();
	const queryClient = useQueryClient();
	const {
		handleSubmit,
		control,
		formState: { isValid },
		reset
	} = useForm<ServiceAccountFormType>({
		resolver: zodResolver(serviceAccountFormSchema),
		defaultValues: {
			name: "",
			description: ""
		}
	});

	const { mutate } = useCreateApiKey({
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
		onSuccess(data) {
			if (!isFallback) {
				queryClient.invalidateQueries({
					queryKey: serviceAccountQueryKeys.apiKeysKey(serviceAccountId)
				});
			}

			setApikeyValue(data.body?.key || "");
			reset();
		}
	});

	function handleCreateApiKey(data: ServiceAccountFormType) {
		mutate({
			serviceAccountId: serviceAccountId, // replace with actual ID or variable
			body: {
				name: data.name,
				description: data.description
			}
		});
	}
	return (
		<>
			<form
				id="create-secret-form"
				className="space-y-5 p-7"
				onSubmit={handleSubmit(handleCreateApiKey)}
			>
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
			</form>
			<DialogFooter className="gap-[10px]">
				<DialogClose asChild>
					<Button size="sm" intent="secondary">
						Cancel
					</Button>
				</DialogClose>
				<Button intent="primary" disabled={!isValid} type="submit" form="create-secret-form">
					Generate Key
				</Button>
			</DialogFooter>
		</>
	);
}
