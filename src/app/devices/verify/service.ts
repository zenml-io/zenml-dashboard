import { DeviceQueryParams } from "@/types/devices";
import { useSearchParams } from "react-router-dom";

import { z } from "zod";

const filterParamsSchema = z.object({
	device_id: z.string().optional(),
	user_code: z.string().optional()
});

export function useDeviceSearchParams(): DeviceQueryParams & { device_id?: string } {
	const [searchParams] = useSearchParams();

	const { device_id, user_code } = filterParamsSchema.parse({
		device_id: searchParams.get("device_id") || undefined,
		user_code: searchParams.get("user_code") || undefined
	});

	return { user_code, device_id };
}
