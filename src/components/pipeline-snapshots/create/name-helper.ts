export function generateSnapshotName(runName: string) {
	return `${runName}-snapshot-${Date.now()}`;
}
