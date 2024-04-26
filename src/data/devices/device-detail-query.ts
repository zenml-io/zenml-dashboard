import { apiPaths, createApiPath } from "../api";
import { FetchError } from "@/lib/fetch-error";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { Device, DeviceQueryParams } from "@/types/devices";
import { objectToSearchParams } from "@/lib/url";
import { fetcher } from "../fetch";

type DeviceQuery = {
	deviceId: string;
	queryParams: DeviceQueryParams;
};
export function getDeviceKey({ deviceId, queryParams }: DeviceQuery) {
	return ["devices", deviceId, queryParams];
}

export async function fetchDeviceDetail({ deviceId, queryParams }: DeviceQuery): Promise<Device> {
	const url = createApiPath(
		apiPaths.devices.detail(deviceId) + "?" + objectToSearchParams(queryParams)
	);

	// TODO Abstract this fetch, as it's a lot of the times the same thing
	const res = await fetcher(url, {
		method: "GET",
		credentials: "include",
		headers: {
			"Content-Type": "application/json"
		}
	});

	if (!res.ok) {
		throw new FetchError({
			message: "Error while fetching Device details",
			status: res.status,
			statusText: res.statusText
		});
	}
	return res.json();
}

export function useDevice(
	params: DeviceQuery,
	options?: Omit<UseQueryOptions<Device>, "queryKey" | "queryFn">
) {
	return useQuery<Device>({
		queryKey: getDeviceKey(params),
		queryFn: async () => fetchDeviceDetail(params),
		...options
	});
}
