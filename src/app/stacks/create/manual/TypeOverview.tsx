import CheckCircle from "@/assets/icons/check-circle.svg?react";
import { routes } from "@/router/routes";
import { TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { useIsMutating } from "@tanstack/react-query";
import { Button, Input } from "@zenml-io/react-component-library/components/server";
import { useFormContext } from "react-hook-form";
import { Link } from "react-router-dom";
import { TypeOverviewItem } from "./TypeOverviewItem";
import { FormType } from "./schema";
import { stackComponentTypes } from "@/lib/constants";

export function TypeOverview() {
	return (
		<div className="flex h-full flex-col justify-between space-y-5">
			<div className="space-y-5 p-5">
				<StackName />
				<AddComponents />
			</div>
			<ButtonBar />
		</div>
	);
}

function AddComponents() {
	const { watch, resetField } = useFormContext<FormType>();
	return (
		<>
			<div className="space-y-1">
				<h2 className="text-text-lg font-semibold">Add Components</h2>
				<p className="text-theme-text-secondary">
					All stacks have at minimum an orchestrator and an artifact store.{" "}
					<a
						target="_blank"
						rel="noopener noreferrer"
						href="https://docs.zenml.io/stacks#stack-components-guide"
						className="link text-primary-400"
					>
						Learn more
					</a>
				</p>
			</div>
			<TabsList>
				<div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
					{stackComponentTypes.map((type) => (
						<div className="relative" key={type}>
							<TabsTrigger className="group/trigger w-full" value={type}>
								<TypeOverviewItem type={type} />
							</TabsTrigger>
							{watch(`components.${type}.id`) && (
								<button
									type="button"
									onClick={(e) => {
										e.preventDefault();
										resetField(`components.${type}`);
									}}
									className="absolute right-[-12px] top-[-12px] flex aspect-square h-[28px] w-[28px] items-center justify-center rounded-rounded bg-theme-surface-primary"
								>
									<CheckCircle className="h-5 w-5 shrink-0 fill-success-400" />
								</button>
							)}
						</div>
					))}
				</div>
			</TabsList>
		</>
	);
}

function ButtonBar() {
	const {
		formState: { isSubmitting }
	} = useFormContext();
	const isMutating = !!useIsMutating();
	return (
		<div className="flex items-center justify-end space-x-2 border-t border-theme-border-moderate p-5">
			<Button asChild intent="secondary" size="md">
				<Link to={routes.stacks.create.index}>Cancel</Link>
			</Button>
			<Button className="flex items-center gap-1" disabled={isSubmitting || isMutating} size="md">
				{(isMutating || isSubmitting) && (
					<div
						role="alert"
						aria-busy="true"
						className="full h-[20px] w-[20px] animate-spin rounded-rounded border-2 border-theme-text-negative border-b-theme-text-brand"
					></div>
				)}
				Register Stack
			</Button>
		</div>
	);
}

function StackName() {
	const {
		register,
		formState: { errors }
	} = useFormContext<FormType>();

	return (
		<div className="space-y-1">
			<label className="text-text-sm" htmlFor="stack-name">
				Stack Name
			</label>
			<Input
				id="stack-name"
				className={`${errors.stackName ? "border-red-500" : ""} w-full`}
				placeholder="zenml-stack"
				{...register("stackName")}
			/>
			<p className="text-text-xs text-theme-text-secondary">
				The stack name must be unique and cannot match an existing stack.
			</p>
			{errors.stackName && (
				<p className="text-text-xs text-red-500">{errors.stackName.message?.toString()}</p>
			)}
		</div>
	);
}
