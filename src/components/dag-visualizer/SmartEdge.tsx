import { SVGDrawFunction } from "@tisoap/react-flow-smart-edge/src/functions/drawSvgPath";
import { BaseEdge, EdgeProps, SmoothStepEdge, useNodes, XYPosition } from "reactflow";
import { getSmartEdge, pathfindingJumpPointNoDiagonal } from "@tisoap/react-flow-smart-edge";

const distance = (a: XYPosition, b: XYPosition) =>
	Math.sqrt(Math.pow(b.x - a.x, 2) + Math.pow(b.y - a.y, 2));

function getBend(a: XYPosition, b: XYPosition, c: XYPosition, size: number): string {
	const bendSize = Math.min(distance(a, b) / 2, distance(b, c) / 2, size);
	const { x, y } = b;

	// no bend
	if ((a.x === x && x === c.x) || (a.y === y && y === c.y)) {
		return `L${x} ${y}`;
	}

	// first segment is horizontal
	if (a.y === y) {
		const xDir = a.x < c.x ? -1 : 1;
		const yDir = a.y < c.y ? 1 : -1;
		return `L ${x + bendSize * xDir},${y}Q ${x},${y} ${x},${y + bendSize * yDir}`;
	}

	const xDir = a.x < c.x ? 1 : -1;
	const yDir = a.y < c.y ? -1 : 1;
	return `L ${x},${y + bendSize * yDir}Q ${x},${y} ${x + bendSize * xDir},${y}`;
}

function toPoint(pathSegment: number[]): XYPosition {
	return { x: pathSegment[0], y: pathSegment[1] };
}
export const svgDrawSmoothStepPath =
	(smoothStepOptions: { borderRadius: number }): SVGDrawFunction =>
	(source, target, path) => {
		const borderRadius = smoothStepOptions.borderRadius;

		let svgPathString = `M ${source.x}, ${source.y} `;
		const smoothedPath = path.reduce<string>((res, p, i) => {
			let segment = "";

			if (i > 0 && i < path.length - 1) {
				segment = getBend(toPoint(path[i - 1]), toPoint(p), toPoint(path[i + 1]), borderRadius);
			} else {
				const [x, y] = p;
				segment = `${i === 0 ? "M" : "L"}${x} ${y}`;
			}

			res += segment;

			return res;
		}, "");
		svgPathString += smoothedPath;
		svgPathString += `L ${target.x}, ${target.y} `;

		return svgPathString;
	};

export function SmoothStepSmart(edge: EdgeProps) {
	const nodes = useNodes();

	const edgeProps = getSmartEdge({
		nodes,
		sourcePosition: edge.sourcePosition,
		targetPosition: edge.targetPosition,
		sourceX: edge.sourceX,
		sourceY: edge.sourceY,
		targetX: edge.targetX,
		targetY: edge.targetY,
		options: {
			drawEdge: svgDrawSmoothStepPath({ borderRadius: 10 }),
			generatePath: pathfindingJumpPointNoDiagonal,
			gridRatio: nodes.length > 20 ? 6 : nodes.length > 10 ? 3 : 2
		}
	});

	if (edgeProps === null) {
		return <SmoothStepEdge {...edge} />;
	}

	return <BaseEdge {...edge} path={edgeProps.svgPathString} />;
}
