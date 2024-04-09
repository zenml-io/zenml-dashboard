// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function objectToSearchParams(object: Record<string, any>) {
	return new URLSearchParams(
		Object.entries(object)
			.filter(([_, value]) => value !== null && value !== undefined)
			.reduce((searchParams, [key, value]) => {
				searchParams.append(key, value);
				return searchParams;
			}, new URLSearchParams())
	);
}
