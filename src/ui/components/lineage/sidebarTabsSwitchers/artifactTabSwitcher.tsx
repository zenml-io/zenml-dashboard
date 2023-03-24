import { PaymentRequestButtonElement } from '@stripe/react-stripe-js';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import JsonDisplay from '../JsonDisplay';
import styles from './artifact.module.scss'

const stylesActive = {
    opacity: 1, transition: "", transform: ""
}
const stylesInActive = {
    opacity: 0.5, transition: "", transform: ""
}



const ArtifactTabHeader = ({ node }: { node: any }) => {
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
        // const spanWidth = divRefs.current[divId]?.offsetWidth;
        // console.log('Clicked on div left', divRefs.current[divId]?.offsetLeft);
        // console.log('Clicked on div width', divRefs.current[divId]?.offsetWidth);
        // console.log("_______ABC", spanWidth)
        // console.log("_______ABC",styles)
    };

    return (
        <>
            <div className='siderbar_header11' ref={parent}>
                <span
                    style={show === "__META" ? stylesActive : stylesInActive}
                    id={'1'}
                    ref={(el) => divRefs.current[1] = el}
                    onClick={() => {
                        handleClick(1)
                        TabClickHandler("__META")
                    }}
                >Meta-data</span>
                <span
                    style={show === "__ATTRIBUTE" ? stylesActive : stylesInActive}
                    id='2'
                    ref={(el) => divRefs.current[2] = el}
                    onClick={() => {
                        handleClick(2)
                        TabClickHandler("__ATTRIBUTE")
                    }}
                >Attribute</span>
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
        </>
    )
}


export default ArtifactTabHeader;