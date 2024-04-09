import { User } from "./user";

export type ResponsePage<T> = {
	index: number;
	max_size: number;
	total_pages: number;
	total: number;
	items: T[];
};

export type AnyDict = {
	[key: string]: any;
};

export type MetadataMap = {
	[key: string]: Metadata;
};

// interim Type for Intellisense
export type Metadata = {
	id: string;
	permission_denied: boolean;
	body: MetadataBody;
	metadata?: any;
};

export type MetadataBody = {
	created: string;
	updated: string;
	user: User;
	key: string;
	value: any;
	type: string;
};
