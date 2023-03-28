// import { PaymentRequestButtonElement } from '@stripe/react-stripe-js';
import React, { useEffect, useRef, useState, lazy, Suspense } from 'react';
import JsonDisplay from '../JsonDisplay';
import styles from './artifact.module.scss'
// import ArtifactVisualization from './ArtifactVisualization';
// import Visualization from './Visualization';

const stylesActive = {
    opacity: 1,
}
const stylesInActive = {
    opacity: 0.5,
}

const artifactTabs = [
    {
        title: "Meta",
        case: "__META"
    },
    {
        title: "Attributes",
        case: "__ATTRIBUTE"
    },
    {
        title: "Visualization",
        case: "__VISUALIZATION"
    },

]

const ArtifactVisualization = lazy(() => import('./ArtifactVisualization'));

const ArtifactTabHeader = ({ node }: { node: any }) => {
    console.log({ "__UNAUTH_ARTFACT_NODE": node })
    const [show, setShow] = useState("__META");
    const [dynamicWidth, setDynamicWidth] = useState<number | undefined>(100);
    const [dynamicLeft, setDynamicLeft] = useState<number | undefined>(21);
    // const divRefs = useRef<Array<React.RefObject<HTMLDivElement | null>>>([]);
    const parent = useRef<(HTMLDivElement)>(null)
    const divRefs = useRef<(HTMLSpanElement | null)[]>([])
    console.log("_CLICKED  Artifact header", node);

    const TabClickHandler = (tab: string) => {
        switch (tab) {
            case "__META": return setShow("__META");
            case "__ATTRIBUTE": return setShow("__ATTRIBUTE");
            case "__VISUALIZATION": return setShow("__VISUALIZATION");
            default: return "";
        }
    }

    useEffect(() => {
        setDynamicLeft(divRefs.current[1]?.offsetLeft);
        setDynamicWidth(divRefs.current[1]?.offsetWidth);
    }, [])

    useEffect(() => {

    }, [show, dynamicLeft, setDynamicWidth])


    const handleClick = (divId: number) => {
        console.log(`Clicked on div ${divId}`);
        setDynamicLeft(divRefs.current[divId]?.offsetLeft);
        setDynamicWidth(divRefs.current[divId]?.offsetWidth);

    };

    return (
        <>
            <div className='siderbar_header11' ref={parent}>
                {artifactTabs.map((tab, i) => {
                    return (
                        <span
                            style={show === tab.case ? stylesActive : stylesInActive}
                            id={i.toString()}
                            ref={(el) => divRefs.current[i + 1] = el}
                            onClick={() => {
                                handleClick(i + 1)
                                TabClickHandler(tab.case)
                            }}
                        >{tab.title}</span>
                    )
                })}

            </div>
            <div className={`${styles.underline}`} style={{ marginLeft: dynamicLeft, transition: 'all 300ms ease', width: dynamicWidth }}></div>

            {/* SHOW META */}
            {show === "__META" ?
                <JsonDisplay data={node?.metadata} />
                : ""}

            {/* SHOW ATTRIBUTE */}

            {show === "__ATTRIBUTE" ?
                <>
                    <table className='sidebar_table'>

                        <tr>
                            <td className='td_key'>artifact_store_id</td>
                            <td className='td_value'>{node.artifact_store_id}</td>
                        </tr>
                        <tr>
                            <td className='td_key'>created</td>
                            <td className='td_value'>{node.created}</td>
                        </tr>
                        <tr>
                            <td className='td_key'>materializer</td>
                            <td className='td_value'>{node.materializer}</td>
                        </tr>
                        <tr>
                            <td className='td_key'>name</td>
                            <td className='td_value'>{node.name}</td>
                        </tr>
                        <tr>
                            <td className='td_key'>producer_step_run_id</td>
                            <td className='td_value'>{node.producer_step_run_id}</td>
                        </tr>
                        <tr>
                            <td className='td_key'>type</td>
                            <td className='td_value'>{node.type}</td>
                        </tr>

                    </table>
                </>
                :
                ""}
            {
                show == "__VISUALIZATION" ?
                    <Suspense fallback={<div>please wait ....</div>}>

                        <ArtifactVisualization artifactId={node.id} />
                    </Suspense>
                    : ""
            }
        </>
    )
}


export default ArtifactTabHeader;