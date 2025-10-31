import { fetchStacks } from "@/data/stacks/stacklist-query";
import AwesomeDebouncePromise from "awesome-debounce-promise";

export const validateStackNameNotInUse = AwesomeDebouncePromise(async (name: string) => {
	const data = await fetchStacks({ name });
	return data.total === 0;
}, 500);
