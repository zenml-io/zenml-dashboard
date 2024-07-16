import { z } from "zod";
import { providerSchema } from "./Steps/schemas";

const NEWINFRAKEY = "new-infra-data";

const wizardSchema = z.object({
	provider: providerSchema,
	stackName: z.string().min(1).trim(),
	location: z.string().min(1).trim(),
	timestamp: z.string().min(1).trim()
});

export type WizardData = z.infer<typeof wizardSchema>;

export function setWizardData(data: WizardData) {
	localStorage.setItem(NEWINFRAKEY, JSON.stringify(data));
}

export function parseWizardData() {
	try {
		const localData = localStorage.getItem(NEWINFRAKEY);
		const parsedData = localData ? JSON.parse(localData) : {};
		return wizardSchema.safeParse(parsedData);
	} catch (e) {
		clearWizardData();
		return wizardSchema.safeParse({});
	}
}

export function clearWizardData() {
	localStorage.removeItem(NEWINFRAKEY);
}
