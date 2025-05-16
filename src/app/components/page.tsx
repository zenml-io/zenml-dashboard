import { ComponentSelectorContextProvider } from "./selector-context";
import { StackComponentList } from "./StackComponentList";

export default function ComponentsPage() {
	return (
		<div className="pt-5">
			<ComponentSelectorContextProvider>
				<StackComponentList />
			</ComponentSelectorContextProvider>
		</div>
	);
}
