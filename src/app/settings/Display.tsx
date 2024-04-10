import { CompleteAvatar } from "@/components/Avatar";
// import { getMyUser } from "@/data/user";
// import { getTokenCookie } from "@/lib/cookies";
// import { Organization } from "@/types/organizations";

export async function DisplayUser() {
	// const user = await getMyUser(token);
	const user = {};

	return (
		<div className="flex w-full items-center gap-2">
			{/* <CompleteAvatar size="sm" avatarUrl={user.avatar_url || ""} fallbackValue={user.name![0]} /> */}
			<div className="truncate">
				<p className="truncate text-text-sm font-semibold">{user.name}</p>
				<p className="truncate text-text-sm text-theme-text-secondary">{user.email}</p>
			</div>
		</div>
	);
}

type DisplayOrgProps = {
	org?: Organization;
};

export async function DisplayOrg({ org }: DisplayOrgProps) {
	if (!org) return null;
	return (
		<div className="flex w-full items-center gap-2 rounded-md border border-theme-border-minimal bg-theme-surface-primary p-2">
			<CompleteAvatar
				type="square"
				size="sm"
				avatarUrl={org.logo_url || ""}
				fallbackValue={org.name[0]}
			/>
			<p className="truncate text-text-sm font-semibold">{org?.name}</p>
		</div>
	);
}
