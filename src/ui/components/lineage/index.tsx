import React, { useCallback, useEffect, useState } from 'react';
import ReactFlow, {
  addEdge,
  ConnectionLineType,
  useNodesState,
  useEdgesState,
  Controls,
  MarkerType,
} from 'react-flow-renderer';
import dagre from 'dagre';

import ArtifactNode from './ArtifactNode';
import StepNode from './StepNode';

import './index.css';
import { Analysis, Database, Model, Schema, Service, Statistic } from './icons';
import { FullWidthSpinner } from '../spinners';
import arrowClose from '../icons/assets/arrowClose.svg';
import arrowOpen from '../icons/assets/arrowOpen.svg';
import Sidebar from './Sidebar';

interface Edge {
  id: string;
  source: string;
  target: string;
  type?: string;
  animated?: boolean;
  label?: string;
  arrowHeadColor: any;
  markerEnd?: {
    type: MarkerType.ArrowClosed;
    width: number;
    height: number;
    color: string;
  };
}

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

const nodeWidth = 100;
const nodeHeight = 56;

const getLayoutedElements = (
  initialNodes: any[],
  initialEdges: Edge[],
  direction = 'TB',
) => {
  const isHorizontal = direction === 'LR';
  dagreGraph.setGraph({ rankdir: direction });
  if (initialEdges === undefined && initialNodes === undefined) {
    return { initialNodes, initialEdges };
  }

  initialNodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
  });

  initialEdges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  initialNodes.forEach((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    node.targetPosition = isHorizontal ? 'left' : 'top';
    node.sourcePosition = isHorizontal ? 'right' : 'bottom';

    node.position = {
      x: nodeWithPosition.x - nodeWidth / 2,
      y: nodeWithPosition.y - nodeHeight / 2,
    };
    return node;
  });

  initialEdges.forEach((edge) => {
    edge.type = isHorizontal ? 'straight' : 'step';
    edge['markerEnd'] = {
      type: MarkerType.ArrowClosed,
      width: 20,
      height: 30,
      color: '#443E99',
    };

    initialNodes.find((node) => {
      if (
        node.type === 'step' &&
        node.id === edge.target &&
        node.data.status === 'running'
      ) {
        const n = initialNodes.find((node) => node.id === edge.source);
        const status = initialNodes.find(
          (node) => 'step_' + n.data.parent_step_id === node.id,
        ).data.status;
        if (status === 'running') {
          edge.animated = true;
        }
      }
      if (
        node.id === edge.source &&
        node.type === 'step' &&
        node.data.status === 'running'
      ) {
        const artifact = initialNodes.find((n) => n.id === edge.target);

        const e = initialEdges.find((e) => e.source === artifact.id);
        if (e) {
          const status = initialNodes.find((step) => step.id === e.target);
          if (status.data.status === 'running') {
            edge.animated = true;
          }
        }
      }
      return initialNodes;
    });

    return edge;
  });

  return { initialNodes, initialEdges };
};

const nodeTypes = { step: StepNode, artifact: ArtifactNode };

export const LayoutFlow: React.FC<any> = (graph: any) => {
  const {
    initialNodes: layoutedNodes,
    initialEdges: layoutedEdges,
  } = getLayoutedElements(graph.graph.nodes, graph.graph.edges);
  const [fetching, setFetching] = useState(false); //eslint-disable-line
  const [nodes, _, onNodesChange] = useNodesState(layoutedNodes); //eslint-disable-line
  const [edges, setEdges, onEdgesChange] = useEdgesState(layoutedEdges);
  const [selectedNode, setSelectedNode] = useState<any>(null);
  const [legend, setLegend] = useState(false);

  useEffect(() => {}, [selectedNode]);

  const onConnect = useCallback(
    (params) =>
      setEdges((eds) =>
        addEdge(
          {
            ...params,
            type: ConnectionLineType.SmoothStep,
            animated: true,
            markerEnd: {
              type: MarkerType.ArrowClosed,
            },
          },
          eds,
        ),
      ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );
  if (fetching) {
    return <FullWidthSpinner color="black" size="md" />;
  }
  return (
    <>
      {selectedNode === null ? (
        ''
      ) : (
        <div>
          <Sidebar selectedNode={selectedNode} />
        </div>
      )}

      <div style={{ overflow: 'hidden' }}>
        <div className="controls">
          <button onClick={() => setLegend(!legend)}>
            {legend ? (
              <img
                className="legend_arrow"
                src={arrowOpen}
                alt={'arrow_image'}
              />
            ) : (
              <img
                className="legend_arrow"
                src={arrowClose}
                alt={'arrow_image'}
              />
            )}
            Artifact Legends
          </button>

          <div style={{}}>
            <div className="legend" style={{ display: legend ? '' : 'none' }}>
              <span>
                <Analysis /> <span>Data Analysis</span>
              </span>
              <span>
                <Database /> <span>Data</span>
              </span>
              <span>
                <Model />
                <span>Model</span>
              </span>
              <span>
                <Schema /> <span>Schema</span>
              </span>
              <span>
                <Service /> <span>Service</span>
              </span>
              <span>
                <Statistic /> <span>Statistic</span>
              </span>
            </div>
          </div>
        </div>
        <div className="layout" style={{ overflow: 'hidden' }}>
          <div className="layoutflow">
            <ReactFlow
              nodes={nodes} // node itself
              edges={edges} //connection lines
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              connectionLineType={ConnectionLineType.SimpleBezier}
              nodeTypes={nodeTypes}
              onNodeClick={async (event, node) => {
                if (selectedNode?.selected) {
                  selectedNode.selected = false;
                  setSelectedNode(selectedNode);
                }
                node.data['selected'] = true;
                setSelectedNode(node.data);
              }}
              fitView
            >
              <Controls
                style={{
                  top: '0px',
                  bottom: '50%',
                  boxShadow: 'none',
                }}
              />
            </ReactFlow>
          </div>
        </div>
      </div>
    </>
  );
};
