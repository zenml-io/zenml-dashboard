export type BreadcrumbSegment = {
	label: string;
	href: string;
	disabled?: boolean;
};

export type Breadcrumbs = BreadcrumbSegment[];
