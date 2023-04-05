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
import StepNode from './StepNode';
import './index.css';
import {
  Analysis,
  Completed,
  Database,
  Model,
  Schema,
  Service,
  Statistic
} from './icons';
import { FullWidthSpinner } from '../spinners';
import styles from './index.module.scss'

interface Edge {
  id: string;
  source: string;
  target: string;
  type?: string;
  animated?: boolean;
  label?: string;
  arrowHeadColor: any
  markerEnd?: {
    type: MarkerType.ArrowClosed,
    width: number,
    height: number,
    color: string,
  },
}



const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

const nodeWidth = 80;
const nodeHeight = 56;

const getLayoutedElements = (initialNodes: any[], initialEdges: Edge[], direction = 'TB',) => {

  const isHorizontal = direction === 'LR';

  dagreGraph.setGraph({ rankdir: direction });

  if (initialEdges === undefined && initialNodes === undefined) {
    return { initialNodes, initialEdges };
  }

  initialNodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
  });

  initialEdges.forEach((edge) => {
    dagreGraph.setEdge(edge.id, edge.target);
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
    edge["markerEnd"] = {
      type: MarkerType.ArrowClosed,
      width: 20,
      height: 30,
      color: '#443E99',
    }

    return edge;
  });

  return { initialNodes, initialEdges };
};

const nodeTypes = { step: StepNode };


export const LayoutFlow: React.FC<any> = (graph = null) => {
  const {
    initialNodes: layoutedNodes,
    initialEdges: layoutedEdges,
    // } = getLayoutedElements(initialNodes, initialEdges);
  } = getLayoutedElements(graph.graph.node, graph.graph.edge);
  const [fetching, setFetching] = useState(false); //eslint-disable-line
  const [nodes, _, onNodesChange] = useNodesState(layoutedNodes); //eslint-disable-line
  const [edges, setEdges, onEdgesChange] = useEdgesState(layoutedEdges);
  const [selectedNode, setSelectedNode] = useState<any>(null);
  const [legend, setLegend] = useState(false);

  console.log("__GRAPH", graph)


  useEffect(() => {
    console.log("__UNAUTH SELECTEDNODE", selectedNode)
  }, [selectedNode])


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

      <div style={{ overflow: 'hidden' }}>
        <div>
          <table className={`${styles.Scheduled}`}>
            <thead>
              <th>Scheduled</th>
            </thead>
            <tbody>
              <tr>
                <td>Start</td>
                <td>1:00 PM</td>
              </tr>
              <tr>
                <td>End</td>
                <td>2:00 PM</td>
              </tr>
              <tr>
                <td>Interval</td>
                <td>5 sec</td>
              </tr>
              <tr>
                <td>Catchup</td>
                <td><Completed /></td>
              </tr>
              <tr>
                <td>Cron Exp</td>
                <td>* * 5 * * *</td>
              </tr>
            </tbody>
          </table>
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
                  selectedNode.selected = false
                  setSelectedNode(selectedNode);
                }
                setTimeout(async () => {
                  node.data["selected"] = true;
                  setSelectedNode(node.data)
                }, 100)
              }

              }
              fitView
            >
              <Controls />
            </ReactFlow>
          </div>
        </div>
      </div>
    </>
  );
};
