"use client";

import Button from "@/components/button/Button";
import {
	Dialog,
	DialogTrigger,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogFooter,
	DialogClose,
	DialogDescription
} from "@/components/dialog/Dialog";
import RoleSelect from "./RoleSelect";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { isFetchError } from "@/lib/fetch-error";
import { useToast } from "@/components/toast/use-toast";
import Info from "@/assets/icons/info.svg";
import { Combobox } from "@/components/Combobox";
import { inviteOrgMember } from "@/data/organizations";
import { Input } from "@/components/input/Input";
import { TenantMember } from "@/types/tenants";
import { OrganizationMember } from "@/types/organizations";
import { assignRoleToOrgMember } from "@/data/roles";
import { Input } from "@zenml-io/react-component-library";

type Props = {
	orgId: string;
	isTenant?: boolean;
	members?: TenantMember[] | OrganizationMember[];
	token?: string;
};

export function AddMemberDialog({ members, orgId, isTenant, token }: Props) {
	const { toast } = useToast();
	const router = useRouter();
	const [error, setError] = useState();
	const [open, setOpen] = useState(false);
	const [role, setRole] = useState("");
	const [email, setEmail] = useState("");
	const [submitted, setSubmitted] = useState(false);
	const [selectedUsers, setSelectedUsers] = useState<any[]>([]);

	async function submitForm() {
		setSubmitted(true);
		try {
			if (isTenant) {
				selectedUsers.map(async (user) => {
					await assignRoleToOrgMember({ userId: user?.id, roleId: role });
				});
			} else {
				await inviteOrgMember({ email, roleId: role }, orgId);
			}
			toast({
				description: "The invitation has been sent successfully.",
				status: "success",
				emphasis: "subtle",
				rounded: true
			});
			setOpen(false);
			router.refresh();
			setSubmitted(false);
			setRole("");
			setSelectedUsers([]);
		} catch (err) {
			if (isFetchError(err)) {
				if (err.status === 401) {
					router.replace("/login");
					return;
				}
				if (err.status === 403) {
					toast({
						rounded: true,
						icon: <Info className="h-5 w-5 shrink-0 fill-theme-text-brand" />,
						status: "error",
						emphasis: "subtle",
						description: "You don't have sufficient permissions to perform this action."
					});
					setOpen(false);
					setSubmitted(false);
					setSelectedUsers([]);
					setRole("");
					return;
				}

				toast({
					rounded: true,
					icon: <Info className="h-5 w-5 shrink-0 fill-theme-text-brand" />,
					status: "error",
					emphasis: "subtle",
					description: <div>{err.message}</div>
				});
				setOpen(false);
				setSubmitted(false);
				setSelectedUsers([]);
				setRole("");
			}
			setError((e) => {
				throw e;
			});
		}
	}

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button className="shrink-0" variant="primary">
					Add members
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Add Members</DialogTitle>
				</DialogHeader>
				<div className="space-y-5 p-7">
					<DialogDescription>
						Find users or add email addresses to invite them and select their role:
					</DialogDescription>
					{isTenant ? (
						<Combobox
							orgId={orgId}
							isFullSize
							items={members || []}
							selectedItems={selectedUsers}
							setSelectedItems={setSelectedUsers}
						/>
					) : (
						<Input
							onChange={(e) => setEmail(e.target.value)}
							label="Email"
							type="email"
							required
							placeholder="user@company.inc"
							className="w-full"
						/>
					)}

					<div className="flex items-center">
						<p className="mr-3">Role:</p>
						<RoleSelect required onValueChange={setRole} />
					</div>
				</div>
				<DialogFooter>
					<div className="flex items-center gap-2">
						<DialogClose asChild>
							<Button variant="secondary">Cancel</Button>
						</DialogClose>
						<Button
							onClick={submitForm}
							disabled={
								submitted ||
								role.trim() === "" ||
								(isTenant ? !selectedUsers.length : email.trim() === "")
							}
							form="member-form"
							variant="primary"
						>
							Send invite
						</Button>
					</div>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
