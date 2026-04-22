import { DisplayDate } from "@/components/DisplayDate";
import { InlineAvatar } from "@/components/InlineAvatar";
import { sanitizeUrl } from "@/lib/url";
import { StackComponent, StackComponentType } from "@/types/components";
import { Checkbox } from "@zenml-io/react-component-library";
import { Badge } from "@zenml-io/react-component-library/components/server";
import { ReactNode } from "react";
import { RadioItem, RadioItemLabel } from "../components/RadioItem";

type SharedRowProps = {
	comp: StackComponent;
	isSelected: boolean;
	showMetadata: boolean;
	selector: ReactNode;
	nameAddon?: ReactNode;
};

function ComponentListItemRow({
	comp,
	isSelected,
	showMetadata,
	selector,
	nameAddon
}: SharedRowProps) {
	return (
		<li>
			<RadioItemLabel
				className="justify-between bg-theme-surface-primary font-medium"
				data-state={isSelected ? "selected" : "unselected"}
				htmlFor={comp.id}
			>
				<div className="flex min-w-0 flex-1 items-center gap-2">
					{selector}
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
					{nameAddon ? <span className="shrink-0">{nameAddon}</span> : null}
				</div>
				{showMetadata && (
					<div className="flex shrink-0 items-center gap-2 text-text-sm">
						{comp.resources?.user && (
							<InlineAvatar
								avatarUrl={comp.resources.user.body?.avatar_url ?? undefined}
								username={comp.resources.user.name}
								isServiceAccount={!!comp.resources.user.body?.is_service_account}
							/>
						)}
						{comp.body?.updated && (
							<div className="whitespace-nowrap text-theme-text-secondary">
								<DisplayDate short dateString={comp.body.updated} />
							</div>
						)}
					</div>
				)}
			</RadioItemLabel>
		</li>
	);
}

type MultiProps = {
	comp: StackComponent;
	isSelected: boolean;
	showMetadata: boolean;
	onToggle: (checked: boolean) => void;
	isDefault?: boolean;
	onMakeDefault?: () => void;
};

function getNameAddon({
	isDefault,
	isSelected,
	onMakeDefault
}: {
	isDefault?: boolean;
	isSelected: boolean;
	onMakeDefault?: () => void;
}): ReactNode {
	if (isDefault) {
		return (
			<Badge size="sm" className="rounded-sm font-semibold" color="light-purple">
				Default
			</Badge>
		);
	}

	if (!isSelected || !onMakeDefault) {
		return null;
	}

	return (
		<button
			type="button"
			onClick={(e) => {
				e.preventDefault();
				e.stopPropagation();
				onMakeDefault();
			}}
		>
			<Badge size="sm" className="rounded-sm font-semibold" color="light-grey">
				Set as default
			</Badge>
		</button>
	);
}

export function ComponentListItemMulti({
	comp,
	isSelected,
	showMetadata,
	onToggle,
	isDefault,
	onMakeDefault
}: MultiProps) {
	const nameAddon = getNameAddon({ isDefault, isSelected, onMakeDefault });

	return (
		<ComponentListItemRow
			comp={comp}
			isSelected={isSelected}
			showMetadata={showMetadata}
			nameAddon={nameAddon}
			selector={
				<Checkbox
					id={comp.id}
					value={comp.id}
					checked={isSelected}
					onCheckedChange={(val) => {
						onToggle(!!val);
					}}
				/>
			}
		/>
	);
}

type SingleProps = {
	comp: StackComponent;
	type: StackComponentType;
	isSelected: boolean;
	showMetadata: boolean;
	onSelect: () => void;
};

export function ComponentListItemSingle({
	comp,
	type,
	isSelected,
	showMetadata,
	onSelect
}: SingleProps) {
	return (
		<ComponentListItemRow
			comp={comp}
			isSelected={isSelected}
			showMetadata={showMetadata}
			selector={
				<RadioItem
					id={comp.id}
					type="radio"
					value={comp.id}
					onChange={(_e) => {
						onSelect();
					}}
					checked={isSelected}
					name={type}
				/>
			}
		/>
	);
}
