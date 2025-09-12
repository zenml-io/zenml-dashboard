import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export function useLogPageInput(currentPage: number, totalPages: number) {
	const formSchema = useMemo(
		() =>
			z.object({
				page: z.coerce
					.number()
					.int()
					.transform((val) => {
						const num = Math.floor(val);
						if (isNaN(num) || num < 1) return 1;
						if (num > totalPages) return totalPages;
						return num;
					})
					.catch(1)
			}),
		[totalPages]
	);

	const form = useForm({
		resolver: zodResolver(formSchema),
		defaultValues: {
			page: currentPage
		}
	});

	return {
		form
	};
}
