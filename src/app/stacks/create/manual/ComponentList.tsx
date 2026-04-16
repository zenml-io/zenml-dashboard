import { componentQueries } from "@/data/components";
import { StackComponent, StackComponentType } from "@/types/components";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Button, Spinner } from "@zenml-io/react-component-library/components/server";
import { Controller, useFormContext } from "react-hook-form";
import { CreateComponentDialog } from "./create-component-modal";
import { ComponentListItemMulti, ComponentListItemSingle } from "./ComponentListItem";
import { FormType, isMultiComponentType } from "./schema";

type ComponentListProps = {
	type: StackComponentType;
	search: string;
	initialComponents?: StackComponent[];
};

export function ComponentList({ type, search, initialComponents }: ComponentListProps) {
	const componentsList = useInfiniteQuery({
		...componentQueries.componentListInfinite({
			sort_by: "desc:updated",
			type,
			...(search ? { name: `contains:${search}` } : {})
		})
	});

	const { control } = useFormContext<FormType>();

	if (componentsList.isError) return <p>Error while fetching Components</p>;
	if (componentsList.isPending)
		return (
			<div className="flex w-full flex-1 items-center justify-center">
				<Spinner />
			</div>
		);

	const loadedComponentIds = new Set(
		componentsList.data.pages.flatMap((page) => page.items.map((comp) => comp.id))
	);

	// Prepend any initial components that aren't already in the loaded pages
	const initialsNotInList = !search
		? (initialComponents ?? []).filter((c) => !loadedComponentIds.has(c.id))
		: [];

	const allComponents = [
		...initialsNotInList,
		...componentsList.data.pages.flatMap((page) => page.items)
	];

	const allowMultiple = isMultiComponentType(type);

	return (
		<div className="space-y-1 pb-3">
			<Controller
				control={control}
				name={`components.${type}`}
				render={({ field }) => {
					return (
						<ul className="space-y-1">
							{allComponents.map((comp) => {
								const isSelected = field.value.some((c) => c.id === comp.id);
								const showMetadata = loadedComponentIds.has(comp.id);
								const isDefault = isSelected && field.value[0]?.id === comp.id;

								return allowMultiple ? (
									<ComponentListItemMulti
										key={comp.id}
										comp={comp}
										isSelected={isSelected}
										showMetadata={showMetadata}
										isDefault={isDefault}
										onMakeDefault={() => {
											const rest = field.value.filter((c) => c.id !== comp.id);
											const entry = field.value.find((c) => c.id === comp.id);
											if (!entry) return;
											field.onChange([entry, ...rest]);
										}}
										onToggle={(checked) => {
											if (checked) {
												field.onChange([
													...field.value,
													{
														id: comp.id,
														name: comp.name,
														logoUrl: comp.body?.logo_url || ""
													}
												]);
											} else {
												field.onChange(field.value.filter((c) => c.id !== comp.id));
											}
										}}
									/>
								) : (
									<ComponentListItemSingle
										key={comp.id}
										comp={comp}
										type={type}
										isSelected={isSelected}
										showMetadata={showMetadata}
										onSelect={() => {
											field.onChange([
												{ id: comp.id, name: comp.name, logoUrl: comp.body?.logo_url || "" }
											]);
										}}
									/>
								);
							})}
						</ul>
					);
				}}
			/>
			<CreateComponentDialog type={type} />
			{componentsList.hasNextPage && (
				<Button
					onClick={() => componentsList.fetchNextPage()}
					type="button"
					size="md"
					intent="secondary"
					emphasis="subtle"
					className="flex w-full items-center justify-center bg-theme-surface-primary"
				>
					<div className="flex items-center gap-1">
						{componentsList.isFetchingNextPage && (
							<div
								role="alert"
								aria-busy="true"
								className="full h-[20px] w-[20px] animate-spin rounded-rounded border-2 border-theme-text-negative border-b-theme-text-brand"
							></div>
						)}
						Load more
					</div>
				</Button>
			)}
		</div>
	);
}
