import { ComponentIcon } from "@/components/ComponentIcon";
import { DisplayDate } from "@/components/DisplayDate";
import { InlineAvatar } from "@/components/InlineAvatar";
import { componentQueries } from "@/data/components";
import { snakeCaseToLowerCase, snakeCaseToTitleCase } from "@/lib/strings";
import { sanitizeUrl } from "@/lib/url";
import { StackComponentType } from "@/types/components";
import { TabsContent } from "@radix-ui/react-tabs";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Button, Input, Spinner } from "@zenml-io/react-component-library/components/server";
import debounce from "lodash.debounce";
import { useCallback, useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { RadioItem, RadioItemLabel } from "../components/RadioItem";
import { ComponentTooltip } from "./ComponentsTooltip";
import { CreateComponentDialog } from "./create-component-modal";
import { FormType } from "./schema";
import { stackComponentTypes } from "@/lib/constants";

export function ComponentsSelection() {
	return (
		<>
			{stackComponentTypes.map((type) => (
				<TabsContent className="h-full space-y-5 p-5" key={type} value={type}>
					<ComponentTabContent type={type} />
				</TabsContent>
			))}
			<TabsContent className="h-full" value="">
				<div className="flex h-full w-full items-center justify-center text-theme-text-tertiary">
					Select a category to add a new component
				</div>
			</TabsContent>
		</>
	);
}

type Props = {
	type: StackComponentType;
};
function ComponentList({ type, search }: Props & { search: string }) {
	const componentsList = useInfiniteQuery({
		...componentQueries.componentListInfinite({
			sort_by: "desc:updated",
			type,
			...(search ? { name: `contains:${search}` } : {})
		})
	});

	const { control, watch, setValue } = useFormContext<FormType>();

	if (componentsList.isError) return <p>Error while fetching Components</p>;
	if (componentsList.isPending)
		return (
			<div className="flex w-full flex-1 items-center justify-center">
				<Spinner />
			</div>
		);

	return (
		<div className="space-y-1">
			<ul className="space-y-1">
				{componentsList.data.pages.map((page) =>
					page.items.map((comp) => (
						<li key={comp.id}>
							<Controller
								name={`components.${type}.id`}
								control={control}
								render={({ field: { onChange, ...restField } }) => (
									<RadioItemLabel
										className="justify-between bg-theme-surface-primary font-medium"
										data-state={
											watch(`components.${type}.id`) === comp.id ? "selected" : "unselected"
										}
										htmlFor={comp.id}
									>
										<div className="flex min-w-0 items-center gap-2">
											<RadioItem
												{...restField}
												id={comp.id}
												type="radio"
												value={comp.id}
												onChange={(e) => {
													setValue(`components.${type}.name`, comp.name);
													setValue(`components.${type}.logoUrl`, comp.body?.logo_url || "");
													onChange(e);
												}}
												checked={watch(`components.${type}.id`) === comp.id}
												name={type}
											/>
											<img
												alt="flavor icon"
												src={sanitizeUrl(comp.body?.logo_url || "")}
												width={24}
												height={24}
											/>

											<div className="min-w-0 truncate">
												<div className="truncate font-semibold">{comp.name}</div>
												<div className="truncate text-text-xs text-theme-text-secondary">
													{comp.id.split("-")[0]}
												</div>
											</div>
										</div>
										<div className="flex items-center gap-2 text-text-sm">
											{comp.body?.user?.name && <InlineAvatar username={comp.body.user.name} />}
											{comp.body?.updated && (
												<div className="whitespace-nowrap text-theme-text-secondary">
													<DisplayDate short dateString={comp.body.updated} />
												</div>
											)}
										</div>
									</RadioItemLabel>
								)}
							/>
						</li>
					))
				)}
			</ul>
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

function ComponentHeader({ type }: Props) {
	return (
		<section className="space-y-2">
			<div className="flex items-center gap-1">
				<ComponentIcon className="h-5 w-5 fill-primary-400" type={type} />
				<h2 className="text-text-lg font-semibold">{snakeCaseToTitleCase(type)}</h2>
				<ComponentTooltip type={type} />
			</div>
			<p className="text-theme-text-secondary">
				Select a existing {snakeCaseToLowerCase(type)} from your server:
			</p>
		</section>
	);
}

function ComponentTabContent({ type }: Props) {
	const [search, setSearch] = useState("");
	const { watch, setValue } = useFormContext<FormType>();

	const component = watch(`components.${type}`);

	useEffect(() => {
		if (component && !component.id) {
			setValue(`components.${type}`, null);
		}
	}, [component, setValue, type]);

	return (
		<>
			<ComponentHeader type={type} />
			<Search search={search} setSearch={setSearch} />
			<ComponentList search={search} type={type} />
		</>
	);
}

type SearchProps = {
	setSearch: (value: string) => void;
	search: string;
};
function Search({ setSearch, search }: SearchProps) {
	const [internalSearch, setInternalSearch] = useState(search);
	const debouncedSetter = useCallback(debounce(setSearch, 500), []);

	useEffect(() => {
		return () => {
			debouncedSetter.cancel();
		};
	}, [debouncedSetter]);

	function updateSearchQuery(value: string) {
		setInternalSearch(value);
		debouncedSetter(value);
	}

	return (
		<Input
			value={internalSearch}
			onChange={(e) => updateSearchQuery(e.target.value)}
			placeholder="Search..."
		/>
	);
}
