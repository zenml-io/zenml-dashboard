import { ReactNode } from "react";
import { useNewInfraFormContext } from "../../NewInfraFormContext";
import { AWSConfigurationStep } from "./AWS";

export function ConfigurationStep() {
	const { data } = useNewInfraFormContext();
	if (data.provider === "aws") return <AWSConfigurationStep />;
	return;
}

type ComponentListItemProps = {
	img: { src: string; alt: string };
	title: ReactNode;
	subtitle: ReactNode;
	badge: ReactNode;
};
export function ComponentListItem({ img, title, subtitle, badge }: ComponentListItemProps) {
	return (
		<div className="flex items-center justify-between">
			<div className="flex items-center gap-3">
				<img width="40" height="40" alt={img.alt} src={img.src} />
				<div>
					<p className="text-text-lg font-semibold">{title}</p>
					<p className="text-theme-text-secondary">{subtitle}</p>
				</div>
			</div>
			{badge}
		</div>
	);
}
