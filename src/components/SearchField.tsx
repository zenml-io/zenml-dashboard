import { sanitizeSearchValue } from "@/lib/search";
import { objectToSearchParams } from "@/lib/url";
import { Input } from "@zenml-io/react-component-library";
import debounce from "lodash.debounce";
import { InputHTMLAttributes, forwardRef, useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

type Props = {
	inMemoryHandler?: (val: string) => void;
	searchContains?: boolean;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	searchParams: Record<string, any>;
};

export const SearchField = forwardRef<
	HTMLInputElement,
	InputHTMLAttributes<HTMLInputElement> & Props
>(({ searchParams, searchContains = true, inMemoryHandler, ...rest }, ref) => {
	const navigate = useNavigate();
	const [existingParams] = useSearchParams();

	// const searchParams = useModelOverviewSearchParams();
	const [searchQuery, setSearchQuery] = useState(
		sanitizeSearchValue(searchParams.name || "") || ""
	);

	const debouncedSearch = useMemo(() => {
		return debounce(updateSearchQuery, 500);
	}, []);

	// cleanup on unmount
	useEffect(() => {
		return () => {
			debouncedSearch.cancel();
		};
	}, [debouncedSearch]);

	function updateSearchQuery(value: string) {
		if (!!inMemoryHandler) {
			inMemoryHandler(value);
			return;
		}
		const queryParams = new URLSearchParams({
			...Object.fromEntries(existingParams),
			...objectToSearchParams(searchParams)
		});
		// using operator instead of logical_operator
		queryParams.delete("logical_operator");
		if (value) {
			queryParams.set("name", searchContains ? `contains:${value}` : `${value}`);
			queryParams.set("operator", "or");
			queryParams.set("page", "1");
		} else {
			queryParams.delete("name");
			queryParams.delete("operator");
		}
		navigate(`?${queryParams.toString()}`, { preventScrollReset: true, replace: true });
	}

	// Event Handlers
	function searchHandler(e: React.ChangeEvent<HTMLInputElement>) {
		const { value } = e.target;
		setSearchQuery(value);
		debouncedSearch(value);
	}
	return (
		<Input
			{...rest}
			ref={ref}
			value={searchQuery}
			onChange={searchHandler}
			placeholder="Search..."
			inputSize="md"
		/>
	);
});

SearchField.displayName = "SearchField";
