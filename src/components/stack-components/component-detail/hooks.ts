import { componentQueries } from "@/data/components";
import { useQuery } from "@tanstack/react-query";

export function useComponent(id: string) {
	return useQuery({ ...componentQueries.componentDetail(id), throwOnError: true });
}
