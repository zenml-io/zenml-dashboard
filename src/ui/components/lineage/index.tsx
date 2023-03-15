import React, { useCallback, useState } from 'react';
import ReactFlow, {
  addEdge,
  ConnectionLineType,
  useNodesState,
  useEdgesState,
  Controls,
  MarkerType,
  EdgeMarker,
  EdgeMarkerType
} from 'react-flow-renderer';
import dagre from 'dagre';

import ArtifactNode from './ArtifactNode';
import StepNode from './StepNode';

import './index.css';
import { Analysis, Data, Database, Model, Schema, Service, Statistic } from './icons';
import { useDispatch } from '../../hooks';
import { runsActions } from '../../../redux/actions';
import { FullWidthSpinner } from '../spinners';
import arrowClose from '../icons/assets/arrowClose.svg';
import arrowOpen from '../icons/assets/arrowOpen.svg';
import arrowSideOpen from '../icons/assets/arrowSideOpen.svg';
import arrowCloseOpen from '../icons/assets/arrowClose.svg';
import circleArrowSideClose from '../icons/assets/circleArrowSideClose.svg';
import circleArrowSideOpen from '../icons/assets/circleArrowSideOpen.svg';
import Sidebar from './Sidebar';


interface Edge {
  id: string;
  source: string;
  target: string;
  type?: string;
  animated?: boolean;
  label?: string;
  // markerStart?: EdgeMarkerType;
  markerEnd?: {
    type: MarkerType.ArrowClosed,
    width: number,
    height: number,
    color: string,
  },
}

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({})); 

const nodeWidth = 172;
const nodeHeight = 36;

const getLayoutedElements = (initialNodes: any[], initialEdges: Edge[], direction = 'TB',) => {
  const isHorizontal = direction === 'LR';
  dagreGraph.setGraph({ rankdir: direction });
  console.log("__UNAUTH initialEdges",initialEdges);
  console.log("__UNAUTH initailNode", initialNodes);
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
    // console.log({mynode:node})
    return node;
  });

  initialEdges.forEach((edge) => {

    // console.log("__UNAUTH edge: ", edge)
    edge.type = isHorizontal ? 'straight' : 'step';
    edge["markerEnd"] = {
      type: MarkerType.ArrowClosed,
      width: 20,
      height: 20,
      color: '#443E99',
    }
    
    // edge.markerStart = 'arrowclosed'
    

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
          console.log(e.target);
          const status = initialNodes.find((step) => step.id === e.target);
          console.log(status);
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
  const dispatch = useDispatch();
  const {
    initialNodes: layoutedNodes,
    initialEdges: layoutedEdges,
  } = getLayoutedElements(graph.graph.nodes, graph.graph.edges);
  const [fetching, setFetching] = useState(false);
  // eslint-disable-next-line
  const [nodes, _, onNodesChange] = useNodesState(layoutedNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(layoutedEdges);
  const [selectedNode, setSelectedNode] = useState<any>(null);
  const [legend, setLegend] = useState(false);
  // const [sidebar, setSidebar] = useState(false)
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
      // console.log(params)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );
  if (fetching) {
    return <FullWidthSpinner color="black" size="md" />;
  }
  console.log("__UNAUTH",{ nodes, edges, graph: graph.graph.nodes, edges2: graph.graph.edges })
  return (
    <>
      <div className="controls">
        {/* code commented by Ali id:#123456789*/}
        {/* <button
          onClick={() => {
            setFetching(true);
            dispatch(
              runsActions.graphForRun({
                runId: graph.runId,
                onSuccess: () => setFetching(false),
                onFailure: () => setFetching(false),
              }),
            );
          }}
        >
          Refresh
        </button> */}
        <button onClick={() => setLegend(!legend)}>
          {legend ?
            <img className='legend_arrow' src={arrowOpen} alt={"arrow_image"} />
            :
            <img className='legend_arrow' src={arrowClose} alt={"arrow_image"} />}
          Artifact Legends
        </button>

        {/* code commented by Ali id:#123456789*/}
        {/* <button
          disabled={graph?.metadata[0]?.value ? false : true}
          onClick={() => {
            window.open(
              graph?.metadata[0]?.value
                ? graph?.metadata[0]?.value
                : 'https://zenml.io/home',
            );
          }}
        >
          Orchestrator Logs
        </button> */}
        <div style={{}}>
          <div className="legend" style={{ display: legend ? '' : 'none' }}>
            <span>
              <Analysis /> <span>Data Analysis</span>
            </span>
            <span>
              <Database /> <span>Data</span>
            </span>
            <span>
              <Model /><span>Model</span>
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
            onNodeClick={(event, node) => {
              // wait till already selected node is unselected
              setTimeout(()=>{
                setSelectedNode(null);
                console.log("__UNAUTH NULL");
              },300)
              // wait till new selected node is selected
              setTimeout(()=>{
                console.log("__UNAUTH DATA");
                setSelectedNode(node.data);
              },300)
            }}
            fitView
          >
            <Controls />
          </ReactFlow>
        </div>
        {/* <div className="detailsPositioning"> */}
        <div className="">
          {/* <div className="detailsBox">
            <h3 className="detailsTitle">
              {selectedNode?.artifact_type ||
              selectedNode?.execution_id === '' ? (
                'Details'
              ) : (
                <span>
                  Status:{' '}
                  <span
                    style={
                      selectedNode?.status === 'completed'
                        ? { color: '#4ade80' }
                        : selectedNode?.status === 'failed'
                        ? { color: '#FF5C93' }
                        : selectedNode?.status === 'running'
                        ? { color: '#22BBDD' }
                        : selectedNode?.status === 'cached'
                        ? { color: '#4ade80' }
                        : { color: '#000' }
                    }
                  >
                    {selectedNode?.status}
                  </span>
                </span>
              )}
            </h3>
            {selectedNode ? (
              <div className="details">
                <div className="detailsInfo">
                  <p className="detailsLabel">
                    {selectedNode?.artifact_type ? 'Artifact ID' : 'Step ID'}
                  </p>
                  <p className="detailsP">{selectedNode?.execution_id}</p>
                  <p className="detailsLabel">
                    {selectedNode?.artifact_type
                      ? 'Artifact Name'
                      : 'Step Name'}
                  </p>
                  <p className="detailsP">
                    {selectedNode?.artifact_type
                      ? selectedNode?.name
                      : selectedNode?.entrypoint_name}
                  </p>
                  <p className="detailsLabel">
                    {selectedNode?.artifact_type ? 'Type' : ''}
                  </p>
                  <p className="detailsP">
                    {selectedNode?.artifact_type
                      ? selectedNode?.artifact_type
                      : ''}
                  </p>
                  <p className="detailsLabel">
                    {selectedNode?.artifact_type ? 'Data Types' : 'Inputs'}
                  </p>
                  <p className="detailsP URI">
                    {selectedNode?.artifact_type
                      ? selectedNode?.artifact_data_type
                      : Object.entries(selectedNode?.inputs || {}).map(
                          (value) => {
                            return (
                              <div>
                                <p className="detailsKey">
                                  {String(value[0]) + ':'}
                                </p>
                                <p className="detailsValue">
                                  {String(value[1])}
                                </p>
                              </div>
                            );
                          },
                        )}
                  </p>
                  <p className="detailsLabel">
                    {selectedNode?.artifact_type ? 'URI' : 'Outputs'}
                  </p>
                  <p className="detailsP URI">
                    {selectedNode?.artifact_type ? (
                      <p className="detailsValue">{selectedNode?.uri}</p>
                    ) : (
                      Object.entries(selectedNode?.outputs || {}).map(
                        (value) => {
                          return (
                            <div>
                              <p className="detailsKey">
                                {String(value[0]) + ':'}
                              </p>
                              <p className="detailsValue">{String(value[1])}</p>
                            </div>
                          );
                        },
                      )
                    )}
                  </p>
                  <p className="detailsLabel">Metadata</p>
                  <p className="detailsP URI">
                    {Object.entries(selectedNode?.metadata || {}).map(
                      (fullValue: [string, any]) => {
                        let value = fullValue[1];
                        return (
                          <div>
                            <p className="detailsKey">
                              {String(value[0]).trim() + ' ('}{' '}
                              {String(value[2]).trim() + ' ):'}
                            </p>
                            <p className="detailsValue">
                              {String(value[1]).trim()}
                            </p>
                          </div>
                        );
                      },
                    )}
                  </p>
                  <p className="detailsLabel">
                    {selectedNode?.artifact_type ? 'Is Cached?' : 'Params'}
                  </p>
                  <p className="detailsP URI">
                    {selectedNode?.artifact_type
                      ? selectedNode?.is_cached
                        ? 'Yes'
                        : 'No'
                      : Object.entries(selectedNode?.parameters || {}).map(
                          (value) => {
                            return (
                              <div>
                                <p className="detailsKey">
                                  {String(value[0]) + ':'}
                                </p>
                                <p className="detailsValue">
                                  {String(value[1])}
                                </p>
                              </div>
                            );
                          },
                        )}
                  </p>
                </div>
              </div>
            ) : (
              <div className="detailsNoNode">
                <p>Click on a node to see details</p>
              </div>
            )}
          </div> */}
          {/* {console.log({ artifact: ArtifactNode.type })} */}
          {/* {selectedNode == null ? "" : <Sidebar selectedNode={selectedNode} />} */}
          {selectedNode == null ? <div>Select a node</div> : <Sidebar selectedNode={selectedNode} />}

          {/* {sidebar ?
            <img src={circleArrowSideOpen} alt={"close"} onClick={() => setSidebar(!sidebar)} style={{ position: 'absolute', right: -50 }} />
            :
            <img src={circleArrowSideClose} alt={"close"} onClick={() => setSidebar(!sidebar)} style={{ position: 'absolute', right: -50 }} />} */}

          {/* {sidebar ?
            <Sidebar selectedNode={selectedNode} />
            :
            <img src={circleArrowSideOpen} alt={"close"} onClick={() => setSidebar(!sidebar)} style={{ position: 'absolute', right: -50 }} />} */}

          {/* {sidebar ? 
          <div className='siderbar11'>
            <div className='siderbar_arrow' onClick={() => setSidebar(!sidebar)}>

              {sidebar ?
                <img src={circleArrowSideOpen} alt={"close"} />
                : 
                <img src={circleArrowSideClose} alt={"open"} /> 
              }

            </div>
            <div className='siderBar_contentArea'>
              <div className='siderbar_header11 '>
                <span className='hover-underline-animation'>Input/Output</span>
                <span className='hover-underline-animation'>Metadata</span>
                <span className='hover-underline-animation'>Volumes</span>
                <span className='hover-underline-animation'>Logs</span>
                <span className='hover-underline-animation'>Visualization</span>
              </div>
              <div className='sidebar_body11'>
                <div className='sidebar_body_attr'>
                  Attributes:
                </div>
                <div className='sidebar_body_fields'>
                 
                  <table className='sidebar_table'>
                    <tr>
                      <td className='td_key'>Company</td>
                      <td className='td_value'>Contact</td>
                    </tr>
                  </table>
                </div>
                <div className='sidebar_body_url'>
                  <p>URL</p>
                  <a href='https://www.figma.com/file/Za3xa76ylf1Wma6mHL81WJ/Shared-ZenML-Figma?node-id=2195%3A10350&t=2QXishtItAalQ7rD-0'>https://www.figma.com/file/Za3xa76ylf1Wma6mHL81WJ/Shared-ZenML-Figma?node-id=2195%3A10350&t=2QXishtItAalQ7rD-0</a>
                </div>
              </div>
            </div>
          </div> : "" } */}

        </div>
      </div>
    </>
  );
};
