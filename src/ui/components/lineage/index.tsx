import styles from './index.module.scss';

import React, { useCallback, useMemo } from 'react';
import ReactFlow, {
  addEdge,
  ConnectionLineType,
  useNodesState,
  useEdgesState,
  FitViewOptions,
  applyNodeChanges,
  applyEdgeChanges,
  Node,
  Edge,
  NodeChange,
  EdgeChange,
  Connection,
  Position,
  Controls,
  MarkerType,
} from 'react-flow-renderer';

import dagre from 'dagre';
import { StepNode } from './step'
import { ArtifactNode } from './artifact'

import { apiResponseEdges, apiResponseNodes, APINode } from './initial-elements'

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

const nodeWidth = 172;
const nodeHeight = 36;


const getLayoutedElements = (nodes: Node[], edges: Edge[], direction = 'TB') => {
  const isHorizontal = direction === 'LR';
  dagreGraph.setGraph({ rankdir: direction });

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  nodes.forEach((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    node.targetPosition = isHorizontal ? Position.Left : Position.Top;
    node.sourcePosition = isHorizontal ? Position.Right : Position.Bottom;

    // We are shifting the dagre node position (anchor=center center) to the top left
    // so it matches the React Flow node anchor point (top left).
    node.position = {
      x: nodeWithPosition.x - nodeWidth / 2,
      y: nodeWithPosition.y - nodeHeight / 2,
    };

    return node;
  });

  return { nodes, edges };
};

const getNodeElements = (apiResponseNodes: APINode[]) => {
  const position = { x: 0, y: 0 };  
  const nodes: Node[] = []
  apiResponseNodes.forEach(function (nodeDict, index) {
    var node = nodeDict as Node;
    node['position'] = position
    nodes.push(node)
  });
  return nodes
};

const getEdgeElements = (apiResponseEdges: Edge[]) => {
  var edges: any[] = [];
  apiResponseEdges.forEach(function (edgeDict, index) {
    var edge = edgeDict;
    edge['markerEnd'] = { type: MarkerType.Arrow }
    edges.push(edge)
  });
  return edges;
};

const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
  getNodeElements(apiResponseNodes),
  getEdgeElements(apiResponseEdges)
);

export const LayoutFlow = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(layoutedNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(layoutedEdges);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge({ ...params, type: ConnectionLineType.SmoothStep, animated: true }, eds)),
    []
  );
  const onLayout = useCallback(
    (direction) => {
      const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
        nodes,
        edges,
        direction
      );

      setNodes([...layoutedNodes]);
      setEdges([...layoutedEdges]);
    },
    [nodes, edges]
  );
  const nodeTypes = useMemo(() => ({ step: StepNode, artifact: ArtifactNode }), []);

  return (
    <div className={styles.layoutflow}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        connectionLineType={ConnectionLineType.SmoothStep}
        nodeTypes={nodeTypes}
        fitView>
        <Controls />
      </ReactFlow>
      <div className={styles.controls}>
        <button onClick={() => onLayout('TB')}>vertical layout</button>
        <button onClick={() => onLayout('LR')}>horizontal layout</button>
      </div>
    </div>
  );
};
