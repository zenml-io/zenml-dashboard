import { ComponentIcon } from "@/components/ComponentIcon";
import { snakeCaseToTitleCase } from "@/lib/strings";
import { StackComponentType } from "@/types/components";
import * as Wizard from "@/components/wizard/Wizard";
import { stackComponentTypes } from "@/lib/constants";

type Props = {
	selectTypeHandler: (type: StackComponentType) => void;
};

export function TypeSelect({ selectTypeHandler }: Props) {
	return (
		<>
			<Wizard.Header>Select your Component Type</Wizard.Header>
			<Wizard.Body>
				<ul className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
					{stackComponentTypes.map((type) => (
						<TypeItem key={type} type={type} selectTypeHandler={selectTypeHandler} />
					))}
				</ul>
			</Wizard.Body>
		</>
	);
}

type TypeItemProps = {
	type: StackComponentType;
} & Props;
function TypeItem({ type, selectTypeHandler }: TypeItemProps) {
	return (
		<button
			onClick={() => selectTypeHandler(type)}
			className="flex h-[110px] flex-col items-center justify-center space-y-2 truncate whitespace-nowrap rounded-md border border-theme-border-moderate bg-theme-surface-secondary py-5 text-center text-text-sm text-theme-text-secondary transition-all duration-150 hover:bg-theme-surface-primary hover:shadow-sm"
		>
			<ComponentIcon
				className="h-5 w-5 shrink-0 fill-theme-text-tertiary group-data-[state=active]/trigger:fill-theme-surface-strong"
				type={type}
			/>
			<span>{snakeCaseToTitleCase(type)}</span>
		</button>
	);
}
