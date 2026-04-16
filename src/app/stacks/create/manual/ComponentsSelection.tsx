import { stackComponentTypes } from "@/lib/constants";
import { StackComponent, StackComponentType } from "@/types/components";
import { TabsContent } from "@radix-ui/react-tabs";
import { ComponentTabContent } from "./ComponentTabContent";

type ComponentsSectionProps = {
	initialComponents?: Record<StackComponentType, StackComponent[]>;
};

export function ComponentsSelection({ initialComponents }: ComponentsSectionProps) {
	return (
		<>
			{stackComponentTypes.map((type) => (
				<TabsContent className="space-y-5 p-5" key={type} value={type}>
					<ComponentTabContent type={type} initialComponents={initialComponents} />
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
