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
// import { Completed, FailedLg } from './icons';
import { FullWidthSpinner } from '../spinners';
// import styles from './index.module.scss';
// import { useSelector } from 'react-redux';
// import { sessionSelectors } from '../../../redux/selectors';
// import { fetchSchedule } from '../../layouts/pipelines/PipelineDetail/Configuration/useService';

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

const nodeWidth = 80;
const nodeHeight = 50;

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

  initialNodes?.forEach((node) => {
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
  });

  initialEdges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  initialNodes?.forEach((node) => {
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

const nodeTypes = { step: StepNode };

export const LayoutFlow: React.FC<any> = (graph = null) => {
  const {
    initialNodes: layoutedNodes,
    initialEdges: layoutedEdges,
  } = getLayoutedElements(graph?.graph?.node, graph?.graph?.edge);
  const [fetching, setFetching] = useState(false); //eslint-disable-line
  // const [fetchingSchedule, setFetchingSchedule] = useState(false); //eslint-disable-line
  const [na, setNa] = useState(false); //eslint-disable-line
  const [nodes, _, onNodesChange] = useNodesState(layoutedNodes); //eslint-disable-line
  const [edges, setEdges, onEdgesChange] = useEdgesState(layoutedEdges);
  const [selectedNode, setSelectedNode] = useState<any>(null);
  // const [schedule, setSchedule] = useState<any>(null);
  // const authToken = useSelector(sessionSelectors.authenticationToken);

  useEffect(() => {
    // const AsyncFetchCall = async () => {
    //   setFetchingSchedule(true);
    //   const resposne = await fetchSchedule(
    //     '97f92da7-d5d7-4224-8b92-5fcbfb43d4fe',
    //     authToken,
    //   );
    //   setSchedule(resposne);
    // };
    // AsyncFetchCall();
  }, []); //eslint-disable-line

  // useEffect(() => {
  //   if (schedule !== null) {
  //     setFetchingSchedule(false);
  //   } else {
  //     setFetchingSchedule(true);
  //   }

  //   setTimeout(() => {
  //     if (!fetchingSchedule) {
  //       setNa(true);
  //     } else {
  //     }
  //   }, 500);
  // }, [schedule]); //eslint-disable-line

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
      <div style={{ overflow: 'hidden' }}>
        {/* <div>
          {!fetchingSchedule ? (
            <table className={`${styles.Scheduled}`}>
              <thead>
                <th>Scheduled</th>
              </thead>
              <tbody>
                <tr>
                  <td>Start</td>
                  <td>{schedule?.start_time ? schedule?.start_time : 'n/a'}</td>
                </tr>
                <tr>
                  <td>End</td>
                  <td>{schedule?.end_time ? schedule?.end_time : 'n/a'}</td>
                </tr>
                <tr>
                  <td>Interval</td>
                  <td>
                    {schedule?.interval_second
                      ? schedule?.interval_second
                      : 'n/a'}
                  </td>
                </tr>
                <tr>
                  <td>Catchup</td>
                  {schedule?.catchup ? <Completed /> : <FailedLg />}
                </tr>
                <tr>
                  <td>Cron Exp</td>
                  <td>
                    {schedule?.cron_expression
                      ? schedule?.cron_expression
                      : 'n/a'}
                  </td>
                </tr>
              </tbody>
            </table>
          ) : (
            <table className={`${styles.Scheduled}`}>
              <thead>
                <th>Scheduled</th>
              </thead>
              <tbody>
                <tr>
                  <td>Start</td>
                  <td>{na ? 'n/a' : 'loading...'}</td>
                </tr>
                <tr>
                  <td>End</td>
                  <td>{na ? 'n/a' : 'loading...'}</td>
                </tr>
                <tr>
                  <td>Interval</td>
                  <td>{na ? 'n/a' : 'loading...'}</td>
                </tr>
                <tr>
                  <td>Catchup</td>
                  <td>{na ? 'n/a' : 'loading...'}</td>
                </tr>
                <tr>
                  <td>Cron Exp</td>
                  <td>{na ? 'n/a' : 'loading...'}</td>
                </tr>
              </tbody>
            </table>
          )}
        </div> */}
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
                setTimeout(async () => {
                  node.data['selected'] = true;
                  setSelectedNode(node.data);
                }, 100);
              }}
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
