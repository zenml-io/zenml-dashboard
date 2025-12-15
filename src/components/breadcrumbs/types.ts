import { ReactNode } from "react";

export type BreadcrumbSegment = {
	label: ReactNode;
	href: string;
	disabled?: boolean;
};

export type Breadcrumbs = BreadcrumbSegment[];
