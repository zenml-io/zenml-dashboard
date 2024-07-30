import {
	Dispatch,
	PropsWithChildren,
	SetStateAction,
	createContext,
	useContext,
	useState
} from "react";
import { ZodSchema } from "zod";

type SchemaContextType = {
	schema: ZodSchema;
	setSchema: Dispatch<SetStateAction<ZodSchema>>;
};

const SchemaContext = createContext<SchemaContextType | null>(null);

type Props = {
	initialSchema: ZodSchema;
};
export function SchemaProvider({ children, initialSchema }: PropsWithChildren<Props>) {
	const [schema, setSchema] = useState<ZodSchema>(initialSchema);
	return <SchemaContext.Provider value={{ schema, setSchema }}>{children}</SchemaContext.Provider>;
}

export function useSchemaContext() {
	const context = useContext(SchemaContext);
	if (!context) throw new Error("useSchemaContext must be used within a SchemaProvider");
	return context;
}
