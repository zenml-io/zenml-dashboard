export function DisplayDate({ dateString }: { dateString: string }) {
	const date = new Date(`${dateString}Z`).toLocaleString();

	return <>{date}</>;
}
