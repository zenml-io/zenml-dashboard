import { useEffect, useRef } from "react";
import { Props } from "./Visualization";

export function HTMLVisualization({ content }: Props) {
	const iframeRef = useRef<HTMLIFrameElement>(null);

	useEffect(() => {
		const iframe = iframeRef.current;
		if (!iframe) return;

		const adjustHeight = () => {
			if (iframe.contentWindow) {
				const contentHeight = iframe.contentWindow.document.documentElement.scrollHeight;
				iframe.style.height = contentHeight ? `${contentHeight}px` : "100%";
			}
		};

		const handleLoad = () => {
			const iframeDoc = iframe.contentWindow?.document.documentElement;
			if (!iframeDoc) return;

			// ResizeObserver watches for any size changes in the iframe content
			const resizeObserver = new ResizeObserver(() => {
				adjustHeight();
			});

			resizeObserver.observe(iframeDoc);

			// Initial height adjustment
			adjustHeight();

			// Cleanup function
			return () => resizeObserver.disconnect();
		};

		iframe.addEventListener("load", handleLoad);

		return () => {
			iframe.removeEventListener("load", handleLoad);
		};
	}, []);

	return (
		<div>
			<iframe className="w-full" title="Secure HTML Content" ref={iframeRef} srcDoc={content} />
		</div>
	);
}
