import { BaseEdge, EdgeProps } from "reactflow";

type ElkEdgeProps = {
	points: { x: number; y: number }[];
};

export function ElkEdge(edge: EdgeProps<ElkEdgeProps>) {
	const points: { x: number; y: number }[] = edge.data?.points ?? [];

	if (!points.length) return null;

	// Convert points to SVG path with rounded corners
	const cornerRadius = 4; // Adjust this value to control corner roundness

	const d = points.reduce((acc, point, i) => {
		if (i === 0) {
			// First point - just move to it
			return `M ${point.x},${point.y}`;
		} else if (i === points.length - 1) {
			// Last point - draw line to it
			return `${acc} L ${point.x},${point.y}`;
		} else {
			// Middle points - create rounded corners
			const prevPoint = points[i - 1];
			const nextPoint = points[i + 1];

			// Calculate the direction vectors
			const incomingDx = point.x - prevPoint.x;
			const incomingDy = point.y - prevPoint.y;
			const outgoingDx = nextPoint.x - point.x;
			const outgoingDy = nextPoint.y - point.y;

			// Normalize the vectors and calculate offset points
			const incomingLength = Math.sqrt(incomingDx * incomingDx + incomingDy * incomingDy);
			const outgoingLength = Math.sqrt(outgoingDx * outgoingDx + outgoingDy * outgoingDy);

			// Use smaller radius if the segments are too short
			const actualRadius = Math.min(cornerRadius, incomingLength / 2, outgoingLength / 2);

			// Calculate the points where the curve should start and end
			const startX = point.x - (incomingDx / incomingLength) * actualRadius;
			const startY = point.y - (incomingDy / incomingLength) * actualRadius;
			const endX = point.x + (outgoingDx / outgoingLength) * actualRadius;
			const endY = point.y + (outgoingDy / outgoingLength) * actualRadius;

			// Create a quadratic Bezier curve using the corner point as control point
			return `${acc} L ${startX},${startY} Q ${point.x},${point.y} ${endX},${endY}`;
		}
	}, "");

	return <BaseEdge {...edge} path={d} />;
}
