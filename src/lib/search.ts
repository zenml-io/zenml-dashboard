const filterPrefixes = [
	"equals:",
	"contains:",
	"startswith:",
	"endswith:",
	"gte:",
	"gt:",
	"lte:",
	"lt:"
];

export function sanitizeSearchValue(value: string) {
	//check if value starts with filter prefix and remove it in case it does
	const filterPrefix = filterPrefixes.find((prefix) => value.startsWith(prefix));
	if (filterPrefix) {
		return value.slice(filterPrefix.length);
	}
	return value;
}
