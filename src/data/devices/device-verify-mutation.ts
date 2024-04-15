import { apiPaths, createApiPath } from "@/data/api";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { FetchError } from "../../lib/fetch-error";
import { Device, DeviceVerifyPayload } from "@/types/devices";

type VerifyDevicePayload = {
	deviceId: string;
	payload: DeviceVerifyPayload;
};

export async function verifyDevice({ deviceId, payload }: VerifyDevicePayload) {
	const url = createApiPath(apiPaths.devices.verify(deviceId));

	// TODO possibly this fetch can be abstracted
	const res = await fetch(url, {
		method: "PUT",
		credentials: "include",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(payload)
	});

	if (!res.ok) {
		const data = await res
			.json()
			.then((data) => data.detail)
			.catch(() => ["", "Failed to verify device."]);
		throw new FetchError({
			status: res.status,
			statusText: res.statusText,
			message: data[1] || "Failed to verify device."
		});
	}

	return res.json();
}

export function useVerifyDevice(
	options?: Omit<UseMutationOptions<Device, unknown, VerifyDevicePayload>, "mutationFn">
) {
	return useMutation<Device, unknown, VerifyDevicePayload>({
		mutationFn: async (payload) => {
			return verifyDevice(payload);
		},
		...options
	});
}
