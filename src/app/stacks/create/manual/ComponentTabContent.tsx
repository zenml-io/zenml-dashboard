import { ComponentIcon } from "@/components/ComponentIcon";
import { DebouncedInput } from "@/components/debounced-input";
import { snakeCaseToLowerCase, snakeCaseToTitleCase } from "@/lib/strings";
import { StackComponent, StackComponentType } from "@/types/components";
import { useState } from "react";
import { ComponentList } from "./ComponentList";
import { ComponentTooltip } from "./ComponentsTooltip";

type ComponentTabContentProps = {
	type: StackComponentType;
	initialComponents?: Record<StackComponentType, StackComponent[]>;
};

function ComponentHeader({ type }: { type: StackComponentType }) {
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

export function ComponentTabContent({ type, initialComponents }: ComponentTabContentProps) {
	const [search, setSearch] = useState("");

	const typedInitialComponents = initialComponents?.[type] ?? [];

	return (
		<>
			<ComponentHeader type={type} />
			<DebouncedInput placeholder="Search..." value={search} onChange={setSearch} />
			<ComponentList initialComponents={typedInitialComponents} search={search} type={type} />
		</>
	);
}
