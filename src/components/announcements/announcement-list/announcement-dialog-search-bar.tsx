import Search from "@/assets/icons/search.svg?react";
import { DebouncedInput } from "@/components/debounced-input";

type Props = {
	searchQuery: string;
	setSearchQuery: (value: string) => void;
};

export function AnnouncementDialogSearchBar({ searchQuery, setSearchQuery }: Props) {
	return (
		<div className="px-5 py-2">
			<div className="relative">
				<DebouncedInput
					value={searchQuery}
					onChange={setSearchQuery}
					placeholder="Search..."
					className="w-full pl-[36px]"
				/>
				<div className="absolute inset-y-0 left-0 flex items-center pl-1">
					<Search className="size-4 fill-neutral-400" />
				</div>
			</div>
		</div>
	);
}
