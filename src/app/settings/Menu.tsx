import NavLink from "@/components/NavLink";

type MenuItem = {
	name: string;
	href: string;
};

type MenuProps = {
	items: MenuItem[];
};

export function SettingsMenu({ items }: MenuProps) {
	return (
		<nav className="flex w-full flex-col items-center">
			<ul className="flex w-full flex-row items-center gap-1 lg:flex-col lg:items-start">
				{items.map((item) => (
					<li key={item.name} className="lg:w-full">
						<NavLink to={item.href}>{item.name}</NavLink>
					</li>
				))}
			</ul>
		</nav>
	);
}
