import { FormType } from "@/app/stacks/create/manual/schema";
import { TypeOverviewItem } from "@/app/stacks/create/manual/TypeOverviewItem";
import Checkcircle from "@/assets/icons/check-circle.svg?react";
import { stackComponentTypes } from "@/lib/constants";
import { TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { useFormContext } from "react-hook-form";

export function AddComponentsGrid() {
	const { watch, setValue } = useFormContext<FormType>();
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
										setValue(`components.${type}`, null);
									}}
									className="absolute right-[-12px] top-[-12px] flex aspect-square h-[28px] w-[28px] items-center justify-center rounded-rounded bg-theme-surface-primary"
								>
									<Checkcircle className="h-5 w-5 shrink-0 fill-success-400" />
								</button>
							)}
						</div>
					))}
				</div>
			</TabsList>
		</>
	);
}
