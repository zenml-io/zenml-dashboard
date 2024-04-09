import { components, operations } from "./core";

export type Device = components["schemas"]["OAuthDeviceResponse"];
export type DeviceQueryParams = NonNullable<
	operations["get_authorization_device_api_v1_devices__device_id__get"]["parameters"]["query"]
>;

export type DeviceVerifyPayload = components["schemas"]["OAuthDeviceVerificationRequest"];
