type Props = {
	entries: string[];
};

export function LeftSideMenu({ entries }: Props) {
	return (
		<aside className="whitespace-nowrap p-2 text-text-sm">
			<ul className="space-y-5">
				{entries.map((entry, index) => (
					<li key={index}>{entry}</li>
				))}
			</ul>
		</aside>
	);
}
