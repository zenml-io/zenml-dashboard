import { useCreateApiToken } from "@/data/auth/create-api-token";
import { cn, useToast } from "@zenml-io/react-component-library";
import { Button } from "@zenml-io/react-component-library/components/server";
import { ComponentPropsWithoutRef, ElementRef, forwardRef, useState } from "react";
import { ApiTokenModal } from "./APITokenModal";
import { isFetchError } from "@/lib/fetch-error";

export const CreateTokenButton = forwardRef<
	ElementRef<typeof Button>,
	ComponentPropsWithoutRef<typeof Button>
>(({ className, onClick, ...rest }, ref) => {
	const { toast } = useToast();
	const [token, setToken] = useState("");
	const [open, setOpen] = useState(false);

	const { mutate, isPending } = useCreateApiToken({
		onError: (e) => {
			if (isFetchError(e)) {
				toast({
					title: "Error",
					emphasis: "subtle",
					rounded: true,
					status: "error",
					description: e.message
				});
			}
			console.log(e);
		},
		onSuccess: (data) => {
			setToken(data);
			setOpen(true);
		}
	});

	function closeModal(open: boolean) {
		setOpen(open);
		if (!open) {
			setToken("");
		}
	}

	return (
		<>
			<Button
				disabled={isPending}
				ref={ref}
				{...rest}
				onClick={() => mutate({ params: { token_type: "generic" } })}
				className={cn(className)}
			>
				{isPending && (
					<div
						role="alert"
						aria-busy="true"
						className="full h-[20px] w-[20px] animate-spin rounded-rounded border-2 border-theme-text-negative border-b-theme-text-brand"
					></div>
				)}
				Create new token
			</Button>
			<ApiTokenModal open={open} setOpen={closeModal} token={token} />
		</>
	);
});

CreateTokenButton.displayName = "CreateTokenButton";
