import Divider from "@/assets/icons/slash-divider.svg?react";
import { useEffect, useState } from "react";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import {
	matchSegmentWithPages,
	matchSegmentWithRequest,
	matchSegmentWithTab,
	matchSegmentWithURL
} from "./SegmentsBreadcrumbs";
import { useBreadcrumbsContext } from "@/layouts/AuthenticatedLayout/BreadcrumbsContext";
import { formatIdToTitleCase, transformToEllipsis } from "@/lib/strings";

type BreadcrumbData = { [key: string]: { id?: string; name?: string } };

export function Breadcrumbs() {
	const { currentBreadcrumbData: data } = useBreadcrumbsContext();
	const [currentData, setCurrentData] = useState<BreadcrumbData | null>(null);
	const [searchParams] = useSearchParams();
	const { pathname } = useLocation();

	useEffect(() => {
		let matchedData: BreadcrumbData = {};

		const pathSegments = pathname.split("/").filter((segment: string) => segment !== "");
		const segmentsToCheck: string[] = ["pipelines", "runs"];
		const mainPaths = segmentsToCheck.some((segment) => pathSegments.includes(segment));

		if (!mainPaths) {
			const currentSegment =
				pathSegments.length === 0
					? "overview"
					: pathSegments.includes("settings")
						? pathSegments[1]
						: pathSegments[0];

			matchedData = matchSegmentWithPages(currentSegment);
			setCurrentData(matchedData);
		} else {
			if (data && data.segment) {
				const tabParam = searchParams.get("tab");
				matchedData = matchSegmentWithRequest(data) as BreadcrumbData;

				const newMatchedData = {
					...matchedData,
					...(tabParam && { tab: { id: tabParam, name: tabParam } })
				};
				setCurrentData(newMatchedData);
			}
		}
	}, [data, searchParams, pathname]);

	const totalEntries = currentData ? Object.entries(currentData).length : 0;

	return (
		<div className="flex">
			{currentData &&
				Object.entries(currentData).map(([segment, value], index: number) => {
					const isLastOne = index === totalEntries - 1;

					return (
						<div className="flex items-center" key={index}>
							{index !== 0 && <Divider className="h-4 w-4 flex-shrink-0 fill-neutral-200" />}
							{segment === "tab" ? (
								<div className="align-center ml-1 flex items-center">
									<div>{matchSegmentWithTab(value?.name as string)}</div>
									<span
										className={`
											${isLastOne ? "pointer-events-none text-theme-text-primary" : "text-theme-text-secondary"}
											ml-1 flex items-center text-text-md font-semibold capitalize`}
									>
										{formatIdToTitleCase(value?.name as string)}
									</span>
								</div>
							) : (
								<Link
									className={`${isLastOne || segment === "settings" ? "pointer-events-none" : ""} 
									${isLastOne ? "font-semibold text-theme-text-primary" : "text-theme-text-secondary"}
									rounded-sm p-0.5 px-1 text-text-md  capitalize hover:text-purple-900 hover:underline`}
									to={matchSegmentWithURL(segment, value?.id as string)}
								>
									{typeof value?.name === "string"
										? transformToEllipsis(value?.name, 20)
										: value?.name}
								</Link>
							)}
						</div>
					);
				})}
		</div>
	);
}
