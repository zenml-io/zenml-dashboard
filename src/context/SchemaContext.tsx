import {
	Dispatch,
	PropsWithChildren,
	SetStateAction,
	createContext,
	useContext,
	useState
} from "react";
import { ZodObject, ZodRawShape } from "zod";

type SchemaContextType = {
	schema: ZodObject<ZodRawShape>;
	setSchema: Dispatch<SetStateAction<ZodObject<ZodRawShape>>>;
	defaultValues: Record<string, any>;
	setDefaultValues: Dispatch<SetStateAction<Record<string, any>>>;
};

const SchemaContext = createContext<SchemaContextType | null>(null);

type Props = {
	initialSchema: ZodObject<ZodRawShape>;
};
export function SchemaProvider({ children, initialSchema }: PropsWithChildren<Props>) {
	const [schema, setSchema] = useState<ZodObject<ZodRawShape>>(initialSchema);
	const [defaultValues, setDefaultValues] = useState<Record<string, any>>({});
	return (
		<SchemaContext.Provider value={{ schema, setSchema, defaultValues, setDefaultValues }}>
			{children}
		</SchemaContext.Provider>
	);
}

export function useSchemaContext() {
	const context = useContext(SchemaContext);
	if (!context) throw new Error("useSchemaContext must be used within a SchemaProvider");
	return context;
}
