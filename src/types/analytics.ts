export type PageEvent = {
	type: "page";
	user_id: string;
	debug: boolean;
	name: string;
	category: string;
	context: PageEventContext;
	properties: PageEventProperties;
};

export type PageEventPage = {
	path: string;
	referrer: string;
	search: string;
	title: string;
};

export type PageEventContext = {
	locale: string;
	timezone: string;
	userAgent: string;
	page: PageEventPage;
};

export type PageEventProperties = PageEventPage & { category: string; [key: string]: any };
