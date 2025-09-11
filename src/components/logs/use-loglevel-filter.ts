import { LogEntryInternal, LoggingLevel } from "@/types/logs";
import { useMemo, useState } from "react";

export function useLogLevelFilter(logs: LogEntryInternal[]) {
	const [selectedLogLevel, setSelectedLogLevel] = useState<LoggingLevel>(20);

	const filteredLogs = useMemo(() => {
		return logs.filter((log) => {
			return log.level && log.level >= selectedLogLevel;
		});
	}, [logs, selectedLogLevel]);

	return {
		selectedLogLevel,
		filteredLogs,
		setSelectedLogLevel
	};
}
