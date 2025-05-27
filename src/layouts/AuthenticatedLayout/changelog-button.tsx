import Speaker from "@/assets/icons/announcement.svg?react";
import { DropdownMenuItem } from "@zenml-io/react-component-library/components/client";
import Widget from "featureos-widget";
import { useEffect, useState } from "react";

const changelogToken = import.meta.env.VITE_FEATURE_OS_KEY;

export default function ChangeLogButton() {
	const [initialized, setInitialized] = useState(false);
	// this needs to be monitored, as the widget is initilized when the ChangelogButton is mounted
	// its not clear from the docs if the widget is destroyed when the component is unmounted
	// We may recreate the widget when the component is mounted again...
	// If this is an issue, the easiest solution is prob a separate button that is always visible
	useEffect(() => {
		if (changelogToken) {
			const widget = new Widget({
				modules: ["changelog"],
				type: "modal",
				openFrom: "center",
				theme: "light",
				accent: "#7b3EF4",
				selector: "#hellonextWidget",
				token: changelogToken,
				noDefaultTrigger: true,
				changelogFilters: {
					per_page: 20
				},
				enableIndicator: true,
				onInitialized: () => {
					setInitialized(true);
				}
			});
			widget.init();
		}
	}, []);

	if (!changelogToken) return null;

	return (
		<DropdownMenuItem
			disabled={!initialized}
			id="hellonextWidget"
			className="flex items-center font-medium hover:cursor-pointer data-[highlighted]:bg-theme-surface-tertiary"
			icon={<Speaker />}
		>
			What's new
		</DropdownMenuItem>
	);
}
