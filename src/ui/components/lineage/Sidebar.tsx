import React, { useState, useEffect, useRef } from 'react' //eslint-disable-line
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
import JsonDisplay from './JsonDisplay';
import ArtifactTabHeader from './sidebarTabsSwitchers/artifactTabSwitcher';
import StepnodeTabHeader from './sidebarTabsSwitchers/stepTabSwitcher';
import { fetchArtifactData, fetchStepData } from './sidebarServices';


// const stylesActive = {
//     opacity: 1, transition: "opacity 300ms ease-in-out 0ms, transform 300ms ease-in-out 0ms ", transform: "scale(1.1)"
// }
// const stylesInActive = {
//     opacity: 0.5, transition: "all 0.1s ease", transform: "scale(0.8)"
// }



const Sidebar: React.FC<any> = ({ selectedNode }) => {

    const [sidebar, setSidebar] = useState(true);
    const [isStepNode, setIsStepNode] = useState(false);
    const [artifact, setArtifact] = useState([] as any);
    const [step, setStep] = useState([] as any);
    const sidebar_ref = useRef<HTMLInputElement>(null) //eslint-disable-line

    console.log("__UNAUTH SELECTEDNODE SIDEVAR", selectedNode);

    const authToken = useSelector(sessionSelectors.authenticationToken);
    
    // const fetchMetaData = async (type: boolean) => {
    //     // IF IS STEP THEN GO INSIDE IF, AND IF ARTIFACT GO INSIDE ELSE
    //     if (type) {
    //         console.log("__UNAUTH type : __STEP");
    //         await axios.get(
    //             `${process.env.REACT_APP_BASE_API_URL}/steps/${selectedNode.execution_id}`,
    //             {
    //                 headers: {
    //                     Authorization: `bearer ${authToken}`,
    //                 },
    //             },
    //         ).then((response) => {
    //             console.log("__UNAUTH fetchMetaData Sidebar", response)
    //             setStep(response?.data);
    //             localStorage.setItem("__STEP", JSON.stringify(response.data))
    //             return //Setting the response into state
    //         })
    //     } else {
    //         console.log("__UNAUTH type __ARTIFACT", type);
            
    //         await axios.get(
    //             `${process.env.REACT_APP_BASE_API_URL}/artifacts/${selectedNode.execution_id}`,
    //             {
    //                 headers: {
    //                     Authorization: `bearer ${authToken}`,
    //                 },
    //             },
    //             ).then((response) => {
                    
    //                 console.log("__UNAUTH fetchMetaData Sidebar artifact", response.data)
    //                 setArtifact(response?.data); //Setting the response into state
    //                 localStorage.setItem("__ARTIFACT", JSON.stringify(response.data))
    //                 return
    //             })

    //     }

    // };
    // -----------------------------------------------------

    async function FetchData(type: boolean) {
        console.log({_____type:type})
        if(type)
        {
            const data = await fetchStepData(selectedNode, authToken);
            console.log("___123 step", data)
            setStep(data);
        }
        else
        {
            const data = await fetchArtifactData(selectedNode, authToken);
            console.log("___123 artifact", data)
            setArtifact(data);
        }
    };
    // USE EFFECT TO CHECK IF ITS A STEP NODE OR AN ARTIFACT NODE
    useEffect(() => {

        if (selectedNode === null) return


        let type = "configuration" in selectedNode;
        console.log("__UNAUTH TYPE: ", type);

        if (type) {

            setIsStepNode(true);
            console.log("__UNAUTH type true")
            setSidebar(false);
            setSidebar(true);
        }
        else {
            setIsStepNode(false);
            console.log("__UNAUTH type false")
            setSidebar(false);
            setSidebar(true);

        }
        FetchData(type);
    }, [isStepNode]) //eslint-disable-line


    // CLICK OUTSIDE TO CLOSE THE SIDEBAR
    useEffect(() => {
        let handler = (event: any) => {
            if (!sidebar_ref.current?.contains(event.target)) {
                setSidebar(false);
                console.log("____SIDE", sidebar_ref.current)
            }
            else {
                console.log("____SIDE OUT", sidebar_ref.current)
            }
        }

        document.addEventListener('mousedown', handler);
        return () => {
            document.removeEventListener('mousedown', handler);

        }
        
    }, [])


    

    return (


        <div style={{ position: 'absolute', top: "0%", left: "100%", zIndex: 101 }}>
            {sidebar ?
                <div className='siderbar11' ref={sidebar_ref}>
                    <div className='sidebar11_arrow'>
                        {sidebar ?
                            <img src={circleArrowSideOpen} alt={"close"} onClick={() => setSidebar(false)} />
                            :
                            <img src={circleArrowSideClose} alt={"close"} onClick={() => setSidebar(true)} />
                        }
                    </div>
                    <div className='siderBar_contentArea'>
                        <div className='sidebar_body11'>
                            {isStepNode ? <StepnodeTabHeader node={step} /> : <ArtifactTabHeader node={artifact} />}
                        </div>
                    </div>
                </div>
                :
                <div className='siderbar11_hidden'>
                    <div className='sidebar11_arrow_hidden'>
                        {sidebar ? "" : <img src={circleArrowSideClose} alt={"close"} onClick={() => setSidebar(true)} />}
                    </div>
                </div>
                // <div style={{ position: 'absolute', right: -50, top: "100%", padding: '10px', height: "500px", display: "flex", alignItems: 'flex-end' }} className='closeSidebarBtn' ref={sidebar_ref}>
                //     <img src={circleArrowSideClose} alt={"close"} onClick={() => { setSidebar(true); console.log("clicked") }} style={{ zIndex: 100 }} />
                // </div>
            }
        </div>
    )
}

export default Sidebar


