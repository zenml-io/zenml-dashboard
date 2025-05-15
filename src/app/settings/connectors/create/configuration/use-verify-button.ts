import debounce from "lodash.debounce";
import { useEffect, useMemo, useState } from "react";
import { useFormContext } from "react-hook-form";
import { ConnectorConfigForm } from "./schema";
import { useVerifyConnectorConfig } from "@/data/service-connectors/verify-config";

type Args = {
	mandatoryFields: string[];
};
export function useVerifyButton({ mandatoryFields }: Args) {
	const populatedMandatoryFields = useMemo(
		() => [...mandatoryFields, "name", "authMethod", "resourceType"],
		[mandatoryFields]
	);
	const [disabled, setDisabled] = useState(true);
	const [errorMsg, setErrorMsg] = useState("");
	const { setValue, clearErrors, watch, resetField } = useFormContext<ConnectorConfigForm>();

	useEffect(() => {
		const subscription = watch((values, { name }) => {
			if (name === "isValid" || name === "skipValidation") {
				return;
			}

			if (values.isValid === null) return;

			resetField("isValid");
		});

		// Cleanup subscription on unmount
		return () => subscription.unsubscribe();
	}, [watch, resetField]);

	useEffect(() => {
		const checkMandatoryFields = (values: ConnectorConfigForm) => {
			const allMandatoryFieldsFilled = populatedMandatoryFields.every((field) => {
				const value = values[field];

				if (value === undefined || value === null || value === "") {
					return false;
				}

				if (Array.isArray(value)) {
					return value.length > 0;
				}

				if (typeof value === "object") {
					return Object.keys(value).length > 0;
				}

				return true;
			});

			setDisabled(!allMandatoryFieldsFilled);
		};

		const debouncedCheck = debounce(checkMandatoryFields, 300);

		const subscription = watch((values) => {
			debouncedCheck(values as ConnectorConfigForm);
		});

		return () => {
			subscription.unsubscribe();
			debouncedCheck.cancel();
		};
	}, [watch, populatedMandatoryFields]);

	const verifyConfig = useVerifyConnectorConfig({
		onMutate: () => {
			setErrorMsg("");
		},
		onSuccess: (d) => {
			if (d.error) {
				setValue("isValid", false);
				setErrorMsg(d.error);
				return;
			}
			setValue("isValid", true);

			clearErrors("skipValidation");
		},
		onError: (e) => {
			setValue("isValid", false);
		}
	});

	return { disabled, errorMsg, verifyConfig };
}
