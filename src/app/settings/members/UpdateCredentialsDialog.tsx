export function UpdateCredentialsDialog() {
	// const [open, setOpen] = useState(false);
	// const [showSuccessPwdChanged, setShowSuccessNewMember] = useState(true);
	// const [currentPassword, setCurrentPassword] = useState("");
	// const [newPassword, setNewPassword] = useState("");
	// const [confirmPassword, setConfirmPassword] = useState("");
	// const [passwordValid, setPasswordValid] = useState(false);
	// const [passwordMatch, setPasswordMatch] = useState(false);
	// const [submitted, setSubmitted] = useState(false);

	// const validatePassword = () => {
	// 	const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
	// 	setPasswordValid(passwordRegex.test(newPassword));
	// 	setPasswordMatch(newPassword === confirmPassword);
	// 	return passwordRegex.test(newPassword) && newPassword === confirmPassword;
	// };

	// const submitForm = () => {
	// 	if (validatePassword()) {
	// 		// Show this when password succesfull
	// 		setShowSuccessNewMember(true);
	// 		setSubmitted(true);
	// 	}
	// };

	// const ChangePasswordForm = () => (
	// 	<div>
	// 		<div className="p-7">
	// 			<label htmlFor={currentPassword} className="text-text-sm">
	// 				Current Password
	// 			</label>
	// 			<Input
	// 				onChange={(e) => setCurrentPassword(e.target.value)}
	// 				type="password"
	// 				required
	// 				placeholder="Current password"
	// 				className="mb-3 w-full"
	// 			/>
	// 			<label htmlFor={newPassword} className="text-text-sm">
	// 				New Password
	// 			</label>
	// 			<Input
	// 				onChange={(e) => setNewPassword(e.target.value)}
	// 				type="password"
	// 				required
	// 				placeholder="New Password"
	// 				className="mb-3 w-full"
	// 			/>
	// 			<label htmlFor={confirmPassword} className="text-text-sm">
	// 				Confirm Password
	// 			</label>
	// 			<Input
	// 				onChange={(e) => setConfirmPassword(e.target.value)}
	// 				type="password"
	// 				required
	// 				placeholder="Confirm new password"
	// 				className="mb-3 w-full"
	// 			/>

	// 			<div className="rounded-md border border-neutral-300 bg-theme-surface-secondary p-3 ">
	// 				<p className="mb-2 text-text-sm">Password criteria</p>
	// 				<div className="text-text-xs">
	// 					<p className={`text-text-sm ${passwordValid ? "text-green-500" : "text-red-500"}`}>
	// 						Minimum 8 characters
	// 					</p>
	// 					<p className={`text-text-sm ${passwordValid ? "text-green-500" : "text-red-500"}`}>
	// 						Must Contain one Numeric value
	// 					</p>
	// 					<p className={`text-text-sm ${passwordValid ? "text-green-500" : "text-red-500"}`}>
	// 						Must include upper cases
	// 					</p>
	// 					<p className={`text-text-sm ${passwordValid ? "text-green-500" : "text-red-500"}`}>
	// 						Must include lower cases
	// 					</p>
	// 					<p className={`text-text-sm ${passwordValid ? "text-green-500" : "text-red-500"}`}>
	// 						Must include one special character (!,@,#...)
	// 					</p>
	// 					{!passwordMatch && <p className="text-text-sm text-red-500">Passwords do not match</p>}
	// 				</div>
	// 			</div>
	// 		</div>
	// 		<DialogFooter>
	// 			<div className="flex items-center gap-2">
	// 				<DialogClose asChild>
	// 					<Button variant="secondary">Cancel</Button>
	// 				</DialogClose>
	// 				<Button onClick={submitForm} disabled={submitted || name.trim() === ""} variant="primary">
	// 					Change Password
	// 				</Button>
	// 			</div>
	// 		</DialogFooter>
	// 	</div>
	// );

	return (
		<p>Dialog</p>
		// <Dialog open={open} onOpenChange={setOpen}>
		// 	<DialogTrigger asChild>
		// 		<Button className="shrink-0" variant="primary">
		// 			Add Members
		// 		</Button>
		// 	</DialogTrigger>
		// 	<DialogContent>
		// 		<DialogHeader>
		// 			<DialogTitle> Update Credentials</DialogTitle>
		// 		</DialogHeader>
		// 		{showSuccessPwdChanged ? <SuccessAddMember /> : <ChangePasswordForm />}
		// 	</DialogContent>
		// </Dialog>
	);
}
