import { useEffect, useState } from "react";
import {
	Table,
	TableHeader,
	TableBody,
	TableRow,
	TableCell,
	TableHead
} from "@zenml-io/react-component-library";
import { Props } from "./Visualization";
import { ParseResult, parse } from "papaparse";

export default function CSVVisualization({ content }: Props) {
	const [rows, setRows] = useState<string[]>([]);
	const [values, setValues] = useState<string[][]>([]);

	useEffect(() => {
		parse(content, {
			header: true,
			skipEmptyLines: true,
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			complete: (result: ParseResult<any>) => {
				const columnArray: string[][] = [];
				const valueArray: string[][] = [];

				result.data.forEach((data) => {
					columnArray.push(Object.keys(data));
					valueArray.push(Object.values(data));
				});

				setRows(columnArray[0]);
				setValues(valueArray);
			}
		});
	}, [content]);

	return (
		<div className="overflow-hidden overflow-x-auto rounded-md border">
			<Table>
				<TableHeader className="bg-theme-surface-tertiary">
					<TableRow>
						{rows.map((rows, index) => {
							return (
								<TableHead className="text-theme-text-secondary" key={index}>
									{rows}
								</TableHead>
							);
						})}
					</TableRow>
				</TableHeader>
				<TableBody>
					{values.map((value, index) => {
						return (
							<TableRow key={index}>
								{value.map((val, i) => {
									return (
										<TableCell className="bg-theme-surface-primary" key={i}>
											{val}
										</TableCell>
									);
								})}
							</TableRow>
						);
					})}
				</TableBody>
			</Table>
		</div>
	);
}
