import Speaker from "@/assets/icons/announcement.svg?react";
import { useServerSettings } from "@/data/server/get-server-settings";
import { SidebarItemContent, Skeleton } from "@zenml-io/react-component-library";
import { useEffect, useRef } from "react";

export function WhatsNewButton() {
	const scriptRef = useRef<HTMLScriptElement | null>(null);
	const { data, isPending, isError } = useServerSettings({ throwOnError: true });

	useEffect(() => {
		if (data?.body?.display_updates) {
			const script = document.createElement("script");

			script.src = "https://widgets-v3.featureos.app/widget.js";
			script.async = true;
			script.id = "changelogScript";
			script.onload = () => {
				// @ts-expect-error HellonextWidget is set by the script loaded above
				const widget = new window.HellonextWidget({
					modules: ["changelog"],
					type: "modal",
					openFrom: "center",
					theme: "light",
					accent: "#7b3EF4",
					selector: "#hellonextWidget",
					token: `${import.meta.env.VITE_FEATURE_OS_KEY}`,
					enableIndicator: true,
					changelogFilters: {
						per_page: 20
					}
				});
				widget.init();
			};
			document.body.appendChild(script);
			scriptRef.current = script;
		} else {
			if (scriptRef.current) {
				document.body.removeChild(scriptRef.current);
				scriptRef.current = null;
			}
		}
	}, [data]);

	if (isError) return null;
	if (isPending) return <Skeleton className="w-full" />;

	if (data.body?.display_updates === false) {
		return null;
	}

	return (
		<button
			id="hellonextWidget"
			aria-label="Changelog popup info"
			className="flex w-full cursor-pointer items-center gap-2 whitespace-nowrap rounded-md p-2 hover:cursor-pointer hover:bg-neutral-200 active:bg-neutral-300"
		>
			<SidebarItemContent isActive={false} icon={<Speaker />} label="What's New" />
		</button>
	);
}
