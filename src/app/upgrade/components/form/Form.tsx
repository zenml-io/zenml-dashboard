import { useServerInfo } from "@/data/server/info-query";
import { useCurrentUser } from "@/data/users/current-user-query";
import { Button, Input, Skeleton } from "@zenml-io/react-component-library/components/server";
import { useUpgradeForm } from "./useUpgradeForm";

export function UpgradeFormSection() {
	return (
		<div className="space-y-5">
			<HeadingSection />
			<Form />
		</div>
	);
}

function HeadingSection() {
	return (
		<div className="flex flex-col items-center space-y-0.5">
			<h1 className="text-center text-display-xs font-semibold">
				Upgrade to ZenML Pro on your own VPC
			</h1>
			<p className="text-theme-text-secondary">Direct self-deployment, no sales calls</p>
		</div>
	);
}

function Form() {
	const serverInfo = useServerInfo();
	const user = useCurrentUser();

	const { form, handleSubmitForm, submitFormMutation } = useUpgradeForm();

	const {
		register,
		handleSubmit,
		formState: { isValid, isSubmitting }
	} = form;

	const { isPending } = submitFormMutation;

	if (serverInfo.isPending || user.isPending) return <Skeleton className="h-[250px] w-full" />;
	if (serverInfo.isError || user.isError) return <p>Something went wrong....</p>;

	return (
		<div className="space-y-5">
			<form
				onSubmit={handleSubmit((data) =>
					handleSubmitForm(data, user.data.id, !!serverInfo.data.debug)
				)}
				className="space-y-5"
			>
				<div className="space-y-0.5">
					<label htmlFor="name" className="text-text-sm">
						Your Name
					</label>
					<Input {...register("name")} id="name" className="w-full" />
				</div>
				<div className="space-y-0.5">
					<label htmlFor="company" className="text-text-sm">
						Company
					</label>
					<Input {...register("company")} id="company" className="w-full" />
				</div>
				<div className="space-y-0.5">
					<label htmlFor="email" className="text-text-sm">
						Email address
					</label>
					<Input {...register("email")} id="email" className="w-full" />
				</div>
				<Button
					size="md"
					className="w-full justify-center"
					disabled={isSubmitting || isPending || !isValid}
					type="submit"
				>
					{(isPending || isSubmitting) && (
						<div
							role="alert"
							aria-busy="true"
							className="full h-[20px] w-[20px] animate-spin rounded-rounded border-2 border-theme-text-negative border-b-theme-text-brand"
						></div>
					)}
					Continue
				</Button>
			</form>
			<p className="text-center text-text-xs text-theme-text-secondary">
				By submitting the form you accept our{" "}
				<a
					className="link"
					href="https://www.zenml.io/cloud-terms-and-privacy"
					target="_blank"
					rel="noopener noreferrer"
				>
					terms of use
				</a>{" "}
				and{" "}
				<a
					href="https://www.zenml.io/privacy-policy"
					target="_blank"
					rel="noopener noreferrer"
					className="link"
				>
					privacy policy
				</a>
				.
			</p>
		</div>
	);
}
