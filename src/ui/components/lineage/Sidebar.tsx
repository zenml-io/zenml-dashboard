import React, { useState, useEffect } from 'react'
import circleArrowSideClose from '../icons/assets/circleArrowSideClose.svg';
import circleArrowSideOpen from '../icons/assets/circleArrowSideOpen.svg';
import styles from './index.module.scss'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { okaidia } from 'react-syntax-highlighter/dist/esm/styles/prism';
// import Switch from "react-switch";
import { useSelector } from '../../hooks';
import { sessionSelectors } from '../../../redux/selectors';
import axios from 'axios';
import { Status_Completed } from './icons';

const TogglerSwitch: React.FC<any> = ({ label, css }) => {
    const [checked, setchecked] = useState(false)
    return (
        <div style={{ ...css, justifyContent: 'center', alignItems: 'center', background: 'pink' }}>
            <div style={{ minWidth: 200 }}>
                {label}
            </div>
            <div>
                {/* <Switch
                    onChange={() => setchecked(!checked)}
                    checked={checked}
                    height={16}
                    width={36}
                    onColor={"#7870f1"}
                    offColor={"#3b3a4e"}
                /> */}
            </div>
        </div>
    )
}

const StepnodeTabHeader: React.FC<any> = ({ node }) => {
    const [show, setShow] = useState("__CONFIG");
    const [configShow, setConfigShow] = useState("__CONFIGURATION");
    const [checked, setChecked] = useState(false);

    // console.log("_CLICKED step node header");
    // console.log("__UNAUTH STEP DATA", node);
    // const SwitchHandler = (e) =>{

    // }
    const TabClickHandler = (tab: string) => {
        switch (tab) {
            case "__CONFIG": return setShow("__CONFIG");
            case "__LOG": return setShow("__LOG");
            case "__ATTRIBUTE": return setShow("__ATTRIBUTE");
            case "__CODE": return setShow("__CODE");
            default: return "";
        }
    }
    const ConfigurationTabClickHandler = (tab: string) => {
        switch (tab) {
            case "__CONFIGURATION": return setConfigShow("__CONFIGURATION")
            case "__RUNS": return setConfigShow("__RUNS")
            case "__STACK": return setConfigShow("__STACK")
            default: return ""
        }
    }
    return (

        <>
            <div className='siderbar_header11 '>
                <span className='' onClick={() => TabClickHandler("__CONFIG")} style={{ borderBottom: show === "__CONFIG" ? "solid" : "" }}>Config</span>
                <span className='' onClick={() => TabClickHandler("__LOG")} style={{ borderBottom: show === "__LOG" ? "solid" : "" }}>Log</span>
                <span className='' onClick={() => TabClickHandler("__ATTRIBUTE")} style={{ borderBottom: show === "__ATTRIBUTE" ? "solid" : "" }}>Attribute</span>
                <span className='' onClick={() => TabClickHandler("__CODE")} style={{ borderBottom: show === "__CODE" ? "solid" : "" }}>Code</span>
            </div>
            {
                show === "__ATTRIBUTE" ?
                    <>
                        {/* MAKE IT SCROLLABLE */}
                        <table className='sidebar_table'>
                            <tr>
                                <td className='td_key'>Status</td>
                                {node.status && node.status === "completed" ?
                                    <>
                                        <td className='td_value' style={{ color: '#2ECC71', fontSize: 14, fontWeight: 600 }}>{node.status}</td>
                                        <Status_Completed />
                                        &nbsp;&nbsp;&nbsp;
                                    </>
                                    :
                                    <td className='td_value'>{node.status}</td>
                                }
                            </tr>
                            <tr>
                                <td className='td_key'>ID</td>
                                <td className='td_value'>{node.id}</td>
                            </tr>
                            <tr>
                                <td className='td_key'>start_time</td>
                                <td className='td_value'>{node?.created}</td>
                            </tr>
                            <tr>
                                <td className='td_key'>end_time</td>
                                <td className='td_value'>{node?.end_time}</td>
                            </tr>
                            <tr>
                                {node.original_step_run_id && node.original_step_run_id !== null ?
                                    <>
                                        <td className='td_key'>original_step_run_id</td>
                                        <td className='td_value'>{node?.original_step_run_id}</td>
                                    </> : <></>
                                }
                            </tr>
                            <tr>
                                {/* {node.parent_step_id !== '' ?
                                    <>
                                        <td className='td_key'>parent_step_ids</td>
                                        <td className='td_value'>{node.parent_step_id}</td>
                                    </>
                                    : ""} */}
                            </tr>
                            <tr>
                                <td className='td_key'>cache_key</td>
                                <td className='td_value'>{node?.cache_key}</td>
                            </tr>
                            <tr>
                                <td className='td_key'>docstring</td>
                                <td className='td_value'>{node?.docstring}</td>
                            </tr>
                            <tr>
                                <td className='td_key'>enable_cache</td>
                                <td className='td_value'>{node?.docstring}</td>
                            </tr>
                            <tr>
                                {node.enable_artifact_metadata && node.enable_artifact_metadata ?
                                    <>
                                        <td className='td_key'>enable_artifact_metadata</td>
                                        <td className='td_value'>{node?.enable_artifact_metadata}</td>
                                    </>
                                    : <></>
                                }
                            </tr>
                            <tr>
                                <td className='td_key'>source</td>
                                <td className='td_value'>{node?.step?.spec?.source}</td>
                            </tr>
                            <tr>
                                <td className='td_key'>pipeline_parameter_name</td>
                                <td className='td_value '>{node?.step?.spec?.pipeline_parameter_name}</td>
                            </tr>
                        </table>
                    </>
                    : ""
            }
            {
                show === "__CODE" ?
                    <div className={styles.codeContainer}>
                        <SyntaxHighlighter
                            customStyle={{ width: '100%' }}
                            wrapLines={true}
                            language="python"
                            style={okaidia}
                        >
                            {node.source_code}
                        </SyntaxHighlighter>
                    </div>
                    : ""
            }
            {
                show === "__LOG" ?
                    <div className={styles.codeContainer}>
                        <SyntaxHighlighter
                            customStyle={{ width: '100%' }}
                            wrapLines={true}
                            language="Python"
                            style={okaidia}
                        >
                            {node.source_code}
                        </SyntaxHighlighter>
                    </div>
                    : ""
            }
            {show === "__CONFIG" ?

                <>
                    <div className='siderbar_subheader11 '>
                        <span className='' onClick={() => ConfigurationTabClickHandler("__CONFIGURATION")} style={{ borderBottom: configShow === "__CONFIGURATION" ? "solid" : "" }}>Configuration</span>
                        <span className='' onClick={() => ConfigurationTabClickHandler("__RUNS")} style={{ borderBottom: configShow === "__RUNS" ? "solid" : "" }}>Runs</span>
                        <span className='' onClick={() => ConfigurationTabClickHandler("__STACK")} style={{ borderBottom: configShow === "__STACK" ? "solid" : "" }}>Stack</span>
                    </div>
                    {configShow && configShow === "__CONFIGURATION" ?
                        <div className='config_container'>
                            <div>
                                <p>Component Name</p>
                                <input type='text' placeholder='component name' />
                            </div>

                            <div>
                                <p>Kubernetes Context</p>
                                <input type='text' placeholder='Kubernetes Context' />
                            </div>
                            <div>
                                <p>Kubernetes Context</p>
                                <input type='text' placeholder='Kubernetes Context' />
                            </div>
                            <div>
                                <p>Kubernetes Context</p>
                                <input type='text' placeholder='Kubernetes Context' />
                            </div>
                            <div>
                                <p>Kubernetes Context</p>
                                <input type='text' placeholder='Kubernetes Context' />
                            </div>
                        </div>
                        :
                        ""}
                    {configShow && configShow === "__RUNS" ?
                        <div style={{ margin: 'auto' }}>
                            __RUNS
                        </div>
                        :
                        ""}
                    {configShow && configShow === "__STACK" ?

                        <table className='sidebar_table'>
                            <tr>
                                <td className='td_key'>name</td>
                                <td className='td_value' style={{}}>{node?.step?.config?.name}</td>
                            </tr>
                           
                            <tr>
                                <td className='td_key'>enable_artifact_metadata</td>
                                <td className='td_value' style={{color:node?.step?.config?.enable_artifact_metadata? "#431d93" : "#431d93"}}>{node?.step?.config?.enable_artifact_metadata || "null"}</td>
                            </tr>
                            <tr>
                                <td className='td_key'>enable_cache</td>
                                <td className='td_value' style={{color:node?.step?.config?.enable_cache ? "#2ECC71" : "#ea1b48"}}>{node?.step?.config?.enable_cache ? "true" : "false"}</td>
                            </tr>
                            <tr>
                                <td className='td_key'>pipeline_parameter_name</td>
                                <td className='td_value' style={{}}>{node?.step?.spec?.pipeline_parameter_name}</td>
                            </tr>
                            <tr>
                                <td className='td_key'>source</td>
                                <td className='td_value' style={{}}>{node?.step?.spec?.source}</td>
                            </tr>

                        </table>

                        :
                        ""}
                </>
                : ""
            }

        </>
    )
}
const ArtifactTabHeader: React.FC<any> = ({ node }) => {
    const [show, setShow] = useState("__META");
    console.log("_CLICKED  Artifact header");

    const TabClickHandler = (tab: string) => {
        switch (tab) {
            case "__META": return setShow("__META");
            case "__ATTRIBUTE": return setShow("__ATTRIBUTE");
            default: return "";
        }
    }

    return (
        <>
            <div className='siderbar_header11 '>
                <span className='' onClick={() => TabClickHandler("__META")} style={{ borderBottom: show === "__META" ? "solid" : "" }}>Meta-data</span>
                <span className='' onClick={() => TabClickHandler("__ATTRIBUTE")} style={{ borderBottom: show === "__ATTRIBUTE" ? "solid" : "" }}>Attribute</span>
            </div>

            {/* SHOW META */}
            {show === "__META" ?
                <>
                    <table className='sidebar_table'>
                        {/* {node.metadata.map((data: any, i: any) => {
                            { console.log({ metaData: data }) }
                            return (
                                <tr>
                                    <td className='td_key'>{i}</td>
                                    <td className='td_key'>{data[0]}</td>
                                    <td className='td_key'>{data[1]}</td>
                                    <td className='td_key'>{data[2]}</td>
                                </tr>
                            )
                        })} */}
                    </table>
                </>

                : ""}

            {/* SHOW ATTRIBUTE */}

            {show === "__ATTRIBUTE" ?
                <>
                    <table className='sidebar_table'>
                        {/* {node.metadata.map((data: any, i: any) => {
                            { console.log({ metaData: data }) }
                            return (
                                <tr>
                                    <td className='td_key'>{i}</td>
                                    <td className='td_key'>{data[0]}</td>
                                    <td className='td_key'>{data[1]}</td>
                                    <td className='td_key'>{data[2]}</td>
                                </tr>
                            )
                        })} */}
                    </table>
                </>
                :
                ""}
        </>
    )
}

const Sidebar: React.FC<any> = ({ selectedNode }) => {

    const [sidebar, setSidebar] = useState(true);
    const [isStepNode, setIsStepNode] = useState(false);
    const [artifact, setArtifact] = useState([] as any);
    const [step, setStep] = useState([] as any);

    console.log("__UNAUTH selectedNode ", selectedNode);


    // -----------------------------------------------------
    // REACT_APP_BASE_API_URL=https://appserver.zenml.io/api/v1
    const [metadata, setMetaData] = useState([] as any);
    const authToken = useSelector(sessionSelectors.authenticationToken);

    let exe_id = `3fa85f64-5717-4562-b3fc-2c963f66afa6`;
    let url = `https://appserver.zenml.io/api/v1/` + `artifacts/` + exe_id;

    const fetchMetaData = async (type: boolean) => {
        // IF IS STEP THEN GO INSIDE IF, AND IF ARTIFACT GO INSIDE ELSE
        if (type) {
            console.log("__UNAUTH type : __STEP");
            const response = await axios.get(
                `${process.env.REACT_APP_BASE_API_URL}/steps/${selectedNode.execution_id}`,
                {
                    headers: {
                        Authorization: `bearer ${authToken}`,
                    },
                },
            ).then((response) => {
                console.log("__UNAUTH fetchMetaData Sidebar", response)
                setStep(response?.data);
                return //Setting the response into state
            })
        } else {
            console.log("__UNAUTH type __ARTIFACT", type);

            const response = await axios.get(
                `${process.env.REACT_APP_BASE_API_URL}/artifacts/${selectedNode.execution_id}`,
                {
                    headers: {
                        Authorization: `bearer ${authToken}`,
                    },
                },
            ).then((response) => {

                console.log("__UNAUTH fetchMetaData Sidebar", response?.data?.metadata?.dtype)
                setArtifact(response?.data); //Setting the response into state
                return
            })

        }

    };
    // -----------------------------------------------------

    async function FetchData(type: boolean) {
        await fetchMetaData(type);
    };

    useEffect(() => {
        let type = "configuration" in selectedNode;
        console.log("__UNAUTH TYPE: ", type);

        if (type) {

            setIsStepNode(true);
            console.log("__UNAUTH type true")
            setSidebar(false);
            setSidebar(true);
        }
        else {
            // setSidebar(!sidebar)
            setIsStepNode(false);
            console.log("__UNAUTH type false")
            setSidebar(false);
            setSidebar(true);

        }
        FetchData(type);
        // setSidebar(false)
    }, [isStepNode])

    // useEffect(()=>{
    //     setSidebar(true)
    // },[isStepNode])



    return (
        <div >
            {sidebar ?
                <div className='siderbar11'>
                    <div className='siderbar_arrow'>

                        {sidebar ?

                            <img src={circleArrowSideOpen} alt={"close"} onClick={() => setSidebar(false)} />
                            :
                            <img src={circleArrowSideClose} alt={"open"} onClick={() => setSidebar(false)} />

                        }

                    </div>
                    <div className='siderBar_contentArea'>
                        {isStepNode ? <StepnodeTabHeader node={step} /> : <ArtifactTabHeader node={artifact} />}

                        <div className='sidebar_body11'>
                            {/* {metaDataToggler && metaDataToggler ? <Metadata meta={selectedNode.metadata} /> : ""} */}
                        </div>
                    </div>
                </div>
                :
                <>
                    {/* <div style={{height:100, width:100, background:'pink'}}></div> */}
                    <img src={circleArrowSideClose} alt={"close"} onClick={() => { setSidebar(true); console.log("clicked") }} style={{ position: 'absolute', right: -50 }} />
                </>
            }
        </div>
    )
}

export default Sidebar



