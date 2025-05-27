import Divider from "@/assets/icons/slash-divider.svg?react";
import { Fragment, useEffect, useState, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import { BreadcrumbSegment } from "./types";
import { useBreadcrumbsContext } from "@/layouts/AuthenticatedLayout/BreadcrumbsContext";
import { dashCaseToTitleCase } from "@/lib/strings";

const nestedSegments = [
	"pipelines",
	"artifacts",
	"components",
	"stacks",
	"model-versions",
	"artifact-versions",
	"run-templates",
	"models",
	"runs",
	"artifacts",
	"projects",
	"secrets",
	"service-accounts",
	"connectors",
	"roles"
];

function getCurrentSegment(remainingPath: string[], isSettingsPath: boolean): string {
	return remainingPath.length === 0
		? "Overview"
		: isSettingsPath
			? remainingPath[1]
			: remainingPath[0];
}

function checkIfNestedSegment(
	remainingPath: string[],
	currentSegment: string,
	isSettingsPath: boolean
): boolean {
	return (
		(isSettingsPath ? remainingPath.length === 2 : remainingPath.length === 1) &&
		nestedSegments.includes(currentSegment)
	);
}

export function Breadcrumbs() {
	const { pathname } = useLocation();
	const [currentBreadcrumbs, setCurrentBreadcrumbs] = useState<BreadcrumbSegment[]>([]);
	const { breadcrumbs, setBreadcrumbs } = useBreadcrumbsContext();
	const shouldShowEllipsis = currentBreadcrumbs.length > 2;

	const handleMainPath = useCallback(
		(isNestedSegment: boolean, isSettingsPath: boolean, currentSegment: string): void => {
			if (isNestedSegment) {
				const breadcrumb: BreadcrumbSegment[] = [];
				if (isSettingsPath) {
					breadcrumb.push({ label: "Settings", href: "", disabled: true });
				}
				breadcrumb.push({ label: dashCaseToTitleCase(currentSegment), href: "" });
				setCurrentBreadcrumbs(breadcrumb);
			} else if (breadcrumbs.length > 0) {
				setCurrentBreadcrumbs(breadcrumbs);
			}
		},
		[breadcrumbs]
	);

	const handleNonMainPath = useCallback((isSettingsPath: boolean, currentSegment: string): void => {
		const breadcrumb: BreadcrumbSegment[] = [];
		if (isSettingsPath) {
			breadcrumb.push({ label: "Settings", href: "", disabled: true });
		}
		breadcrumb.push({ label: dashCaseToTitleCase(currentSegment), href: "" });
		setCurrentBreadcrumbs(breadcrumb);
	}, []);

	useEffect(() => {
		setBreadcrumbs([]);
	}, [pathname, setBreadcrumbs]);

	useEffect(() => {
		const pathSegments = pathname.split("/").filter(Boolean);
		const isProjectRoute =
			pathSegments[0] === "projects" && pathSegments.length > 1 && pathSegments[1] !== "create";
		const remainingPath = pathSegments.slice(isProjectRoute ? 2 : 0);

		const isMainPath = remainingPath.some((segment) => nestedSegments.includes(segment));
		const isSettingsPath = remainingPath[0] === "settings";

		const currentSegment = getCurrentSegment(remainingPath, isSettingsPath);
		const isNestedSegment = checkIfNestedSegment(remainingPath, currentSegment, isSettingsPath);

		if (isMainPath) {
			handleMainPath(isNestedSegment, isSettingsPath, currentSegment);
		} else {
			handleNonMainPath(isSettingsPath, currentSegment);
		}
	}, [breadcrumbs, pathname, handleMainPath, handleNonMainPath]);

	return (
		<nav className="flex items-center gap-0.5">
			{currentBreadcrumbs.map((breadcrumb, index) => {
				const isLast = index === currentBreadcrumbs.length - 1;
				// Render only the first and last breadcrumbs with an ellipsis in between
				if (shouldShowEllipsis && index < currentBreadcrumbs.length - 2) {
					return index === 0 ? (
						<Fragment key="ellipsis">
							<Divider className="h-4 w-4 flex-shrink-0 fill-neutral-200" />
							<span className="mx-0.5">...</span>
						</Fragment>
					) : null;
				}

				return (
					<Fragment key={index}>
						{index === 0 && <Divider className="h-4 w-4 flex-shrink-0 fill-neutral-200" />}
						{index > 0 && <Divider className="h-4 w-4 flex-shrink-0 fill-neutral-200" />}
						{isLast ? (
							<div className="min-w-0 max-w-[20ch] truncate rounded-sm p-0.5 px-1 text-text-md font-semibold text-theme-text-primary">
								{breadcrumb.label}
							</div>
						) : breadcrumb.disabled ? (
							<div className="min-w-0 max-w-[20ch] truncate rounded-sm p-0.5 px-1 text-text-md text-theme-text-secondary">
								{breadcrumb.label}
							</div>
						) : (
							<Link
								to={breadcrumb.href}
								className="min-w-0 max-w-[20ch] truncate rounded-sm p-0.5 px-1 text-text-md text-theme-text-secondary hover:text-theme-text-brand hover:underline"
							>
								{breadcrumb.label}
							</Link>
						)}
					</Fragment>
				);
			})}
		</nav>
	);
}
