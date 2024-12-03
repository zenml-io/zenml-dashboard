import Info from "@/assets/icons/info.svg?react";
import KeyIcon from "@/assets/icons/key-icon.svg?react";
import { InfoBox } from "@/components/Infobox";
import { serviceAccountQueries, serviceAccountQueryKeys } from "@/data/service-accounts";
import { useRotateApiKey } from "@/data/service-accounts/rotate-api-key";
import { isFetchError } from "@/lib/fetch-error";
import { RotateApi } from "@/types/service-accounts";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
	Button,
	Dialog,
	DialogClose,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	Input,
	Skeleton,
	Switch,
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
	useToast
} from "@zenml-io/react-component-library";
import { Dispatch, SetStateAction, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { ApiKeySuccess } from "./Success";

type RotateKeyProps = {
	serviceAccountId: string;
	apiKeyId: string;
	open: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
};

const rotateFormSchema = z
	.object({
		enableRetention: z.boolean(),
		rotateMinutes: z.coerce.number().int().min(1).optional()
	})
	.refine((data) => {
		if (data.enableRetention && !data.rotateMinutes) {
			return false;
		}
		return true;
	});

type RotateFormType = z.infer<typeof rotateFormSchema>;

export function RotateApiKeyDialog({ serviceAccountId, apiKeyId, open, setOpen }: RotateKeyProps) {
	const [apikeyValue, setApikeyValue] = useState("");
	const isSuccess = !!apikeyValue;

	function renderDialogContent() {
		if (isSuccess) return <ApiKeySuccess value={apikeyValue} />;
		return (
			<RotateForm
				setApiKeyValue={setApikeyValue}
				apiKeyId={apiKeyId}
				serviceAccountId={serviceAccountId}
			/>
		);
	}

	return (
		<Dialog
			open={open}
			onOpenChange={(b) => {
				setOpen(b);
				setApikeyValue("");
			}}
		>
			<DialogContent className="mx-auto max-w-[800px] overflow-x-auto">
				<DialogHeader>
					<DialogTitle>Rotate API Key</DialogTitle>
				</DialogHeader>
				{renderDialogContent()}
			</DialogContent>
		</Dialog>
	);
}

type FormProps = {
	serviceAccountId: string;
	apiKeyId: string;
};
function RotateForm({
	apiKeyId,
	serviceAccountId,
	setApiKeyValue
}: FormProps & {
	setApiKeyValue: Dispatch<SetStateAction<string>>;
}) {
	const { toast } = useToast();
	const queryClient = useQueryClient();
	const {
		control,
		watch,
		register,
		handleSubmit,
		formState: { errors, isValid }
	} = useForm<RotateFormType>({
		resolver: zodResolver(rotateFormSchema),
		defaultValues: { enableRetention: false, rotateMinutes: undefined }
	});

	function handleRotateKey(data: RotateFormType) {
		const updateApiData: RotateApi = {
			retain_period_minutes: data.rotateMinutes
		};
		mutate({
			serviceAccountId,
			apiKeyId,
			body: updateApiData
		});
	}

	const { mutate } = useRotateApiKey({
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
			toast({
				description: "The API key has been rotated successfully.",
				status: "success",
				emphasis: "subtle",
				rounded: true
			});
			setApiKeyValue(data.body?.key || "");
			queryClient.invalidateQueries({
				queryKey: [...serviceAccountQueryKeys.apiKeysKey(serviceAccountId)]
			});
		}
	});

	return (
		<>
			<div className="space-y-5 p-7">
				<Header apiKeyId={apiKeyId} serviceAccountId={serviceAccountId} />
				<Hintbox />
				<form onSubmit={handleSubmit(handleRotateKey)} id="retention-form">
					<div className="flex items-center gap-1 rounded-t-md border bg-theme-surface-secondary p-1">
						<Controller
							control={control}
							name="enableRetention"
							render={({ field: { onChange, value } }) => (
								<Switch
									className="data-[state=unchecked]:bg-neutral-200"
									checked={value}
									id="enable-retention"
									onCheckedChange={(val) => onChange(!!val)}
								/>
							)}
						/>
						Include Retention Period
						<TooltipProvider>
							<Tooltip>
								<TooltipTrigger asChild>
									<button type="button">
										<Info className="h-4 w-4 shrink-0 fill-theme-text-tertiary" />
										<div className="sr-only">Info tooltip</div>
									</button>
								</TooltipTrigger>
								<TooltipContent className="z-50 flex max-w-[480px] bg-black">
									<p className="text-text-xs text-white">
										To minimize disruption, you can set a retention period for your current key.
										Enter the duration(in minutes) you'd like the old key to remain active alongside
										the new one.
									</p>
								</TooltipContent>
							</Tooltip>
						</TooltipProvider>
					</div>
					<fieldset
						disabled={!watch("enableRetention")}
						className="space-y-5 rounded-b-md border-x border-b p-5 text-text-md text-theme-text-primary"
					>
						<p className="text-text-md text-theme-text-primary">
							Keep the current key working for the next
						</p>
						<div>
							<label className="text-text-sm text-theme-text-primary" htmlFor="retention-minutes">
								Minutes
							</label>
							<Input
								id="retention-minutes"
								{...register("rotateMinutes")}
								disabled={!watch("enableRetention")}
								placeholder="0"
							/>
							{errors.rotateMinutes && (
								<p className="text-text-sm text-theme-text-error">{errors.rotateMinutes.message}</p>
							)}
						</div>
					</fieldset>
				</form>
			</div>

			<DialogFooter className="gap-[10px]">
				<DialogClose asChild>
					<Button size="sm" intent="secondary">
						Cancel
					</Button>
				</DialogClose>
				<Button intent="primary" disabled={!isValid} size="sm" form="retention-form">
					Rotate Key
				</Button>
			</DialogFooter>
		</>
	);
}

function Header({ apiKeyId, serviceAccountId }: FormProps) {
	const {
		data: ApiDetail,
		isPending,
		isError
	} = useQuery({
		...serviceAccountQueries.ApiKeysDetail(serviceAccountId, apiKeyId),
		throwOnError: true
	});

	if (isPending) return <Skeleton className="h-8 w-full" />;
	if (isError) return null;

	return (
		<div className="flex items-center space-x-2">
			<KeyIcon className="h-5 w-5 flex-shrink-0 fill-primary-400" />
			<div className="space-y-0.5">
				<p>{ApiDetail && ApiDetail.name}</p>
				<p className="text-text-sm text-theme-text-secondary">
					{ApiDetail && ApiDetail.metadata?.description}
				</p>
			</div>
		</div>
	);
}

function Hintbox() {
	return (
		<InfoBox>
			<strong>Your current API Key will be deactivated.</strong> This means any processes or
			integrations using the old key will no longer function once the new key is generated.
		</InfoBox>
	);
}
