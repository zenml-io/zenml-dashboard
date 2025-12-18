import { AddComponentsGrid } from "@/components/stacks/edit-create/add-component-grid";
import { StackFormButtonBar } from "@/components/stacks/edit-create/button-bar";
import { StackNameInput } from "@/components/stacks/edit-create/stack-name-input";
import { routes } from "@/router/routes";

export function TypeOverview() {
	return (
		<div className="flex h-full flex-col justify-between space-y-5">
			<div className="space-y-5 p-5">
				<StackNameInput />
				<AddComponentsGrid />
			</div>
			<StackFormButtonBar cancelRoute={routes.stacks.create.index} submitLabel="Register Stack" />
		</div>
	);
}
