import { useEffect, useRef } from "react";
import { Props } from "./Visualization";

export function HTMLVisualization({ content }: Props) {
	const iframeRef = useRef<HTMLIFrameElement>(null);

	const handleIframeLoad = () => {
		if (iframeRef.current) {
			const contentHeight = iframeRef.current.contentWindow?.document.documentElement.scrollHeight;
			iframeRef.current.height = contentHeight ? `${contentHeight}px` : "100%";
		}
	};

	useEffect(() => {
		window.addEventListener("resize", handleIframeLoad);
		return () => {
			window.removeEventListener("resize", handleIframeLoad);
		};
	}, []);

	return (
		<div>
			<iframe
				title="Secure HTML Content"
				ref={iframeRef}
				srcDoc={content}
				sandbox="allow-same-origin"
				width="100%"
				height="auto"
				onLoad={handleIframeLoad}
			/>
		</div>
	);
}
