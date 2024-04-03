import { Input } from "@zenml-io/react-component-library";
import { InputHTMLAttributes, forwardRef, useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import debounce from "lodash.debounce";
import { sanitizeSearchValue } from "@/lib/search";
import { objectToSearchParams } from "@/lib/url";

type Props = {
	searchContains?: boolean;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	searchParams: Record<string, any>;
};

export const SearchField = forwardRef<
	HTMLInputElement,
	InputHTMLAttributes<HTMLInputElement> & Props
>(({ searchParams, searchContains = true, ...rest }, ref) => {
	const { pathname } = useLocation();
	const navigate = useNavigate();
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
		const queryParams = new URLSearchParams(objectToSearchParams(searchParams));
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
		navigate(`${pathname}?${queryParams.toString()}`, { preventScrollReset: true, replace: true });
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
