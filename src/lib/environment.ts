export function getIsSafari() {
	return /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
}
