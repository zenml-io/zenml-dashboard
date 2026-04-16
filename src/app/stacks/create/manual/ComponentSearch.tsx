import { Input } from "@zenml-io/react-component-library/components/server";
import debounce from "lodash.debounce";
import { useCallback, useEffect, useState } from "react";

type ComponentSearchProps = {
	setSearch: (value: string) => void;
	search: string;
};

export function ComponentSearch({ setSearch, search }: ComponentSearchProps) {
	const [internalSearch, setInternalSearch] = useState(search);
	const debouncedSetter = useCallback(debounce(setSearch, 500), []);

	useEffect(() => {
		return () => {
			debouncedSetter.cancel();
		};
	}, [debouncedSetter]);

	function updateSearchQuery(value: string) {
		setInternalSearch(value);
		debouncedSetter(value);
	}

	return (
		<Input
			value={internalSearch}
			onChange={(e) => updateSearchQuery(e.target.value)}
			placeholder="Search..."
		/>
	);
}
