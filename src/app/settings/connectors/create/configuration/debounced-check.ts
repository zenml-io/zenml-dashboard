import { fetchServiceConnectorList } from "@/data/service-connectors/connector-list";
import AwesomeDebouncePromise from "awesome-debounce-promise";

export const validateConnectorName = AwesomeDebouncePromise(async (name: string) => {
	try {
		const resData = await fetchServiceConnectorList({ name });
		if (resData.total > 0) {
			return false;
		}
		return true;
	} catch (error) {
		console.error(error);
		return false;
	}
}, 500);
