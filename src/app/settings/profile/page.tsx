import { useCurrentUser } from "@/data/users/current-user-query";
import { sanitizeUrl } from "@/lib/url";
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
	Box,
	Skeleton
} from "@zenml-io/react-component-library";
import { EditAvatarDialog } from "./edit-avatar-dialog";
import { UpdateProfileForm } from "./UpdateProfileForm";

export default function ProfilePage() {
	const { data: user } = useCurrentUser();

	return (
		<Box className="flex flex-col gap-5 p-5">
			<h1 className="text-text-xl font-semibold">Profile</h1>
			<div className="flex justify-between">
				{user ? <UpdateProfileForm user={user} /> : <Skeleton className="h-[350px] w-full" />}

				{user ? (
					<Avatar size="xxl" className="ml-5 h-[140px] w-[140px]" type="square">
						<AvatarImage src={sanitizeUrl(user.body?.avatar_url ?? undefined)} />
						<AvatarFallback className="text-display-lg" size="xxl">
							{user.name[0]}
						</AvatarFallback>
						<EditAvatarDialog />
					</Avatar>
				) : (
					<Skeleton className="h-[140px] w-[140px] rounded-rounded" />
				)}
			</div>
		</Box>
	);
}
