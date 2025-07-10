import { Dispatch, SetStateAction, useCallback, useEffect, useState } from "react";
import { Node, useReactFlow } from "reactflow";

export function useNodeSearch() {
	const { getNodes, fitView, setViewport } = useReactFlow();
	const [search, setSearch] = useState("");
	const [currentIndex, setCurrentIndex] = useState<number | null>(null);
	const [filteredNodes, setFilteredNodes] = useState<Node[]>([]);

	const zoomNode = useCallback(
		(node: Node) => {
			fitView({ nodes: [node], maxZoom: 1.2 });
		},
		[fitView]
	);

	useEffect(() => {
		if (!search) {
			setCurrentIndex(null);
			setFilteredNodes([]);
			return;
		}
		const nodes = getNodes();
		const filteredNodes = nodes
			.filter((node) => {
				return (
					node.data?.step_name?.toLowerCase().includes(search.toLowerCase()) ||
					node.data?.artifact_name?.toLowerCase().includes(search.toLowerCase()) ||
					node.data?.node_name?.toLowerCase().includes(search.toLowerCase())
				);
			})
			.sort((a, b) => {
				// Primary sort: by Y coordinate (smaller Y first)
				const yDiff = a.position.y - b.position.y;
				if (yDiff !== 0) {
					return yDiff;
				}

				// Secondary sort: by name if Y coordinates are the same
				// const nameA = a.data?.step_name || a.data?.artifact_name || "";
				// const nameB = b.data?.step_name || b.data?.artifact_name || "";
				// return nameA.localeCompare(nameB);

				return a.position.x - b.position.x;
			});
		setFilteredNodes(filteredNodes);
		// Reset currentIndex to null when search changes, indicating no zoom has occurred yet
		setCurrentIndex(null);
	}, [search, getNodes, setViewport]);

	function zoomNext() {
		if (filteredNodes.length === 0) return;

		const nextIndex = (currentIndex ?? -1) + 1;
		if (nextIndex >= filteredNodes.length) {
			setCurrentIndex(0);
		} else {
			setCurrentIndex(nextIndex);
		}
		const node = filteredNodes[nextIndex >= filteredNodes.length ? 0 : nextIndex];
		zoomNode(node);
	}

	function zoomPrevious() {
		if (filteredNodes.length === 0) return;

		const previousIndex = (currentIndex ?? filteredNodes.length) - 1;
		if (previousIndex < 0) {
			setCurrentIndex(filteredNodes.length - 1);
		} else {
			setCurrentIndex(previousIndex);
		}
		const node = filteredNodes[previousIndex < 0 ? filteredNodes.length - 1 : previousIndex];
		zoomNode(node);
	}

	return {
		search,
		setSearch,
		currentIndex,
		filteredNodes,
		zoomNext,
		zoomPrevious
	};
}

export function useNodeSearchShortcut(setIsOpen: Dispatch<SetStateAction<boolean>>) {
	useEffect(() => {
		const handleKeydown = (e: KeyboardEvent) => {
			const isMac = navigator.userAgent.toUpperCase().indexOf("MAC") !== -1;
			const modifierKey = isMac ? e.metaKey : e.ctrlKey;
			if (modifierKey && e.key.toLowerCase() === "k") {
				e.preventDefault();
				setIsOpen((prev) => !prev);
			}
		};

		document.addEventListener("keydown", handleKeydown);
		return () => {
			document.removeEventListener("keydown", handleKeydown);
		};
	});
}
