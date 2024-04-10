import { Avatar, AvatarImage, AvatarFallback } from "@zenml-io/react-component-library"; // Ajusta la ruta de importación según sea necesario
import { Box } from "@zenml-io/react-component-library";
import GeneralOrgForm from "./Form";
import { User } from "@/types/user";

type Props = {
	user: User;
};
export default function GeneralSettingsPage({ user }: Props) {
	return (
		<div className="flex flex-col gap-4">
			<Box className="flex flex-col gap-5 p-5">
				<h1 className="text-text-xl font-semibold">General</h1>
				{user && <GeneralOrgForm server={user} />}
				<div>
					<p className="mb-2 text-text-sm">Image</p>
					<Avatar className="relative h-[140px] w-[140px]" size="xxl" type="square">
						<AvatarImage src="https://avatar.vercel.sh/default?size=24" />
						<AvatarFallback size="xxl">{user?.name as string}</AvatarFallback>
					</Avatar>
				</div>
			</Box>
		</div>
	);
}
