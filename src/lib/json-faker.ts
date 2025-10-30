import { JSONSchemaFaker } from "json-schema-faker";

JSONSchemaFaker.option({
	alwaysFakeOptionals: true,
	useDefaultValue: true,
	random: () => 0
});

export { JSONSchemaFaker };
