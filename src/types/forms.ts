export type JSONSchemaType =
	| "string"
	| "number"
	| "integer"
	| "boolean"
	| "object"
	| "array"
	| "null";

export type JSONSchemaDefinition = {
	type?: JSONSchemaType | JSONSchemaType[];
	title?: string;
	description?: string;
	default?: any;
	examples?: any[];
	const?: any;
	enum?: any[];
	multipleOf?: number;
	maximum?: number;
	exclusiveMaximum?: number;
	minimum?: number;
	exclusiveMinimum?: number;
	maxLength?: number;
	minLength?: number;
	pattern?: string;
	sensitive?: boolean;
	format?: string;
	maxItems?: number;
	minItems?: number;
	uniqueItems?: boolean;
	maxProperties?: number;
	minProperties?: number;
	required?: string[];
	additionalProperties?: boolean | JSONSchemaDefinition;
	properties?: { [key: string]: JSONSchemaDefinition };
	patternProperties?: { [key: string]: JSONSchemaDefinition };
	dependencies?: { [key: string]: string[] | JSONSchemaDefinition };
	propertyNames?: JSONSchemaDefinition;
	allOf?: JSONSchemaDefinition[];
	anyOf?: JSONSchemaDefinition[];
	oneOf?: JSONSchemaDefinition[];
	not?: JSONSchemaDefinition;
	if?: JSONSchemaDefinition;
	then?: JSONSchemaDefinition;
	else?: JSONSchemaDefinition;
	$ref?: string;
	$defs?: { [key: string]: JSONSchemaDefinition };
};

export type JSONSchema = JSONSchemaDefinition & {
	$schema?: string;
	$id?: string;
};
