import React, { useState, useEffect, useRef } from 'react' //eslint-disable-line
import circleArrowSideClose from '../icons/assets/circleArrowSideClose.svg';
import circleArrowSideOpen from '../icons/assets/circleArrowSideOpen.svg';
import { useDispatch, useSelector } from '../../hooks';
import { sessionSelectors } from '../../../redux/selectors';
import ArtifactTabHeader from './sidebarTabsSwitchers/artifactTabSwitcher';
import StepnodeTabHeader from './sidebarTabsSwitchers/stepTabSwitcher';
import { fetchArtifactData, fetchStepData, fetchStepLogs } from '../../layouts/runs/RunDetail/sidebarServices';
import { runsActions } from '../../../redux/actions';
import styles from './index.module.scss'
import { FullWidthSpinner } from '../spinners';


const colCenter = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
}

const Sidebar: React.FC<any> = ({ selectedNode }) => {

    const [sidebar, setSidebar] = useState(true);
    const [isStepNode, setIsStepNode] = useState(true);
    const [artifact, setArtifact] = useState([] as any);
    const [step, setStep] = useState([] as any);
    const [logs, setLogs] = useState([] as any);
    const sidebar_ref = useRef<HTMLInputElement>(null) //eslint-disable-line
    const dispatch = useDispatch();
    const authToken = useSelector(sessionSelectors.authenticationToken);

    async function FetchData(type: boolean) {
        if (type) {
            const data = await fetchStepData(selectedNode, authToken);
            const _logs = await fetchStepLogs(selectedNode, authToken);
            dispatch(runsActions.getStep({ exe_id: selectedNode.execution_id }))
            console.log("__DATA__", data)
            setStep(data);
            setLogs(_logs)
        }
        else {
            const data = await fetchArtifactData(selectedNode, authToken);
            console.log("__DATA__", data)
            dispatch(runsActions.getArtifact({ exe_id: selectedNode.execution_id }))
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
            }
        }

        document.addEventListener('mousedown', handler);
        return () => {
            document.removeEventListener('mousedown', handler);

        }

    }, [])

    // reopen sidebar if closed
    useEffect(() => {
        if (!sidebar) {
            setSidebar(true)
        }
    }, [selectedNode])//eslint-disable-line


    // useEffect(() => {
      
    // }, [])
    

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
                {isStepNode ? <StepnodeTabHeader node={step} logs={logs}/> : <ArtifactTabHeader node={artifact} />}
            </div>

        </div>
    )
}

// export default memo(Sidebar)
export default Sidebar;


