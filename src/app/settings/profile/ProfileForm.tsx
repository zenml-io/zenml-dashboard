import { User } from "@/types/user";
import { FormEvent, useState } from "react";
import { Box, Button, Input } from "@zenml-io/react-component-library";
import { Avatar, AvatarFallback, AvatarImage } from "@zenml-io/react-component-library";

type ProfileFormProps = {
	user: User;
};

export default function ProfileForm({ user }: ProfileFormProps) {
	const [name, setName] = useState(user.name);
	const [fullName, setFullName] = useState(user.body?.full_name);
	const [submitted, setSubmitted] = useState(false);

	async function handleSubmit(e: FormEvent<HTMLFormElement>) {
		// e.preventDefault();
		// setSubmitted(true);
		// const body: UpdateUser = {
		// 	name
		// };
		// try {
		// 	await updateMyUser(body);
		// 	router.refresh();
		// 	setSubmitted(false);
		// } catch (e) {
		// 	console.log(e);
		// 	setSubmitted(false);
		// }
	}

	return (
		<Box className="flex flex-col gap-5 p-5">
			<h1 className="text-text-xl font-semibold">Profile</h1>
			<div className="flex justify-between">
				<form onSubmit={(e) => handleSubmit(e)} className="flex w-full max-w-[600px] flex-col ">
					<label htmlFor={fullName} className="mb-1 text-text-sm">
						Full Name
					</label>
					<Input
						onChange={(e) => setFullName(e.target.value)}
						required
						minLength={1}
						maxLength={50}
						className="mb-5 w-full"
						defaultValue={fullName}
					/>
					<label htmlFor={name} className="mb-1 text-text-sm">
						Username
					</label>
					<Input
						onChange={(e) => setName(e.target.value)}
						required
						minLength={1}
						maxLength={50}
						className="mb-5 w-full"
						defaultValue={name}
					/>
					<div className="flex justify-end">
						<Button disabled={submitted || name?.trim() === ""} variant="primary">
							Update
						</Button>
					</div>
				</form>

				<Avatar className="ml-5 h-[140px] w-[140px]" type="rounded">
					<AvatarImage src="https://avatar.vercel.sh/default?size=24" />
					<AvatarFallback>{user.name![0]}</AvatarFallback>
				</Avatar>
			</div>
		</Box>
	);
}
