import AlertCircle from "@/assets/icons/alert-circle.svg?react";
import Edit from "@/assets/icons/edit.svg?react";
import { useUpdateCurrentUserMutation } from "@/data/users/update-current-user-mutation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
	useToast
} from "@zenml-io/react-component-library/components/client";
import { Button, Input } from "@zenml-io/react-component-library/components/server";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
	avatarUrl: z.string().transform((val) => val?.trim() ?? null)
});

type FormData = z.infer<typeof formSchema>;

export function EditAvatarDialog() {
	const [open, setOpen] = useState(false);
	const queryClient = useQueryClient();
	const { toast } = useToast();

	const mutation = useUpdateCurrentUserMutation({
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["current-user"] });
			queryClient.invalidateQueries({ queryKey: ["users"] });
			setOpen(false);
		},
		onError: (error) => {
			if (error instanceof Error) {
				toast({
					status: "error",
					emphasis: "subtle",
					icon: <AlertCircle className="h-5 w-5 shrink-0 fill-error-700" />,
					description: error.message,
					rounded: true
				});
			}
		}
	});

	const form = useForm<FormData>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			avatarUrl: ""
		}
	});

	function handleUpdateAvatar(data: FormData) {
		mutation.mutate({
			avatar_url: data.avatarUrl
		});
	}

	function handleClose(b: boolean) {
		setOpen(b);
		form.reset();
	}

	return (
		<Dialog open={open} onOpenChange={handleClose}>
			<DialogTrigger asChild>
				<Button
					intent="secondary"
					size="md"
					className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center bg-theme-surface-primary"
				>
					<span className="sr-only">Edit Avatar</span>
					<Edit className="h-5 w-5 shrink-0 fill-theme-text-primary" />
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Update Avatar</DialogTitle>
				</DialogHeader>
				<div className="p-7">
					<form id="image-form" onSubmit={form.handleSubmit(handleUpdateAvatar)}>
						<label className="space-y-0.5">
							<div className="text-text-sm">Avatar URL</div>
							<Input
								placeholder="https://zenml.io/logo.png"
								className="w-full"
								{...form.register("avatarUrl")}
							/>
						</label>
					</form>
					<DialogDescription className="mt-1 border-none text-text-xs text-theme-text-secondary">
						This will be profile avatar
					</DialogDescription>
				</div>
				<DialogFooter>
					<div className="flex items-center gap-2">
						<DialogClose asChild>
							<Button intent="secondary">Cancel</Button>
						</DialogClose>
						<Button
							type="submit"
							form="image-form"
							intent="primary"
							disabled={mutation.isPending || !form.formState.isValid}
						>
							Update
						</Button>
					</div>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
