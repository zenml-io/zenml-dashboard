import { User } from "@/types/user";
import { FormEvent, useState } from "react";
import { Button, Input } from "@zenml-io/react-component-library";

type ProfileFormProps = {
	user: User;
};

export default function ProfileForm({ user }: ProfileFormProps) {
	const [name, setName] = useState(user.name);
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
		<form onSubmit={(e) => handleSubmit(e)} className="flex w-full max-w-[600px] flex-col gap-5">
			<Input
				onChange={(e) => setName(e.target.value)}
				required
				minLength={1}
				maxLength={50}
				className="w-full"
				label="Full Name"
				defaultValue={name}
			/>
			<Input disabled className="w-full" label="Email" defaultValue={user.metadata?.email} />
			<div className="flex justify-end">
				<Button disabled={submitted || name?.trim() === ""} variant="primary">
					Update
				</Button>
			</div>
		</form>
	);
}
