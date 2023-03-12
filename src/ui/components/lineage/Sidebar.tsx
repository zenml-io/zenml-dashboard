import React, { useState, useRef, useEffect } from 'react'
import arrowClose from '../icons/assets/arrowClose.svg';
import arrowOpen from '../icons/assets/arrowOpen.svg';
import arrowSideOpen from '../icons/assets/arrowSideOpen.svg';
import arrowCloseOpen from '../icons/assets/arrowClose.svg';
import circleArrowSideClose from '../icons/assets/circleArrowSideClose.svg';
import circleArrowSideOpen from '../icons/assets/circleArrowSideOpen.svg';

const stepNodeSiderbarHeaderTabs = [
    "Config",
    "Log",
    "Attribute",
    "Code"
]

const Metadata: React.FC<any> = ({ meta }) => {
    return (
        <>
            <table className='sidebar_table'>
                {meta.map((data: any, i: any) => {
                    { console.log({ metaData: data }) }
                    return (
                        <tr style={{ border: "1px solid" }}>
                            <td className='td_key'>{i}</td>
                            <td className='td_key'>{data[0]}</td>
                            <td className='td_key'>{data[1]}</td>
                            <td className='td_key'>{data[2]}</td>
                        </tr>
                    )
                })}
            </table>
        </>
    )
}



const StepnodeTabHeader: React.FC<any> = ({ }) => {
    return (
        <>
            <div className='siderbar_header11 '>
                <span className='hover-underline-animation'>Input/Output</span>
                <span className='hover-underline-animation'
                // onClick={() => {
                //     if (selectedNode === null) return;
                //     setMetaDataToggler(!metaDataToggler)
                // }}
                >Metadata</span>
                <span className='hover-underline-animation'>Volumes</span>
                <span className='hover-underline-animation'>Logs</span>
                <span className='hover-underline-animation'>Visualization</span>
            </div>
        </>
    )
}

const Sidebar: React.FC<any> = ({ selectedNode }) => {

    const [sidebar, setSidebar] = useState(true);
    const [metaDataToggler, setMetaDataToggler] = useState(false);
    const [isStepNode, setIsStepNode] = useState(false)

    useEffect(() => { 

        if (!selectedNode) {
            console.log({"this is type" : "not a step"})
        }
        else {
    
            let type = "configuration" in selectedNode;
            console.log({ type })
            setIsStepNode(!isStepNode);
        }

    }, [isStepNode])

 

    return (
        <div>
            {sidebar ?
                <div className='siderbar11'>
                    <div className='siderbar_arrow' onClick={() => setSidebar(!sidebar)}>

                        {sidebar ?
                            <img src={circleArrowSideOpen} alt={"close"} />
                            :
                            <img src={circleArrowSideClose} alt={"open"} />
                        }

                    </div>
                    <div className='siderBar_contentArea'>

                        <StepnodeTabHeader />
                        <div className='sidebar_body11'>
                            {metaDataToggler && metaDataToggler ? <Metadata meta={selectedNode.metadata} /> : ""}
                        </div>
                    </div>
                </div> : <img src={circleArrowSideClose} alt={"close"} onClick={() => setSidebar(!sidebar)} style={{ position: 'absolute', right: -50 }} />}
        </div>
    )
}

export default Sidebar



