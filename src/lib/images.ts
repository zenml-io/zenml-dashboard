export function getGradientImage(name: string, size: number = 24) {
	return `https://avatar.vercel.sh/${name}?size=${size}`;
}

export function generateNumberFromSalt(salt: string): number {
	function hashString(str: string): number {
		let hash = 0;
		for (let i = 0; i < str.length; i++) {
			hash = (hash * 31 + str.charCodeAt(i)) >>> 0;
		}
		return hash;
	}

	const hash = hashString(salt);
	return (hash % 49) + 1;
}

export function generateProjectImageUrl(projectName: string): string {
	return `https://public-flavor-logos.s3.eu-central-1.amazonaws.com/projects/${generateNumberFromSalt(
		projectName
	)}.jpg`;
}
