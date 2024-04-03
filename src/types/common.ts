export type ResponsePage<T> = {
	index: number;
	max_size: number;
	total_pages: number;
	total: number;
	items: T[];
};
