import { uniqueNamesGenerator, colors, animals } from "unique-names-generator";

const blockedAnimals = ["booby", "swallow"];

export function generateUniqueName() {
	return uniqueNamesGenerator({
		dictionaries: [colors, animals.filter((el) => !blockedAnimals.includes(el))]
	});
}
