import React, { useState, useEffect, useRef } from 'react' //eslint-disable-line
import circleArrowSideClose from '../icons/assets/circleArrowSideClose.svg';
import circleArrowSideOpen from '../icons/assets/circleArrowSideOpen.svg';
// import Switch from "react-switch";
import { useDispatch, useSelector } from '../../hooks';
import { runSelectors, sessionSelectors } from '../../../redux/selectors';
import ArtifactTabHeader from './sidebarTabsSwitchers/artifactTabSwitcher';
import StepnodeTabHeader from './sidebarTabsSwitchers/stepTabSwitcher';
import { fetchArtifactData, fetchStepData } from './sidebarServices';
import { runsActions } from '../../../redux/actions';
import styles from './index.module.scss'

// const stylesActive = {
//     opacity: 1, transition: "opacity 300ms ease-in-out 0ms, transform 300ms ease-in-out 0ms ", transform: "scale(1.1)"
// }
// const stylesInActive = {
//     opacity: 0.5, transition: "all 0.1s ease", transform: "scale(0.8)"
// }

const colCenter = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    // overflow: "hidden",

}



const Sidebar: React.FC<any> = ({ selectedNode }) => {

    const [sidebar, setSidebar] = useState(true);
    const [isStepNode, setIsStepNode] = useState(true);
    const [artifact, setArtifact] = useState([] as any);
    const [step, setStep] = useState([] as any);
    const sidebar_ref = useRef<HTMLInputElement>(null) //eslint-disable-line
    const dispatch = useDispatch();
    const artifactData = useSelector(runSelectors.artifactData)
    const stepData = useSelector(runSelectors.stepData)
    console.log("THIS_IS_RESULT_ARTIFACT: ",artifactData)
    console.log("THIS_IS_RESULT_STEP: ",stepData)
    const authToken = useSelector(sessionSelectors.authenticationToken);

    async function FetchData(type: boolean) {
        console.log({ _____type: type })
        if (type) {
            const data = await fetchStepData(selectedNode, authToken);
            dispatch(runsActions.getStep({exe_id:selectedNode.execution_id})) 
            setStep(data);
        }
        else {
            console.log("__UNAUTH_ARTIFACT_DISPACTH: ", typeof (selectedNode.execution_id))
            const data = await fetchArtifactData(selectedNode, authToken);
            dispatch(runsActions.getArtifact({exe_id:selectedNode.execution_id})) 
            setArtifact(data);
        }
    };
    // USE EFFECT TO CHECK IF ITS A STEP NODE OR AN ARTIFACT NODE
    useEffect(() => {

        if (selectedNode === null) return


        let type = "configuration" in selectedNode;

        if (type) {

            setIsStepNode(true);
        
        }
        else {
            setIsStepNode(false);
           

        }
        FetchData(type);
    }, [isStepNode, selectedNode]) //eslint-disable-line


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

    console.log("SIDEBAR 12345", sidebar_ref.current?.offsetWidth)


    return (


        
        <div className={`${styles.sidebarMainContainer} ${sidebar ? styles.sidebarOpen : styles.sidebarClose}`} ref={sidebar_ref}>
            <div className={`${styles.btnContainer}`} style={colCenter}>
                {sidebar ?
                    <img src={circleArrowSideOpen} alt={"close"} onClick={() => setSidebar(!sidebar)} />
                    :
                    <img src={circleArrowSideClose} alt={"close"} onClick={() => setSidebar(!sidebar)} />
                }
            </div>

            <div className={`${styles.bodyContainer}`}>
                {isStepNode ? <StepnodeTabHeader node={step} /> : <ArtifactTabHeader node={artifact} />}
            </div>

        </div>
    )
}

// export default memo(Sidebar)
export default Sidebar;


