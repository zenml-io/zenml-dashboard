import { CommandListItem, generateCommandList } from "@/components/fallback-pages/Commands";
import { HelpBox } from "@/components/fallback-pages/Helpbox";
import { InfoBox } from "@/components/Infobox";
import { Fragment } from "react/jsx-runtime";

export type ComponentTypeSectionProps = {
	description: string;
	commandList: CommandListItem[];
	helpLink: string;
};
export function ComponentTypeSection({
	description,
	commandList,
	helpLink
}: ComponentTypeSectionProps) {
	return (
		<section className="space-y-5">
			<InfoBox className="text-text-md" intent="neutral">
				{description}
			</InfoBox>
			{commandList.map((item, index) => (
				<Fragment key={index}>{generateCommandList(item)}</Fragment>
			))}
			<HelpBox link={helpLink} />
		</section>
	);
}
