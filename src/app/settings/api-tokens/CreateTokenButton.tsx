import { useCreateApiToken } from "@/data/auth/create-api-token";
import { useServerInfo } from "@/data/server/info-query";
import { isFetchError } from "@/lib/fetch-error";
import { isNoAuthServer } from "@/lib/server";
import { cn, useToast } from "@zenml-io/react-component-library";
import { Button, Skeleton } from "@zenml-io/react-component-library/components/server";
import { ComponentPropsWithoutRef, ElementRef, forwardRef, useState } from "react";
import { ApiTokenModal } from "./APITokenModal";
import { DisabledTokenButton } from "./DisabledTokenButton";

export const CreateTokenButton = forwardRef<
	ElementRef<typeof Button>,
	ComponentPropsWithoutRef<typeof Button>
>(({ className, onClick, ...rest }, ref) => {
	const { toast } = useToast();
	const [token, setToken] = useState("");
	const [open, setOpen] = useState(false);
	const serverInfo = useServerInfo();

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

	if (serverInfo.isPending) return <Skeleton className="h-7 w-10" />;
	if (serverInfo.isError) return null;

	if (isNoAuthServer(serverInfo.data.auth_scheme || "other")) {
		return <DisabledTokenButton size={rest.size} />;
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
