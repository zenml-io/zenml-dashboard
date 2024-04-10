"use client";

import {
	Dialog,
	DialogTrigger,
	DialogContent,
	DialogTitle,
	DialogHeader,
	DialogDescription,
	DialogClose,
	DialogFooter
} from "@/components/dialog/Dialog";
import { Input } from "@/components/input/Input";
import Button from "@/components/button/Button";

import Edit from "@/assets/icons/edit.svg?react";
import { FormEvent, useState } from "react";
import { UpdateOrg } from "@/types/organizations";
import { updateOrg } from "@/data/organizations";
import { useRouter } from "next/navigation";
import Info from "@/assets/icons/info.svg";
import { isFetchError } from "@/lib/fetch-error";
import { useToast } from "@/components/toast/use-toast";

type Props = {
	orgId: string;
};

export default function ImageDialog({ orgId }: Props) {
	const [imageUrl, setImageUrl] = useState("");
	const { toast } = useToast();
	const [open, setOpen] = useState(false);
	const [, setError] = useState();
	const [submitted, setSubmitted] = useState(false);
	const router = useRouter();
	async function handleSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		setSubmitted(true);
		const body: UpdateOrg = {
			logo_url: imageUrl
		};
		try {
			await updateOrg(body, orgId);
			router.refresh();
			setOpen(false);
			setSubmitted(false);
		} catch (e) {
			if (isFetchError(e)) {
				if (e.status === 401) {
					router.replace("/login");
					return;
				}
				if (e.status === 403) {
					toast({
						rounded: true,
						icon: <Info className="h-5 w-5 shrink-0 fill-theme-text-brand" />,
						status: "default",
						emphasis: "subtle",
						description: "You don't have sufficient permissions to perform this action."
					});
					return;
				}
			}
			setError(() => {
				throw e;
			});
			setSubmitted(false);
		}
	}

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<button
					aria-label="Edit Organization Image"
					className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-md bg-theme-surface-primary"
				>
					<Edit className="h-5 w-5 fill-theme-text-primary" />
				</button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Add Your Organization Image</DialogTitle>
				</DialogHeader>
				<div className="p-7">
					<form id="image-form" onSubmit={(e) => handleSubmit(e)}>
						<Input
							onChange={(e) => setImageUrl(e.target.value)}
							required
							placeholder="https://zenml.io/logo.png"
							className="w-full"
							label="Select your image URL"
						/>
					</form>
					<DialogDescription className="border-none">
						<p className="mt-1 text-text-xs text-theme-text-secondary">
							This will be your Organization Image and will identify it all over ZenML Cloud
						</p>
					</DialogDescription>
				</div>
				<DialogFooter>
					<div className="flex items-center gap-2">
						<DialogClose asChild>
							<Button variant="secondary">Cancel</Button>
						</DialogClose>
						{/* <DialogClose asChild> */}
						<Button
							disabled={submitted || imageUrl.trim() === ""}
							type="submit"
							form="image-form"
							variant="primary"
						>
							Update
						</Button>
						{/* </DialogClose> */}
					</div>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
