export function AddMemberDialog() {
	return null;
	// 	const [open, setOpen] = useState(false);
	// 	const [showSuccesNewMember, setShowSuccesNewMember] = useState(false);
	// 	const [name, setName] = useState("");
	// 	const [submitted, setSubmitted] = useState(false);

	// 	async function submitForm() {
	// 		// Show when succesfull response
	// 		setShowSuccesNewMember(true);
	// 	}

	// 	const SuccessAddMember = () => (
	// 		<div className="p-7 text-center">
	// 			<UserIcon className={`m-auto mb-5 h-[110px] w-[110px] fill-success-500`} />

	// 			<p className="mb-5 text-text-sm font-semibold text-theme-text-primary">{`The user ${name} was created successfully!`}</p>
	// 			<p className="mb-5 text-text-sm font-semibold text-theme-text-secondary">
	// 				Share the invitation link with the user to complete the registration.
	// 			</p>
	// 			<Codesnippet code="https://128.0.2.1:8897/signup?user" />
	// 		</div>
	// 	);

	// 	const AddMemberForm = () => (
	// 		<div>
	// 			<div className="p-7">
	// 				<label htmlFor={name} className="text-text-sm">
	// 					Username
	// 				</label>
	// 				<Input
	// 					onChange={(e) => setName(e.target.value)}
	// 					type="name"
	// 					required
	// 					placeholder="Create a username..."
	// 					className="mb-5 w-full"
	// 				/>

	// 				<label htmlFor={name} className="text-text-sm">
	// 					Add user as an Admin
	// 				</label>
	// 				{/* Checkbox */}
	// 			</div>
	// 			<DialogFooter>
	// 				<div className="flex items-center gap-2">
	// 					<DialogClose asChild>
	// 						<Button
	// 							variant="secondary
	// "
	// 						>
	// 							Cancel
	// 						</Button>
	// 					</DialogClose>
	// 					<Button onClick={submitForm} disabled={submitted || name.trim() === ""} variant="primary">
	// 						Generate Token
	// 					</Button>
	// 				</div>
	// 			</DialogFooter>
	// 		</div>
	// 	);

	// 	return (
	// 		<Dialog open={open} onOpenChange={setOpen}>
	// 			<DialogTrigger asChild>
	// 				<Button className="shrink-0" variant="primary">
	// 					Add Members
	// 				</Button>
	// 			</DialogTrigger>
	// 			<DialogContent>
	// 				<DialogHeader>
	// 					<DialogTitle> Add a New Member</DialogTitle>
	// 				</DialogHeader>
	// 				{showSuccesNewMember ? <SuccessAddMember /> : <AddMemberForm />}
	// 			</DialogContent>
	// 		</Dialog>
	// 	);
}
